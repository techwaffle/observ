import { render, screen, waitFor } from '@testing-library/react';
import { ObservProvider, Element } from '.';
import {
  ObservEvent,
  ObservProviderConfig,
  GetAllExperiments,
} from '@observjs/types';

const mockSendEvent = jest.fn();
const mockLogExperimentId = jest.fn();
const experimentId = 'test-experiment';
const variantId = 'test-variant';
const elementId = 'test-element';
const optionId = 'test-option';
const optionText = 'Option 1';

const getAllExperiments: GetAllExperiments = async () => [
  {
    id: experimentId,
    variants: {
      [variantId]: {
        elements: {
          [elementId]: optionId,
        },
        weight: 1,
      },
    },
  },
];

const setup = (config: ObservProviderConfig) => {
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

test('ObservProvider should allow configuration of event handlers', async () => {
  setup({
    getAllExperiments,
    sendEvent: (event: ObservEvent) => {
      mockSendEvent(event);
    },
    logExperimentId: (id: string) => {
      mockLogExperimentId(id);
    },
  });

  await waitFor(() => {
    expect(screen.getByText(optionText)).toBeTruthy();
    expect(mockSendEvent.mock.calls.length).toBe(1);
    expect(mockLogExperimentId.mock.calls.length).toBe(1);
  });
});
