"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Is this an official carrier tool?",
    a: "No. Wireless Quote Coach is an independent training and quote-planning tool. It isn't affiliated with Verizon, AT&T, T-Mobile, or any carrier, and every estimate should be verified in your carrier's official system before you give a customer a final price.",
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
    a: "On the Starter plan, quotes are saved right on your device. Team and Store plans add secure cloud sync so quotes follow you across devices and managers can see team activity.",
  },
  {
    q: "Can my whole store use it?",
    a: "Yes. The Store plan is built for managers — add your whole team, share objection scripts, and run daily drills to keep everyone sharp.",
  },
  {
    q: "What does the free trial include?",
    a: "Full access to quote building, the objection trainer, the plan explainer, and daily drills for 14 days. No credit card required to start.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto divide-y divide-slate-200 border-y border-slate-200">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-medium text-slate-800">{f.q}</span>
              <span className="text-slate-400 text-xl shrink-0 leading-none">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && <p className="text-slate-600 text-sm leading-relaxed pb-5 -mt-1">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
