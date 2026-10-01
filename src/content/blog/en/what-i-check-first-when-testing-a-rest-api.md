---
title: What I Check First When Testing a REST API
description: The first hour of API testing is not about covering every endpoint. It is about proving the contract, the auth story, and the failure modes you will actually hit in production.
publishDate: 2026-09-24
tags:
  - API Testing
  - QA
  - REST
category: API Testing
locale: en
translationKey: what-i-check-first-when-testing-a-rest-api
draft: false
---

When I get a new REST API, I do not start by generating a giant collection of happy-path requests. I start with the questions that, if unanswered, make every later test unreliable.

## Can I authenticate the way production does?

I want a token or session that matches the real client. If the docs show a test header that production never sends, I ignore it after the first smoke check. Auth bugs hide behind “it works in Postman with a magic key.”

I also check what happens when the token is missing, expired, or belongs to the wrong role. A 401 versus a 403 mix-up is a product decision. I want that decision to be consistent across resources.

## Does the contract match what clients will parse?

I look at status codes, content type, and the shape of a typical JSON body. If `GET /orders/123` returns `200` with an empty object for a missing order, clients will treat that as success. If it returns `404` with an HTML error page, clients that expect JSON will fail in a different way.

I pick one resource that is used everywhere — often the current user or a list endpoint — and write a small contract check: required fields present, types stable, unknown fields tolerated if the team agreed on that.

## What does a validation error look like?

I send one obviously bad payload: a missing required field, a string where a number belongs, an extra field if the API is strict. I want to see whether the response names the field, whether the status is `400` or `422`, and whether the error is safe to show in a UI.

Inconsistent error shapes are more expensive than missing edge cases. Frontends copy the first error format they see.

## Pagination, filters, and empty lists

List endpoints fail in boring ways. I check:

- an empty collection is still a `200` with an array, not `null`
- page size limits exist and are documented
- filter parameters that do nothing fail loudly or are ignored on purpose

If sorting is supported, I sort by a field I can control and confirm the order. I do not trust “it looks sorted” on random production-like data.

## Idempotency and the unsafe methods

I retry a `PUT` or `DELETE` when the API claims it is safe to retry. I also try a second `POST` with the same body if the resource is supposed to be unique. Duplicate creates are a classic source of flaky UI tests later.

I do not try to exhaust every endpoint on day one. I want a short list: auth works, one read is trustworthy, one write rolls back or cleans up, and errors are readable. After that, coverage can grow without lying about the basics.
