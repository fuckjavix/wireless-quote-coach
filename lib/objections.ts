import { Objection } from "./types";

export const OBJECTIONS: Objection[] = [
  {
    id: "too-expensive",
    label: "Too Expensive",
    customerLine: "That's more than I wanted to spend.",
    responses: [
      {
        repResponse:
          "I completely get that. Let's break it down and make sure you're only paying for what actually matters to you.",
        followUp:
          "Is your main concern the monthly payment, the upfront cost, or the total value?",
        close:
          "If I can get this closer to your budget while still protecting your trade-in value, would you feel comfortable moving forward today?",
      },
      {
        repResponse:
          "That's fair — nobody wants to overpay. Let me show you where every dollar is going so we can trim anything that doesn't fit.",
        followUp:
          "Which part of the total feels the biggest stretch — the device, the plan, or the extras?",
        close:
          "If we land at a number that makes sense for your budget, is there anything else holding you back?",
      },
      {
        repResponse:
          "I hear you. Let's make sure this quote is actually built around what you need, not just defaults.",
        followUp: "What's a monthly number that would feel comfortable for you?",
        close:
          "Let me see what I can do — a lot of reps don't show the autopay discount upfront, and that alone can change the picture.",
      },
    ],
  },
  {
    id: "think-about-it",
    label: "I Need to Think About It",
    customerLine: "I just need some time to think it over.",
    responses: [
      {
        repResponse:
          "Absolutely, this is a real decision. What I want to make sure is that you have everything you need to make the right call.",
        followUp:
          "Is there a specific part of this that you're not 100% sure about yet?",
        close:
          "If I could clear that up right now, would you be ready to get started today?",
      },
      {
        repResponse:
          "Of course — I'd never want you to rush. Can I ask what's on your mind?",
        followUp:
          "Sometimes 'thinking about it' means there's one thing that doesn't quite feel right. What is it for you?",
        close:
          "Let's solve that piece right now so you leave today feeling confident either way.",
      },
      {
        repResponse:
          "That makes total sense. What I want to do is make sure thinking about it doesn't cost you anything.",
        followUp:
          "The trade-in promo we have today may not be available next week — is that something I should flag for you?",
        close:
          "If the promo is the deciding factor, we can lock it in now and you'd still have time to finalize details.",
      },
    ],
  },
  {
    id: "spouse",
    label: "I Want to Check With My Spouse",
    customerLine: "I need to talk to my husband/wife first.",
    responses: [
      {
        repResponse:
          "That's completely reasonable — big decisions are better made together. Is there any chance they could join us now or hop on a quick call?",
        followUp:
          "What do you think their biggest question would be about this?",
        close:
          "Let me put together a summary you can share with them so they have all the numbers in front of them.",
      },
      {
        repResponse:
          "I love that — team decisions are smart decisions. What's the best way to loop them in?",
        followUp: "Would a text summary or a callback appointment work better?",
        close:
          "I'll save this quote so when you're both ready, we pick up right where we left off.",
      },
      {
        repResponse:
          "Totally get it. Let me make sure you walk out with everything you need to have that conversation.",
        followUp: "What would be the most important thing for your spouse to know?",
        close:
          "If they're on board after you chat, I can hold this quote for 24 hours — just give me a call.",
      },
    ],
  },
  {
    id: "happy-with-phone",
    label: "I'm Happy With My Current Phone",
    customerLine: "My phone works fine. I don't really need a new one.",
    responses: [
      {
        repResponse:
          "That's actually great news — your phone probably has solid trade-in value right now. We can put that toward lowering your bill instead.",
        followUp:
          "If we could use your current phone's value to drop your monthly payment, would an upgrade be worth looking at?",
        close:
          "A lot of customers say the same thing, then end up saving more monthly than they expected once we run the numbers.",
      },
      {
        repResponse:
          "Totally fair — and honestly you don't have to upgrade today. Let's focus on the plan side first.",
        followUp: "Is there anything about your current plan that you wish worked better?",
        close:
          "Sometimes the right plan saves you more than the device swap. Want to look at what that number would be?",
      },
      {
        repResponse:
          "No pressure at all. That's actually a strong position to be in — your trade-in value is probably at its peak right now.",
        followUp:
          "If the trade-in covered most of the upgrade cost, would it still feel like a stretch?",
        close:
          "Let me show you the math real quick — you might be surprised what it actually costs out of pocket.",
      },
    ],
  },
  {
    id: "no-protection",
    label: "I Don't Want Protection",
    customerLine: "I don't need insurance. I've never broken a phone.",
    responses: [
      {
        repResponse:
          "I hear that — and most people say that right up until the moment something happens. My job is just to make sure you know what you're opting out of.",
        followUp:
          "If you crack the screen or lose this phone, what's your plan? Apple Care, carrier insurance, or out of pocket?",
        close:
          "If you're comfortable with the risk, that's totally valid. But if replacing this phone at full price would hurt, protection might be worth the $__ a month.",
      },
      {
        repResponse:
          "Completely up to you — I'll never push something you don't want. Can I just show you what it covers real fast?",
        followUp:
          "Does your homeowner's or renter's insurance cover lost or damaged phones?",
        close:
          "If not, this plan covers theft and loss too, not just damage — that's the part most people don't realize until it's too late.",
      },
      {
        repResponse:
          "Fair enough — you clearly take care of your stuff. I just want to make sure you're comparing apples to apples.",
        followUp:
          "The device you're getting retails at $___. Are you comfortable with that being your risk if something goes wrong?",
        close:
          "If the answer is yes, we skip it — no problem. If there's any doubt, $___ a month looks pretty reasonable against that.",
      },
    ],
  },
  {
    id: "cheaper-online",
    label: "I Saw a Cheaper Deal Online",
    customerLine: "I saw a better deal on their website.",
    responses: [
      {
        repResponse:
          "Good catch — let's pull that up together. Online deals often have trade-in requirements, port-in requirements, or plan restrictions that aren't obvious at first glance.",
        followUp: "Do you remember what the fine print said about eligibility?",
        close:
          "If the in-store offer ends up being a better total value once we factor everything in, would you want to move forward here?",
      },
      {
        repResponse:
          "I'm glad you looked — that's smart shopping. Let me see if I can match or beat it, or at least explain the difference.",
        followUp: "Was the online deal for new customers only, or does it apply to your account?",
        close:
          "A lot of online promos require you to be a new line — if you're existing, I may actually have something better here in the store.",
      },
      {
        repResponse:
          "Online pricing can look great until you add taxes, device fees, and activation. Let's do a side-by-side.",
        followUp: "What was the total out-of-pocket that the website showed you?",
        close:
          "If my total beats theirs once we factor everything in, is there a reason you'd still prefer to go online?",
      },
    ],
  },
  {
    id: "confusing-bill",
    label: "I Don't Understand the Bill",
    customerLine: "My bill is never what you told me it would be.",
    responses: [
      {
        repResponse:
          "You're not alone — bills can be confusing, and that's on us to explain better. Let me walk you through every line right now.",
        followUp:
          "Is there a specific charge you want to understand, or is it the whole thing that feels off?",
        close:
          "Once you know exactly what you're paying for, does everything feel more manageable?",
      },
      {
        repResponse:
          "That's a fair frustration. The number I give you today is an estimate — the final bill includes taxes and fees that vary by zip code.",
        followUp: "Would it help if I showed you a breakdown of what's fixed vs. what changes month to month?",
        close:
          "The goal is that next month's bill matches what we build here today. Let me make sure everything is documented clearly for you.",
      },
      {
        repResponse:
          "I completely understand. Surprise charges kill trust, and I want to earn yours.",
        followUp: "Do you have a recent bill handy? Let's look at it together right now.",
        close:
          "If I can show you exactly what happened on your last bill and make sure this new quote is crystal clear, would you feel better about moving forward?",
      },
    ],
  },
];
