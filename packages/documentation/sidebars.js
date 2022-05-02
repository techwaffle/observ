// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sidebar: [
    "introduction",
    "concepts",
    "tutorial",
    {
      type: "category",
      label: "API",
      items: [
        {
          type: "doc",
          id: "api/observ-provider",
          label: "ObservProvider",
        },
        { type: "doc", id: "api/element", label: "Element" },
        { type: "doc", id: "api/use-observ", label: "useObserv" },
        {
          type: "category",
          label: "Event Handlers",
          items: [
            {
              type: "doc",
              id: "api/event-handlers/log-page-view",
              label: "logPageView",
            },
            {
              type: "doc",
              id: "api/event-handlers/send-event",
              label: "sendEvent",
            },
            {
              type: "doc",
              id: "api/event-handlers/log-experiment-id",
              label: "logExperimentId",
            },
          ],
          collapsed: false,
        },
      ],
      collapsed: false,
    },
  ],
};

module.exports = sidebars;
