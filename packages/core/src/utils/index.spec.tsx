import { getRandomVariant, weightedRand } from '.';

test('weightedRand should always return value with a weight of 1', () => {
  const variantKey = weightedRand({
    variantOne: { weight: 1, elements: { elementOne: 'elementOptionOne' } },
    variantTwo: { weight: 0, elements: { elementOne: 'elementOptionTwo' } },
  });

  expect(variantKey).toBe('variantOne');
});

test('getRandomVariant should always return variant with a weight of 1', () => {
  const variantOneElements = { elementOne: 'elementOptionOne' };

  const variants = {
    variantOne: { weight: 1, elements: variantOneElements },
    variantTwo: { weight: 0, elements: { elementOne: 'elementOptionTwo' } },
  };
  const variant = getRandomVariant(variants);

  expect(variant?.elements).toBe(variantOneElements);
  expect(variant?.weight).toBe(1);
});
