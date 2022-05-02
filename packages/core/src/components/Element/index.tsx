import { useEffect, useState } from 'react';
import { useObserv } from '../..';
import { ElementId, ElementOptions, ExperimentId } from '../../types';
import {
  getExperimentById,
  getRandomVariant,
  getVariantFromLocalStorage,
  setVariantToLocalStorage,
} from '../../utils';

export type ElementProps = {
  id: ElementId;
  experimentId: ExperimentId;
  options: ElementOptions;
  fallback?: JSX.Element;
  skeleton?: JSX.Element;
};

export const Element = ({
  id,
  experimentId,
  options,
  fallback,
  skeleton,
}: ElementProps) => {
  const [option, setOption] = useState<JSX.Element | null>(null);
  const { sendEvent, logExperimentId, experiments, getAllExperiments } =
    useObserv();
  const fallbackComponent = fallback || null;
  const experimentElementKey = `${experimentId}-${id}`;

  useEffect(() => {
    if (!getAllExperiments) {
      throw Error(
        'To use the Element component, you must configure getAllExperiments in the ObservProvider'
      );
    }
  }, [getAllExperiments]);

  useEffect(() => {
    if (!option && experiments.length > 0) {
      let selectedVariantElementOption =
        getVariantFromLocalStorage(experimentElementKey);

      if (!selectedVariantElementOption) {
        const experiment = getExperimentById(experimentId, experiments);
        if (experiment) {
          const selectedVariant = getRandomVariant(experiment.variants);
          if (selectedVariant) {
            selectedVariantElementOption = selectedVariant.elements[id];
            setVariantToLocalStorage(
              experimentElementKey,
              selectedVariantElementOption
            );
            setOption(options[selectedVariantElementOption]);
            sendEvent(selectedVariantElementOption);
            logExperimentId(experimentId);
          } else {
            setOption(fallbackComponent);
          }
        } else {
          setOption(fallbackComponent);
        }
      } else {
        setOption(options[selectedVariantElementOption]);
        sendEvent(selectedVariantElementOption);
        logExperimentId(experimentId);
      }
    }
  }, [
    experiments,
    experimentId,
    id,
    logExperimentId,
    options,
    sendEvent,
    fallbackComponent,
    experimentElementKey,
    option,
  ]);

  if (!option) {
    return skeleton || null;
  }

  return option;
};
