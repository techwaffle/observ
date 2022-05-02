export type ObservEvent =
  | {
      [index: string]: string;
    }
  | string;

export type VariantId = string;

export type Weight = number;

export type Elements = {
  [index: ElementId]: ElementOptionId;
};

export type VariantData = {
  [index: VariantId]: {
    elements: Elements;
    weight: Weight;
  };
};

export type ExperimentData = {
  id: string;
  variants: VariantData;
};

export type ExperimentsContext = ActiveExperiments;

export type ActiveExperiments = ExperimentData[] | [];

export type LogExperimentID = (id: string) => void;
export type LogPageView = (path: string) => void;
export type SendEvent = (event: ObservEvent) => void;

export type DefaultObservProviderConfig = {
  sendEvent: SendEvent;
  logExperimentId: LogExperimentID;
  logPageView: LogPageView;
};

export type GetAllExperiments = () => Promise<ActiveExperiments>;

export type ObservProviderConfig = {
  getAllExperiments?: GetAllExperiments;
  sendEvent?: (event: ObservEvent) => void;
  logExperimentId?: (id: string) => void;
  logPageView?: (path: string) => void;
};

export type ObservContext = DefaultObservProviderConfig &
  Partial<ObservProviderConfig> & {
    experiments: ExperimentsContext;
  };

export type ElementId = string;

export type ElementOptionId = string;

export type ExperimentId = string;

export type ElementOptions = {
  [index: ElementOptionId]: JSX.Element;
};
