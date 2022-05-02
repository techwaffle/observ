# sendEvent

The `sendEvent` event handler is for logging any generic event of your choice. By default, this event handler uses `console.log()` to handle this event.

```ts
type ObservEvent =
  | {
      [index: string]: string;
    }
  | string;

type SendEvent = (event: ObservEvent) => void;
```

## Example

This example assumes you are using Next.js

```tsx
const MyButton = () => {
  const { sendEvent } = useObserv();
  return <button onClick={() => sendEvent("Button Clicked!")}></button>;
};

export default MyButton;
```
