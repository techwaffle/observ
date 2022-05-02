# Tutorial

This tutorial will walk you through the most basic way to set up Observ in your project.

## Installation

To get started, begin by installing the package in your react application:

```bash npm2yarn
npm install @techwaffle/observ
```

## Setting Up the Provider

Now that you've got the package installed, you can start configuring the `ObservProvider`. This is the top level component that will wrap all of your experiments. It is also where you'll configure how you want to use this library and integrate it with other services.

Firstly, wrap your application in the provider like so:

### Create React App

```jsx
import { ObservProvider } from "@techwaffle/observ";

ReactDOM.render(
  <ObservProvider>
    <App />
  </ObservProvider>,
  document.getElementById("root")
);
```

### Next.js

If you're using Next.js, you'll want to wrap your application from within `_app.js`:

```jsx
import { ObservProvider } from "@techwaffle/observ";

function MyApp({ Component, pageProps }) {
  return (
    <ObservProvider>
      <Component {...pageProps} />
    </ObservProvider>
  );
}

export default MyApp;
```

## Configuring the Provider

Now that you've wrapped your application in the `ObservProvider`, it's time to give it some configuration.

Let's give the provider some way of getting our experiment data. Your experiment data can come from anywhere, whether that's a remote server or hardcoded directly into the configuration of the provider.

The way we provide this configuration is by defining our `getAllExperiments` handler. This is an asynchronous function that returns an array of our experiments. An experiment must have the following signature:

```ts
type ExperimentData = {
  id: string;
  variants: {
    [index: string]: {
      elements: {
        [index: string]: string;
      };
      weight: number;
    };
  };
};
```

Now that we know how to define an experiment, let's create our first one! This example is done with Next.js but everything still applies to any React application. If the concepts of _Variants_, _Elements_, _Options_ or _Weighting_ don't make sense, have a read of the [Concepts](/docs/concepts) section.

```jsx
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
      }}
    >
      <Component {...pageProps} />
    </ObservProvider>
  );
}

export default MyApp;
```

## Setting Up an Element

In the above example, we've configured an experiement to show either 'Foo' or 'Bar' as our page title with equal weighting. We haven't created what those look like yet so let's do that now.

In your page, import the `Element` component and place it where you'd like it to show. For this tutorial, I'll have it as the only component on the page:

```jsx
import { Element } from "@techwaffle/observ";

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
```

Notice the five important props that we pass to the Element component. `id` is the ID of the element. This is needed for distinguishing between the multiple elements you could have in your experiment. `experimentId` is the ID of the overarching experiment. We need this because we could have multiple experiements running in our application at the same time. `options` is where we define what we want each of our element options to look like. In our case, we're keeping it simple with `<h1>` tags but these could be complex React components. Finally, `skeleton` and `fallback` are for our loading and error states respectively.

Now run your application and watch how your element is rendered with either our 'Foo' or 'Bar' option. If you reload the page you'll also notice that you still see the same option. This is because when a user loads your application, the `Element` component checks if the user has previously rendered this experiment/ element combination. It does this by looking in `localStorage` for a unique key that contains the previously selected option. If it isn't found, it picks a variant at random with whatever weighted distribution you provided to your variants, and then saves the element option for that variant to `localStorage` for next time. We do this because we want to give our users a consistent experience when they return to the site later.

## Element Event Handlers

If you open up the dev tools for whatever browser you are using and navigate to the console, you'll see that when the `Element` component renders, it logs some data. Let's take a look at what those logs are.

Firstly, the `sendEvent` handler is called. This handler is set up by default to simply call `console.log()` with whatever event you provide to it. In the case of the `Element` component, it passes the name of the selected option. After the `sendEvent` handler, the `logExperimentId` handler is called. This does what it says on the tin. Again, by default, it simply calls `console.log()` with the `experimentId`.

### Customising Event Handlers

During development, having these event handlers call `console.log()` is useful to see what events are being triggered. However, when you want to actually capture user data in production, you probably want to do something useful with this data. That's why Observ allows you to override these handlers however you like. You can send data to a remote server for later analysis or just to keep a log of what users are doing on your site.
