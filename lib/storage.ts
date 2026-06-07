import { Quote, DrillResponse } from "./types";

const QUOTES_KEY = "wqc_saved_quotes";
const DRILLS_KEY = "wqc_drill_responses";

export function getSavedQuotes(): Quote[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(QUOTES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getQuote(id: string): Quote | undefined {
  return getSavedQuotes().find((q) => q.id === id);
}

export function saveQuote(quote: Quote): void {
  const quotes = getSavedQuotes();
  const existing = quotes.findIndex((q) => q.id === quote.id);
  if (existing >= 0) {
    quotes[existing] = quote;
  } else {
    quotes.unshift(quote);
  }
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

export function deleteQuote(id: string): void {
  const quotes = getSavedQuotes().filter((q) => q.id !== id);
  localStorage.setItem(QUOTES_KEY, JSON.stringify(quotes));
}

export function getDrillResponses(): DrillResponse[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(DRILLS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveDrillResponse(drill: DrillResponse): void {
  const drills = getDrillResponses();
  drills.unshift(drill);
  localStorage.setItem(DRILLS_KEY, JSON.stringify(drills.slice(0, 50)));
}
