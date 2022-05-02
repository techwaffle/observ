import React from 'react';

declare type AnalyticsEvent = {
    [index: string]: string;
} | string;
declare type Weight = number;
declare type Elements = {
    [index: ElementId]: ElementOptionId;
};
declare type VariantData = {
    [index: VariantId]: {
        elements: Elements;
        weight: Weight;
    };
};
declare type ExperimentData = {
    id: string;
    variants: VariantData;
};
declare type ExperimentsContext = ActiveExperiments;
declare type ActiveExperiments = ExperimentData[] | [];
declare type LogExperimentID = (id: string) => void;
declare type LogPageView = (path: string) => void;
declare type SendEvent = (event: AnalyticsEvent) => void;
declare type DefaultAnalyticsProviderConfig = {
    sendEvent: SendEvent;
    logExperimentId: LogExperimentID;
    logPageView: LogPageView;
};
declare type GetAllExperiments = () => Promise<ActiveExperiments>;
declare type AnalyticsProviderConfig = {
    getAllExperiments?: GetAllExperiments;
    sendEvent?: (event: AnalyticsEvent) => void;
    logExperimentId?: (id: string) => void;
    logPageView?: (path: string) => void;
};
declare type AnalyticsContext = DefaultAnalyticsProviderConfig & Partial<AnalyticsProviderConfig> & {
    experiments: ExperimentsContext;
};
declare type ElementId = string;
declare type ElementOptionId = string;
declare type ExperimentId = string;
declare type ElementOptions = {
    [index: ElementOptionId]: JSX.Element;
};

declare type ElementProps = {
    id: ElementId;
    experimentId: ExperimentId;
    options: ElementOptions;
    fallback?: JSX.Element;
    skeleton?: JSX.Element;
};
declare const Element: ({ id, experimentId, options, fallback, skeleton, }: ElementProps) => JSX.Element | null;

declare type AnalyticsProviderProps = {
    config?: AnalyticsProviderConfig;
    children: React.ReactNode;
};
declare function AnalyticsProvider({ config, children, }: AnalyticsProviderProps): JSX.Element;
declare const useAnalytics: () => AnalyticsContext;

export { AnalyticsProvider, Element, ElementProps, useAnalytics };
