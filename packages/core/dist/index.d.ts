import React from 'react';
import { ElementId, ExperimentId, ElementOptions, ObservContext, ObservProviderConfig } from '@observjs/types';

declare type ElementProps = {
    id: ElementId;
    experimentId: ExperimentId;
    options: ElementOptions;
    fallback?: JSX.Element;
    skeleton?: JSX.Element;
};
declare const Element: ({ id, experimentId, options, fallback, skeleton, }: ElementProps) => JSX.Element | null;

declare type ObservProviderProps = {
    config?: ObservProviderConfig;
    children: React.ReactNode;
};
declare function ObservProvider({ config, children }: ObservProviderProps): JSX.Element;
declare const useObserv: () => ObservContext;

export { Element, ElementProps, ObservProvider, useObserv };
