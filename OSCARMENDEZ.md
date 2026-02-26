# Team Lead Engineer — Technical Assessment - questions
===========
Question 1.
===========
A client reports that conversion dropped about 20% after our last deploy. Our stack includes Shopify, CheckoutChamp CRM, our dashboards, and a new A/B sales funnel (Checkout + 3 Upsell/Downsell pages).
 
> In 3–6 short steps, how would you run the investigation? 
(what would you do, in what order, and who would own what if you have a small team)
1- Verify with the client if this an aceptable number, if not recommend rolling back the deploy while the investigation is running (Tech lead).
2- Check the monitoring system since deploy for any alerts or errors (Dev/QA).
3- Check the staging/test environment and do a manual testing for the checkout process with latest changes (Dev/QA).
4- If no technical issues present, revisit the pages, identify pain points (irrelevant/unrelated data, too many choices, heatmaps) and check if any improvements can be done in either upselling or downselling pages (Tech Lead).

> What’s the first place you’d look in our stack and why?
Observability is essential to reduce time diagnosing and pushing a fix. Second step above,
more specifically shopify admin were you see the recent checkouts and abandoned checkouts 
(either directly into the GraphQL or if not present a dashboard with at least the last week for comparison).
This would immediately verify that at least orders are being created and focus on the funnel instead.

===========
Question 2.
===========
The team is using AI coding tools.

> What guidelines or guardrails would you set so AI use improves quality and speed without increasing risk?
(e.g. review requirements, testing, security)
Since any model it's eveolving so rapidly, it's best to start doing the followjng:
- If not in place already plan/ask, before applying changes.
- Being more diligent with the prompting structure (mf files accessible to the team were we could evolve the nature of the changes being applied by the agent).
- Have a list of predefined skills that go against prompting strcuture (kepp the skills within the structre of the agent).
- If possible having a chat when something is done incorrecly to discuss how to improve the prompt and then push the prompt change.

===========
Question 3.
===========
You have 2 engineers with bandwidth for 6 weeks to deliver: client portal + internal dashboard + payment routing prototype.

> What do you build first, what do you defer, and why?
> Provide a 6-week plan with milestones and risks.

Whe should build fast so we should have a two week strategy where the initial push would the client portal becuase we should always get feedback fast.
First sprint will be UX focused to visually show progress and get feedback from the client. Tech Lead provides the POC of the site and help devs distribute the remaining efoort on the UX components.
Second sprint focused on the internal dashboard and already working on customer feedback from the client portal. Tech Lead gathers more specs to refine specific dashboards. We distribute workload for devs to implement them and Tech Lead works on client portal improvements.
Third sprint payment routing prototype, dashboard feedback. This way we can have a better understanding of the client vision, there's been isolated time to have a plan to integrate with the client portal, staging area for full worflow execution and proper production release by the end of the sprint.

===========
# Task 1. Code in attached repo (5 min)
===========
Open `codebase/routes/orders.js` (your version after fixes).

> In your own words: what was wrong with the original `syncOrder` logic (before your fixes), and why did those issues matter for production?
> What did you change first and why that order?
First, basic validation that orderId and payload are present, no required fields should be used without proper validation.
Second, adding the necessary logic to support idempotency duplicate values which is not acceptable to have duplicate orders.
These are mandatory verifications at the production environment.

===========
# Task 2. Code in attached repo (5 min)
===========
Open `codebase/routes/funnel.js`. Reference original file for this question; Just review it.

> List 2–3 specific risks or bugs in `recordFunnelStep` (security, correctness, or reliability). Be specific (e.g. “X could happen because Y”).
> What would you add or change first before this code goes to production, and why that order?
First, as mentioned in orders, coding standards like validation of fields must be present. Example clickId, stepKey and payload.
Second, for consistency with the orders imdempotency must be implemented. For example the clickId is the idempotency key, if the same clickId is sent again, return the existing sync result without creating a duplicate or calling the warehouse twice.
Third, for the raw property build the string before with the JSON.stringify, add error handling in case the payload is malformed and forward this information into the logging system. This will help troubleshoot better before calling the pushh method.

===========
# Task 3 Simple Site/App (30min-1hr)
===========
Here is a free MUSIC API

https://www.theaudiodb.com/api_guide.php
Key: 661239

> Build a simple site/app where a user can search an artist by using keywords. 
> Quick actions: User clicks on the Artist, have it display Albums list plus any other information you want to showcase. 
> Be Creative!


Notes:
Do NOT spend more than 1hour
DO NOT PAY FOR API ACCESS - USE KEY ABOVE

You do NOT have to implement all features available for this API project!
You are welcomed to choose the ones that could show your skills in the allotted time.

================
# Deliverables #
================
Once you've completed questions and tasks, please send back your task projects and answers to the questions via zip or git repo. 
We will review task projects locally

