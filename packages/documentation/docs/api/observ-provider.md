# ObservProvider

The `ObservProvider` is what you use to wrap your application so that every child component has context of the experiments that are running. The `ObservProvider` also allows use of the `useObserv` hook to any child component.

You can configure `ObservProvider` in the following way:

## ObservProviderProps

```tsx
type ObservProviderProps = {
  config: ObservProviderConfig;
  children: React.ReactNode;
};
```

## ObservProviderConfig

```ts
type ObservProviderConfig = {
  getAllExperiments?: GetAllExperiments;
  sendEvent?: (event: ObservEvent) => void;
  logExperimentId?: (id: string) => void;
};

type GetAllExperiments = () => Promise<ActiveExperiments>;

type ActiveExperiments = ExperimentData[] | [];

type ExperimentData = {
  id: string;
  variants: VariantData;
};

type VariantData = {
  [index: string]: {
    elements: Elements;
    weight: number;
  };
};

type Elements = {
  [index: ElementId]: ElementOptionId;
};
```

## Example

```tsx
const myFirstExperiment = {
  id: "foo-bar",
  variants: {
    "foo-variant": {
      elements: {
        "page-title": "foo-option",
      },
      weight: 0.5,
    },
    "bar-variant": {
      elements: {
        "page-title": "bar-option",
      },
      weight: 0.5,
    },
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <ObservProvider
      config={{
        getAllExperiments: async () => [myFirstExperiment],
        sendEvent: (event) => console.log(event)
        logExperimentId: (id) => console.log(id)
      }}
    >
      <Component {...pageProps} />
    </ObservProvider>
  );
}

export default MyApp;
```
