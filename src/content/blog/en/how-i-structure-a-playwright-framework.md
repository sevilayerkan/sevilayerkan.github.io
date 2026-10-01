---
title: How I Structure a Playwright Framework
description: A practical folder layout and a few rules I keep coming back to when a Playwright suite starts growing past a handful of tests.
publishDate: 2026-09-30
updatedDate: 2026-09-30
tags:
  - Playwright
  - Test Automation
  - QA
category: Automation
locale: en
translationKey: how-i-structure-a-playwright-framework
draft: false
---

A Playwright project is easy to start and easy to make messy. The first ten tests usually live in one folder, share a couple of locators, and still feel fine. The trouble starts when a login flow is copied into five files and a button rename breaks half the suite.

I keep the structure boring on purpose.

## What I put where

I separate **tests**, **pages**, **fixtures**, and **helpers**. Tests describe intent. Page objects know how to talk to the UI. Fixtures own setup that more than one test needs. Helpers stay small and stay out of the page objects when they are not about a screen.

A typical tree looks like this:

- `tests/` for specs, grouped by product area
- `pages/` for locators and user-facing actions
- `fixtures/` for authenticated sessions, test data, and API setup
- `helpers/` for date formatting, retries I actually need, and one-off waits I could not delete yet

I do not put assertions inside page objects. If a method is named `submitForm()`, it submits the form. The spec decides whether the result is correct.

## Locators that survive a redesign

I prefer role and label locators over CSS chains that describe the current layout. `getByRole('button', { name: 'Save' })` is slower to type the first time and cheaper when the designer moves the button.

When a control has no accessible name, I treat that as a product bug, not a test problem. A `data-testid` is a last resort, and I keep those names stable. Changing a test id because the component was refactored is the same class of pain as changing a CSS class.

## One fixture for the expensive part

Login is the usual expensive part. I log in once through the UI or through an API, store storage state, and reuse it. Tests that need a fresh user get a dedicated fixture instead of a copied `beforeEach` block.

If a test needs a specific record in the database, I create it through the API in the fixture and delete it in teardown. UI tests that also seed data through the UI slow the suite down and hide API issues.

## What I refuse to abstract

I do not wrap Playwright itself in a custom `click()` helper. I do not build a generic `waitForPageToBeReady()` that sleeps until “something” happens. If a wait is required, it belongs next to the condition it is waiting for, with a comment that explains why the UI is slow.

A framework should make the next test easy to write. If adding a spec means learning an internal DSL, the structure already failed.

The goal is not a clever architecture. It is a suite that a teammate can open on a Monday, find the login flow, and change one locator without opening eight files.
