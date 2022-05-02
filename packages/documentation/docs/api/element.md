# Element

The `Element` component represents an element in an experiment. This is where you'll define how you want your different element options to look.

You can choose to provide a `fallback` component to render if fetching the experiment fails and a `skeleton` component to render whilst the application fetches the experiment data to choose which option to load.

You can configure `Element` in the following way:

## ElementProps

```tsx
type ElementProps = {
  id: string;
  experimentId: string;
  options: ElementOptions;
  fallback?: JSX.Element;
  skeleton?: JSX.Element;
};
```

## ElementOptions

```ts
type ElementOptions = {
  [index: string]: JSX.Element;
};
```

## Example

```tsx
<Element
  id="page-title"
  experimentId="foo-bar"
  options={{
    "foo-option": <h1>Foo</h1>,
    "bar-option": <h1>Bar</h1>,
  }}
  skeleton={<p>Loading</p>}
  fallback={<p>fallback</p>}
/>
```
