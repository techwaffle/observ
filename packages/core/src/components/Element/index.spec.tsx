import { render } from '@testing-library/react';
import { Element } from '.';
import { ObservProvider } from '../..';
import { ObservProviderConfig } from '@observjs/types';

const mockSendEvent = jest.fn();
const mockLogExperimentId = jest.fn();
const experimentId = 'test-experiment';
const elementId = 'test-element';
const optionId = 'test-option';
const optionText = 'Option 1';

const setup = (config?: ObservProviderConfig) => {
  render(
    <ObservProvider config={config}>
      <Element
        id={elementId}
        experimentId={experimentId}
        options={{
          [optionId]: <p>{optionText}</p>,
          optionTwo: <p>Option 2</p>,
        }}
        skeleton={<p>loading</p>}
        fallback={<p>fallback</p>}
      />
    </ObservProvider>
  );
};

test('ObservProvider should throw error if no way to get experiment data is provided', () => {
  const spy = jest.spyOn(console, 'error');
  spy.mockImplementation(() => null);

  expect(() =>
    setup({
      sendEvent: (event) => {
        mockSendEvent(event);
      },
      logExperimentId: (id: string) => {
        mockLogExperimentId(id);
      },
    })
  ).toThrow();

  spy.mockRestore();
});
