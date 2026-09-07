# A/B Testing in Email Marketing: What Actually Counts as a Result

Most email A/B tests do not produce knowledge. They produce a number that is higher than another number, on a sample too small to mean anything, and a team that now believes something false about their audience.

The mechanics of running a test are trivial — every platform has the feature. The discipline of knowing when a result is real is where the value sits, and it is the part almost every guide skips.

### Key takeaways

- A/B testing compares two versions of an email to find which performs better against a defined goal.
- Sample size determines whether the answer means anything. Most tests on small lists cannot resolve the differences people claim to find.
- Test one variable at a time, or you learn nothing about either.
- Open rate is no longer a reliable test metric. Optimise for clicks and conversions.

## What A/B testing is

You split your audience, send version A to one group and version B to the other, and compare performance against a metric chosen in advance. Subject lines, calls to action, layout, personalisation and send timing are all testable.

The value is that it replaces opinion with evidence. The risk is that it replaces opinion with *false* evidence, which is worse — an unfounded belief now carries the authority of data.

## The part that decides whether a test is worth running

**A test needs enough recipients to detect the difference you care about.**

The intuition most people carry is badly wrong here. Detecting a small improvement requires a much larger sample than detecting a large one — and small improvements are what most tests are actually measuring.

Some practical consequences:

- On a list of a few thousand, only large effects are detectable. A test showing a two-point difference in click rate on that list has told you nothing.
- Stopping a test early because one version is "clearly winning" is the most common way to manufacture a false result. Early leads reverse constantly.
- Set the sample size and the duration before you start, then leave it alone.
- Use your platform's significance calculation if it has one. If it does not, treat close results as inconclusive rather than as wins.

A test that concludes "no detectable difference" is a legitimate outcome and often the most useful one — it tells you to stop spending effort on that variable and go test something that might matter.

## Choosing the metric

**Do not test against open rate.** Since Apple's Mail Privacy Protection began pre-loading images, a significant share of recorded opens never happened. Any subject-line test measured on opens is now measuring an artefact.

Test against clicks, or better, against the conversion the email exists to drive. This is harder, because conversions are rarer and therefore need more volume — but it is the only measurement that connects the test to the outcome.

## What to test, in order of likely impact

1. **The offer or the ask.** Changing what you are actually proposing moves results far more than changing how it is phrased. Most teams test button colours and never test the offer.
2. **Audience segmentation.** Sending the right message to the right segment usually beats optimising one message for everyone.
3. **Send timing and frequency.** Often significant, and easy to test cleanly.
4. **Subject line and preview text.** Genuinely matters, but measure it on clicks, not opens.
5. **Call to action — placement and wording.** Placement usually beats wording.
6. **Layout and length.** Worth testing occasionally; rarely the biggest lever.

Button colour is near the bottom of this list, despite being the canonical A/B testing example.

## Running a test properly

1. **State the hypothesis.** "Leading with the price will increase click-through because our audience is comparison-shopping" is testable. "Let's try a different subject line" is not.
2. **Change one variable.** Two changes give you a result you cannot attribute.
3. **Define the metric and the sample size before sending.**
4. **Randomise the split.** Do not split by signup date, alphabetically, or by any field correlated with behaviour.
5. **Run for a full cycle.** A test that runs Tuesday morning only tells you about people who read email on Tuesday mornings.
6. **Record the result — including the null ones.** A test log is the only way an organisation accumulates knowledge rather than repeating the same experiments.

## Segment before you conclude

An aggregate result can hide a reversal. A subject line that performs worse overall may perform substantially better with your highest-value segment, and shipping the aggregate winner would be the wrong call.

Break results down by segment before deciding, provided each segment still has enough volume to be meaningful. If it does not, note the observation as a hypothesis for a future test rather than acting on it.

## Tools

Most email platforms — Mailchimp, ActiveCampaign, Klaviyo, Brevo and others — include A/B testing natively, and for the majority of teams that is sufficient. Dedicated experimentation platforms like Optimizely and VWO are built primarily for on-site testing; they are worth adding when you want to test the email and the landing page as one connected experience, which is where the larger gains usually are.

Check whether your platform reports statistical significance or only raw percentages. If it reports only percentages, it will happily declare a winner that is noise.

## Turning results into strategy

A single test result is a data point, not a strategy. The value comes from accumulation: a documented series of tests that establishes what your audience consistently responds to.

That accumulated picture is what should shape segmentation, cadence and content — not the last test anyone happened to run.

## Conclusion

The mechanics are easy. The discipline is not. Test things that could plausibly change behaviour, size the test so the answer means something, measure against clicks or conversions rather than opens, and accept null results as real findings.

A team running four well-designed tests a year will learn more than one running a test a week on samples too small to resolve anything.

## FAQ

### What is A/B testing in email marketing?

Sending two versions of an email to comparable segments of your audience and comparing performance against a metric defined in advance.

### How large does my list need to be?

Large enough to detect the size of difference you care about. Small differences need much bigger samples than most people assume. If your platform reports significance, let it decide; if not, treat narrow results as inconclusive.

### Can I test more than one thing at once?

Not in a standard A/B test — you will not know which change caused the result. Multivariate testing exists but needs considerably more volume.

### Should I test subject lines?

Yes, but measure the effect on clicks rather than opens. Open-rate data is unreliable now.

### How long should a test run?

Long enough to cover a full behavioural cycle, and to reach your predetermined sample size. Decide before you send and do not stop early because one version is ahead.

### What if there's no difference?

That is a real result. It tells you the variable does not matter for your audience, which saves you from optimising it further. Log it and test something else.
