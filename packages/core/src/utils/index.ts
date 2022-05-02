import { ActiveExperiments, ExperimentId, VariantData } from '../types';

export const weightedRand = (variants: VariantData) => {
  let weightSum = 0;
  const r = Math.random();
  for (const i in variants) {
    weightSum += variants[i].weight;
    if (r <= weightSum) return i;
  }
};

export const getRandomVariant = (variants: VariantData) => {
  const variantId = weightedRand(variants);
  if (variantId) {
    return variants[variantId];
  }
};

export const getExperimentById = (
  experimentId: ExperimentId,
  experiments: ActiveExperiments
) => experiments.find((experiment) => experiment.id === experimentId);

export const getVariantFromLocalStorage = (key: string) =>
  localStorage.getItem(key);

export const setVariantToLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, value);
