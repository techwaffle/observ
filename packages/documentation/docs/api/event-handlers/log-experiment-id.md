# logExperimentId

The `logExperimentId` event handler is used by the `Element` component to log when an experiment has been triggered. By default, this event handler uses `console.log()` to handle this event.

```ts
type LogExperimentID = (id: string) => void;
```
