# logPageView

The `logPageView` event handler is for logging whenever a user lands on a page of your site. By default, this event handler uses `console.log()` to handle this event.

```ts
type LogPageView = (path: string) => void;
```

## Example

This example assumes you are using Next.js

```tsx
const Layout = ({ children }) => {
  const { pathname } = useRouter();
  const { logPageView } = useObserv();
  useEffect(() => {
    logPageView(`${pathname}`);
  }, [pathname, logPageView]);

  return <div>{children}</div>;
};

export default Layout;
```
