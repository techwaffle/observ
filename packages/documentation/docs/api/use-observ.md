# useObserv

The `useObserv` hook can be used in any component nested within the `ObservProvider`. This hook provides access to `ObservContext` which contains the experiments and the event handlers.

`useObserv` can be utilised in the following way:

## ObservContext

```tsx
type ObservContext = {
  experiments: ActiveExperiments | null;
  getAllExperiments: () => Promise<ActiveExperiments>;
  sendEvent?: (event: ObservEvent) => void;
  logExperimentId?: (id: string) => void;
  logPageView?: (path: string) => void;
};
```

## Example

```tsx
const Home = () => {
  const { sendEvent, logPageView } = useObserv();
  useEffect(() => {
    logPageView("home");
  }, [logPageView]);
  return (
    <div>
      <button onClick={() => sendEvent("Button Clicked!")}></button>
    </div>
  );
};

export default Home;
```
