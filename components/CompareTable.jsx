"use client";

import { X } from "lucide-react";
import { INK } from "@/lib/theme";

export function CompareTable({ items, onClose }) {
  const rows = [
    ["Price", (i) => `£${i.listing.price}`],
    ["Weight", (i) => `${i.racket.weightG}g`],
    ["Balance", (i) => i.racket.balance],
    ["Shape", (i) => i.racket.shape],
    ["Power", (i) => `${i.racket.power}/10`],
    ["Control", (i) => `${i.racket.control}/10`],
    ["Manoeuvrability", (i) => `${i.racket.maneuverability}/10`],
    ["Comfort", (i) => `${i.racket.comfort}/10`],
    ["Spin", (i) => `${i.racket.spin}/10`],
    ["Match", (i) => `${i.matchPct}%`],
  ];
  return (
    <div className="fixed inset-0 bg-black/40 z-20 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl max-h-[85vh] overflow-auto p-5" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-[19px]" style={{ color: INK }}>Compare rackets</h3>
          <button onClick={onClose}><X size={20} /></button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                <th className="text-left py-2 pr-3 text-black/40 font-medium">&nbsp;</th>
                {items.map((i) => <th key={i.racket.id} className="text-left py-2 px-3 font-semibold whitespace-nowrap" style={{ color: INK }}>{i.racket.brand} {i.racket.model}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, fn]) => (
                <tr key={label} className="border-t border-black/5">
                  <td className="py-2.5 pr-3 text-black/45 whitespace-nowrap">{label}</td>
                  {items.map((i) => <td key={i.racket.id} className="py-2.5 px-3 whitespace-nowrap" style={{ color: INK }}>{fn(i)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
