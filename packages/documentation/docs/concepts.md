# Concepts

## Element

At the heart of Observ is the concept of an **element**. You can think of an element as a section of a page that you want to run an experiment on. This could be as small as a `<p>` tag or as big as the whole page itself.

For simplicity, let's say we want to run an experiment to find out what the most effective colour is for an 'Add to bag' button on an e-commerce website, in order to improve our conversion rate. In this scenario, our element is the button.

## Element Options

In our example, we are working with our button element. Our element can have multiple options, for example it could be a blue button with white text, or a red outlined button with red text. You think think of these options as the different forms our element can take throughout the experiment. Some users will see the blue button, others will see the red button.

![Blue Button](/img/blue-button.png)
![Red Button](/img/red-button.png)

We would then create both of these options in our code to use in the experiment.

## Variants

What if we wanted to work with multiple elements during the course of an experiment? In that case, we'd be designing what is known as a **multivariate test** (or **MVT** for short). To use our previous e-commerce website example, we could also test how changing the size of our product image influences our converstion rate.

You can think of variants as our test cases where behind the scenes we'd want to analyse what combination of our different elements works best. To work out how many variants a multivariate test has you just multiply the number of options for each element together.

> So, in our example let's say we have two options for our image element (small and large) and two options for our 'Add to bag' button (blue and red). This gives us four possible combinations to try out with our users once we pair each of the element options together. If we wanted to throw in another element in there, with another two options, we'd end up with eight different variants (2x2x2).
>
> This is in contrast to our previous example, where we are working with a single element with two different options - also known as an **A/B Test**, since we're either showing a user our 'A' option (the blue button) or our 'B' option (the red button).

Since we are working with multiple variants, we might want to think about configuring how _often_ a certain variant is shown to a user. At the moment we're showing each variant to roughly 25% of our users, but what if we wanted to skew that so that the majority of our users see the 'large image with blue button' variant? In that case, we'd want to use **variant weighting**. We can set this variant to show to 70% of our users, leaving 30% of users seeing either of the other three variants at 10% weighting each.
