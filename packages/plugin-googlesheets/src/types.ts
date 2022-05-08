export type ServiceAccountCredentials = {
  client_email: string;
  private_key: string;
};

export type GoogleAuthClientScopes = string | string[];

export type FetchAPIConfig = {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  range: string;
};

export type GetAllExperimentsConfig = {
  url: string;
};
