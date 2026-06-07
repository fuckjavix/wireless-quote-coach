export const DRILL_SCENARIOS = [
  "A customer has two older iPhones and wants to lower their bill but also asks about upgrading.",
  "A family of four is shopping around and says they found a deal from a competitor.",
  "A new customer walks in and doesn't know what plan they need — they just want something 'cheap.'",
  "A long-time customer is upset about their bill going up and threatens to leave.",
  "A customer wants to add a line for their teenager but is nervous about the added cost.",
  "A business owner needs three lines with hotspot and asks about the difference between plans.",
  "A customer wants to upgrade but their trade-in value came back lower than expected.",
  "A couple wants to switch carriers — one is ready, the other is hesitant.",
  "A customer insists they'll just buy the phone outright online and only wants to talk about plans.",
  "A senior customer is confused about 5G and whether they need it.",
];

export const DRILL_OBJECTIONS = [
  "That's more than I expected.",
  "Let me think about it.",
  "Can you do anything on the price?",
  "I saw a better deal somewhere else.",
  "I need to talk to my spouse first.",
  "Why is the bill always different than what I was told?",
  "I don't want a protection plan.",
  "Do I really need all these perks?",
];

export const DRILL_GOALS = [
  "Acknowledge the concern, isolate it, and offer a specific solution.",
  "Build rapport, uncover the real objection, and move toward a close.",
  "Do a side-by-side comparison and highlight your unique value.",
  "Slow down, listen actively, and use a trial close.",
  "Summarize the value, address one objection, and ask for the sale.",
];

export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
