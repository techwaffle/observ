import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Experiment",
    image: "/img/experiment.svg",
    description: (
      <>
        Observ gives you tools to create simple or complex experiments. From A/B
        tests to multivariate testing, we've got you covered.
      </>
    ),
  },
  {
    title: "Analyse",
    image: "/img/analyse.svg",
    description: (
      <>
        Collect your data anywhere you like and analyse the results of your
        experiments. Observ offers full customisation to integrate with existing
        tooling.
      </>
    ),
  },
  {
    title: "Improve",
    image: "/img/improve.svg",
    description: (
      <>
        Learn from the data you've gathered by improving your site with the
        results of your experiments.
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
