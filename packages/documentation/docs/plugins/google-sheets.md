# Google Sheets

This plugin can be used to fetch experiment data from Google Sheets. This plugin is made up of two functions: one for the React application and one for the server. This is necessary to keep the Google API credentials hidden from the client.

## Creating a Google Sheet

Head over to Google Sheets and create a new spreadsheet. To create a new experiment, fill in the data of your experiment in the following format:

![Google Sheets Experiment](/img/google-sheets-experiment.png)

Here is an example of what that could look like:

![Google Sheets Hello World Example](/img/google-sheets-hello-world.png)

You can add as many variants and elements as you like to the experiment. You can also add many experiments to a single spreadsheet. Simply separate the experiments by an empty row:

![Google Sheets Multi Experiment Example](/img/google-sheets-multi-experiment.png)

## Installation

To get started, begin by installing the plugin package in your application:

```bash npm2yarn
npm install @observjs/plugin-googlesheets
```

## Setting Up the Server Side Function

Now that you've got the package installed, you can configure the Google API secrets as environment variables that we'll later use to configure the `fetchAPI` function on your server.

To use the Google Sheets API, you'll need to do two things:

1. Enable the [Google Sheets API](https://developers.google.com/workspace/guides/enable-apis)
2. Create credentials for a [service account](https://developers.google.com/workspace/guides/create-credentials#service-account)

Once you have downloaded the credentials file for your service account, grab the `client_email` and `private_key` for your service account and add them as environment variables for your application. Ensure you don't include these into your version control system.

With the environment variables set up, we can configure the `fetchAPI` function on the server.

If you are using Next.js, you can do this from an API route:

```jsx
import ObservGoogleSheetsPlugin from "@observjs/plugin-googlesheets";

export default async function handler(req, res) {
  const experiments = await ObservGoogleSheetsPlugin.fetchAPI({
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    spreadsheetId: "abcdefghijklmnopqrstuvwxyz",
    range: "A1:C3",
  });

  res.status(200).json(experiments);
}
```

Fill in the `clientEmail` and `privateKey` configuration properties with the respective environment variables defined earlier. You may need to replace the new line characters in the private key.

For the `spreadsheetId`, grab it from the URL of your spreadsheet. It is found in the following format: `https://docs.google.com/spreadsheets/d/<spreadsheetId>/edit#gid=0`.

The `range` property is where you tell the plugin what spreadsheet cells hold the data of your experiment. Using the [A1 notation](https://developers.google.com/sheets/api/guides/concepts#expandable-1), ensure all of the data of your experiment is covered. For example, the following spreadsheet would have the range `A1:C7` to cover the cells diagonally from `hello-world` to `bar-copy`:

![Google Sheets Multi Experiment Example](/img/google-sheets-multi-experiment.png)

Once that is configured, the plugin will return the experiement data in the format that Observ needs to set up your experiments on the client.

## Setting Up the Client Side Function

Now that the API has been set up, we can configure our `ObservProvider` to get the experiment data. In the configuration, simply use the `getAllExperiments` function from `ObservGoogleSheetsPlugin`:

```jsx
import { ObservProvider } from "@observjs/core";
import ObservGoogleSheetsPlugin from "@observjs/plugin-googlesheets";

function MyApp({ Component, pageProps }) {
  return (
    <ObservProvider
      config={{
        getAllExperiments: ObservGoogleSheetsPlugin.getAllExperiments({
          url: "/api/sheets",
        }),
      }}
    >
      <Component {...pageProps} />
    </ObservProvider>
  );
}
```

The only property needed to confure is the `url`. Simply set this to the URL of the API that you have just created and you're all done!
