"use client";
import { useEffect, useState } from "react";
import { Quote } from "@/lib/types";
import { getSavedQuotes, deleteQuote } from "@/lib/storage";
import SavedQuoteList from "@/components/SavedQuoteList";
import PageHeader from "@/components/PageHeader";

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
      <PageHeader
        title="Saved Quotes"
        subtitle={`${quotes.length} quote${quotes.length !== 1 ? "s" : ""} saved`}
      />
      <SavedQuoteList quotes={quotes} onDelete={handleDelete} />
    </div>
  );
}
