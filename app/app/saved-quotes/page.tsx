"use client";
import { useEffect, useState } from "react";
import { Quote } from "@/lib/types";
import { getSavedQuotes, deleteQuote } from "@/lib/storage";
import SavedQuoteList from "@/components/SavedQuoteList";

export default function SavedQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  // Read from localStorage after mount so server and client render the same
  // empty list first, then hydrate with saved data (avoids hydration mismatch).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuotes(getSavedQuotes());
  }, []);

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Delete ${name || "this quote"}? This can't be undone.`)) return;
    deleteQuote(id);
    setQuotes((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-slate-800">Saved Quotes</h1>
        <p className="text-slate-500 text-sm mt-1">
          {quotes.length} quote{quotes.length !== 1 ? "s" : ""} saved
        </p>
      </div>
      <SavedQuoteList quotes={quotes} onDelete={handleDelete} />
    </div>
  );
}
