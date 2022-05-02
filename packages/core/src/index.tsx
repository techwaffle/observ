import React, { useContext, useEffect, useState } from 'react';
import {
  ObservProviderConfig,
  ObservEvent,
  DefaultObservProviderConfig,
  ObservContext,
  ExperimentsContext,
} from './types';

export * from './components/Element';

const defaultObservConfig: DefaultObservProviderConfig = {
  sendEvent: (event: ObservEvent) => {
    console.log(event);
  },
  logExperimentId: (id: string) => {
    console.log(id);
  },
  logPageView: (path: string) => {
    console.log(path);
  },
};

const ObservContextInstance = React.createContext<ObservContext>({
  ...defaultObservConfig,
  experiments: [],
});

type ObservProviderProps = {
  config?: ObservProviderConfig;
  children: React.ReactNode;
};

export function ObservProvider({ config, children }: ObservProviderProps) {
  const [experiments, setExperiments] = useState<ExperimentsContext>([]);
  useEffect(() => {
    if (experiments.length <= 0 && config && config.getAllExperiments) {
      config.getAllExperiments().then((data) => {
        if (data) {
          setExperiments(data);
        }
      });
    }
  }, [config, experiments]);

  return (
    <ObservContextInstance.Provider
      value={{ ...defaultObservConfig, ...config, experiments }}
    >
      {children}
    </ObservContextInstance.Provider>
  );
}

export const useObserv = () => useContext(ObservContextInstance);
