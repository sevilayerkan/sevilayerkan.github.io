---
title: Turning a Small Testing Pain Into a Browser Tool
description: Most of my side projects start as a repeated annoyance during testing. Here is how I decide when a pain is worth turning into a small browser tool.
publishDate: 2026-09-18
tags:
  - Build in Public
  - Browser Extensions
  - QA
category: Build in Public
locale: en
translationKey: turning-a-small-testing-pain-into-a-browser-tool
draft: false
---

A lot of QA work is the same five minutes, repeated. Fill a form. Invent an IBAN. Restore a bookmark you saved “for later.” None of that is hard. It is just frequent enough to steal attention from the actual bug.

When that happens often enough, I stop and ask whether the pain is a process problem or a missing tool.

## The rule I use

I only build something if I have hit the same friction at least three times in a week, and if the workaround is worse than a small script. Copying mock data from a spreadsheet qualifies. Opening ten bookmark folders to find one article also qualifies.

I do not start with a product brief. I start with the last time I muttered at the browser.

## Keep the first version embarrassing

The first version of a browser tool should do one thing. Generate a name. Bend a bookmark list. Dump a payload into a field. If the first version needs settings, onboarding, and a mascot, I am already solving the wrong problem.

I ship it to myself first. If I do not use it during the next test cycle, I delete it. Unused tools are just another folder in the repo.

## What testing taught me about the UI

Testers are harsh users of their own tools. If a popup takes three clicks, I will go back to the spreadsheet. So the UI has to be faster than the habit it replaces.

That usually means:

- a keyboard shortcut or a right-click action
- no login
- data that stays local unless there is a real reason not to

I also keep an eye on what I would report if this were someone else’s extension. Missing labels, focus traps, and silent failures are the same class of bugs I file on product work.

## When it is not worth a repo

Some pains are better as a snippet in the notes app. If the logic is ten lines and I will not share it, it does not need packaging. The project exists when I want version control, a store listing, or a story I can point to on this site.

Mock data generation and bookmark triage both crossed that line because I kept needing them on machines that were not mine, in browsers that reset profiles, during sessions where copy-paste from an old doc was the actual bottleneck.

The useful part is not the stack. It is noticing a loop, shrinking it, and being honest about whether the tool earned another hour of work.
