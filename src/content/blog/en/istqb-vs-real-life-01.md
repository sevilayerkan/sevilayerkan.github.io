---
title: "ISTQB vs Real Life #1: What Is ISTQB, What Is CTFL, and Is Testing Just About Finding Bugs?"
description: "What ISTQB and CTFL are, why the certificate exists, and why testing is more than finding bugs — the first note in a series that compares the syllabus with real QA work."
publishDate: 2026-10-02
category: QA
tags:
  - ISTQB
  - CTFL
  - QA
locale: en
translationKey: istqb-vs-real-life-01
draft: false
---

# ISTQB vs Real Life #1: What Is ISTQB, What Is CTFL, and Is Testing Just About Finding Bugs?

I have been planning to prepare for the ISTQB CTFL exam again for some time. I took the exam before and missed it by a small margin.

This time, I did not want to only read the syllabus and solve questions by myself. I decided to study the topics during my livestreams and compare the theory with what we actually experience in QA projects.

That is how my new series, **“ISTQB vs Real Life,”** started.

In the first stream, we started from the basics: What is ISTQB? What is CTFL? Why would someone get this certification? What does software testing really mean? And are concepts like QA, testing and debugging actually the same thing?

## What is ISTQB?

ISTQB stands for **International Software Testing Qualifications Board**.

CTFL stands for **Certified Tester Foundation Level**.

Foundation Level gives a common foundation for software testing concepts and terminology.

However, “foundation” does not mean the syllabus is only about very simple topics like bugs and test cases.

The CTFL syllabus covers software testing fundamentals, testing throughout the software development lifecycle, static testing, test analysis and design, test management and test tools.

Another important point is that the syllabus is not only for testers. Developers, project managers, product owners and business analysts can also benefit from this knowledge.

For me, this gives an important message:

**Quality is not only the QA team's responsibility.**

## Why get an ISTQB certification?

I do not see ISTQB as a “get this certificate and you will immediately find a job” type of certification.

For me, it is useful mainly because it helps organize knowledge.

When we work in QA, we learn many things through experience. We run regression tests, test APIs, write test cases and make risk-based decisions.

But sometimes we do not know the official terminology for what we are already doing.

ISTQB gives a structure to this knowledge.

It can also help on a CV because it shows that you studied a standard software testing syllabus.

However, there is one important point:

**Certification is not experience.**

Having CTFL does not automatically make someone a good or senior tester.

Real projects still require analytical thinking, communication, technical knowledge, risk awareness and problem-solving skills.

## What are K1, K2 and K3?

When reading the ISTQB syllabus, you often see K1, K2 and K3 next to learning objectives.

K1 is about remembering.

K2 is about understanding.

K3 is about applying.

During the stream, I explained them in a simpler way:

**K1:** Know it.  
**K2:** Explain it in your own words.  
**K3:** Now we actually have to solve something.

This will become more important later when we study techniques such as Boundary Value Analysis and Decision Table Testing.

For those topics, memorizing a definition will not be enough. We will need to derive real test cases.

## So, what is software testing?

This was one of the main topics of the first stream.

Many people think software testing means opening the application, clicking around and checking the results.

But testing is broader than that.

According to the syllabus, software testing is not only about executing software. Work products such as requirements, user stories, designs and code can also be evaluated. Testing can be static or dynamic.

This means we can contribute to testing even before the code exists.

Imagine a Jira ticket with this acceptance criterion:

> The user can update their profile.

Which fields?

Can the user change their email?

Is verification required?

What happens with an invalid phone number?

Can one user update another user's profile?

If none of these are clear, we already have a testability problem before development starts.

This is also why I do not think it is ideal when QA sees a task for the first time only after development is finished.

## Is the goal of testing just finding bugs?

Finding defects is an important part of testing.

But it is not the only goal.

The syllabus also talks about reducing risk, verifying requirements, evaluating work products and giving stakeholders enough information to make decisions.

This is one of my favorite ideas from the first topic.

Imagine you tested a critical feature all day and found no defects.

Was that day useless?

No.

You may have provided evidence that the feature works under the tested conditions. You may have reduced uncertainty around an important risk.

The output of testing is not always a defect.

Sometimes the most important output is **information**.

## Verification vs Validation

A simple way to remember the difference is:

**Verification:** Are we building the product correctly?

**Validation:** Are we building the right product?

The syllabus explains that testing includes both checking requirements and checking whether the system meets user and stakeholder needs.

A system can match every written requirement and still be a bad product.

If the requirements do not represent the real user need, passing every acceptance criterion does not automatically mean the product is successful.

## Testing and Debugging are different

These two activities are often mixed together in real projects.

Testing can trigger a failure or directly find a defect through static testing.

Debugging is about finding the cause of the failure, analysing it and fixing the defect. The syllabus describes the typical debugging process as reproducing the failure, diagnosing the defect and fixing it. After that, confirmation and regression testing may be needed.

For example, imagine I send an API request and receive a 500 response.

I reproduce the issue and collect the request, response and test data.

Then the developer checks the logs, finds the problem and fixes the code.

After that, I run the same scenario again to confirm the fix.

Testing and debugging are different activities.

But this does not mean QA engineers cannot read logs or investigate technical problems.

The difference is about the purpose of the activity, not which tool someone is allowed to use.

## Is Testing the same as Quality Assurance?

This was probably one of the most interesting discussions in the first stream.

Many of us have “QA Engineer” in our job titles, but a large part of our daily work may actually be testing.

ISTQB describes testing as a more product-oriented and corrective quality control activity. Quality Assurance is more process-oriented and preventive. It focuses on how processes are applied and improved. The syllabus also states that QA is the responsibility of everyone involved in the project.

For example, sending an invalid password to a login endpoint and checking the response is testing.

But if authentication requirements are incomplete in every sprint, asking why this keeps happening and improving the refinement process is closer to Quality Assurance.

In real projects, these two areas often overlap.

## Human Error → Defect → Failure → Root Cause

These concepts are easy to mix up.

Let us use a simple example.

The requirement says:

> Users aged 18 and over can register.

But the developer writes:

```javascript
if (age > 18) {
  allowRegistration();
}
```

The mistake made by the person is the **human error**.

The `> 18` condition in the code is the **defect**.

An 18-year-old user being unable to register is the **failure** we observe.

Then we have the root cause.

Why did the defect happen?

Maybe the requirement was misunderstood.

Maybe the review process did not catch it.

Maybe there was time pressure.

We cannot know the exact root cause without analysing the real situation.

The syllabus separates human error, defect, failure and root cause, and also explains that a defect does not always cause a failure in every situation.

I think this difference is also very useful in real QA work.

“Where is the bug?” and “Why did this bug happen?” are not the same question.

## What I learned from the first stream

We were still at the beginning of the syllabus, but the first topic already changed the way we can look at testing.

**Testing is not just executing test cases.**

It also includes asking questions, reviewing requirements, understanding risks, giving feedback and providing information about product quality.

In the next stream, I will continue with the **seven testing principles**.

There is one principle I especially want to discuss:

**“Exhaustive testing is impossible.”**

It sounds simple in theory.

But when the release is tomorrow and you still have 100 test cases waiting, the real question starts:

**Which ones are we going to test?**
