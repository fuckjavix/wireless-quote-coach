"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Is this an official carrier tool?",
    a: "No. Wireless Quote Coach is an independent training and quote-planning tool. It isn't affiliated with Verizon, AT&T, T-Mobile, or any carrier, and every estimate should be verified in the carrier's official system before you give a customer a final price.",
  },
  {
    q: "Who is this built for?",
    a: "Frontline wireless sales reps, indirect and authorized-retailer reps, and store managers who want their teams quoting faster and handling objections with more confidence.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. It runs in any browser on your phone, tablet, or computer — built mobile-first so you can use it on the sales floor with a customer standing right there.",
  },
  {
    q: "Where is my quote data stored?",
    a: "Right now quotes are saved on your device using your browser's storage. There's no account or login required to start using it.",
  },
  {
    q: "Can I update the plan prices?",
    a: "Yes. Plan presets and default pricing live in simple config files, so prices can be updated whenever carrier offers change. All pricing is an estimate and must be verified in official systems.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto divide-y divide-gray-200 border-y border-gray-200">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-semibold text-ink">{f.q}</span>
              <span className="text-brand text-xl shrink-0 leading-none">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && <p className="text-gray-600 text-sm leading-relaxed pb-5 -mt-1">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
