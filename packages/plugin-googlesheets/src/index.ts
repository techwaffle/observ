import { google } from 'googleapis';
import { ExperimentData, VariantData } from '@observjs/types';
import {
  FetchAPIConfig,
  GetAllExperimentsConfig,
  GoogleAuthClientScopes,
  ServiceAccountCredentials,
} from './types';

const createGoogleAuthClient = (
  credentials: ServiceAccountCredentials,
  scopes: GoogleAuthClientScopes
) =>
  new google.auth.GoogleAuth({
    credentials,
    scopes,
  });

const getExperimentDataFromRows = (rows: string[][]) => {
  const columnHeadings = rows[0];

  const experimentId = columnHeadings[0];

  const weightColumnIndex = columnHeadings.indexOf('weight');

  const variants: VariantData = {};

  rows.forEach((row, rowIndex) => {
    if (rowIndex !== 0) {
      const variantId = row[0];
      const weight = parseFloat(row[weightColumnIndex]);
      variants[variantId] = { weight, elements: {} };

      row.forEach((cell, cellIndex) => {
        if (cellIndex !== 0 && cellIndex !== weightColumnIndex) {
          const elementOptionId = cell;
          const elementId = columnHeadings[cellIndex];
          variants[variantId]['elements'][elementId] = elementOptionId;
        }
      });
    }
  });

  return {
    id: experimentId,
    variants,
  };
};

const segmentExperimentRows = (rows: string[][]) => {
  let sliceStart = 0;
  const experiments: ExperimentData[] = [];
  rows.forEach((row, index) => {
    const isLastRow = index === rows.length - 1;
    if (isLastRow || row.length === 0) {
      const sliceEnd = isLastRow ? rows.length : index;
      const experimentRows = rows.slice(sliceStart, sliceEnd);
      const experiment = getExperimentDataFromRows(experimentRows);
      experiments.push(experiment);
      sliceStart = index + 1;
    }
  });
  return experiments;
};

const fetchAPI = async ({
  clientEmail,
  privateKey,
  spreadsheetId,
  range,
}: FetchAPIConfig) => {
  const auth = createGoogleAuthClient(
    {
      client_email: clientEmail,
      private_key: privateKey,
    },
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
  );

  const sheets = google.sheets({
    auth,
    version: 'v4',
  });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });
  const { values } = response.data;

  const experiments = segmentExperimentRows(values as string[][]);

  return experiments;
};

const getAllExperiments = ({ url }: GetAllExperimentsConfig) => {
  return async (): Promise<ExperimentData[]> => {
    if (!url) {
      throw new Error(
        'You must provide a URL to the getAllExperiments function in the ObservGoogleSheetsPlugin.'
      );
    }
    const request = new Request(url);
    const experiments: ExperimentData[] = await fetch(request).then((res) => {
      if (!res.ok) {
        throw new Error(
          `ObservGoogleSheetsPlugin HTTP error! Status: ${res.status}.`
        );
      }

      return res.json();
    });
    return [...experiments];
  };
};

const ObservGoogleSheetsPlugin = {
  getAllExperiments,
  fetchAPI,
};

export default ObservGoogleSheetsPlugin;
