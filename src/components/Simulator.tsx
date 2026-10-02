"use client";

import { ArrowRight, Coins } from "lucide-react";
import { useState } from "react";
import { SIMULATION, clampAmount, formatBRL, monthlyInstallment } from "@/lib/simulation";
import { onlyDigits } from "@/lib/lead";

const rangeClass =
  "h-2 w-full cursor-pointer appearance-none rounded-full bg-neutral-200 accent-brand-accent";

function rangeFill(value: number, min: number, max: number) {
  const pct = ((value - min) / (max - min)) * 100;
  return { background: `linear-gradient(to right, #ff7711 ${pct}%, #e5e5e5 ${pct}%)` };
}

export default function Simulator({
  initialAmount,
  initialTerm,
  onContinue,
}: {
  initialAmount: number;
  initialTerm: number;
  onContinue: (amount: number, term: number) => void;
}) {
  const [amount, setAmount] = useState(initialAmount);
  const [amountText, setAmountText] = useState(formatBRL(initialAmount));
  const [term, setTerm] = useState(initialTerm);

  const validAmount = clampAmount(amount);
  const installment = monthlyInstallment(validAmount, term);

  const updateAmount = (value: number) => {
    setAmount(value);
    setAmountText(formatBRL(value));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight">Quanto você precisa?</h2>
        <div className="flex h-11 w-11 items-center justify-center rounded-[2px] bg-brand-accent-light text-brand-accent">
          <Coins className="h-5 w-5" />
        </div>
      </div>

      <div className="rounded-[2px] border border-neutral-200 bg-neutral-50 p-4">
        <label htmlFor="sim-amount" className="text-[11px] font-black uppercase tracking-widest text-neutral-500">
          Valor desejado
        </label>
        <input
          id="sim-amount"
          inputMode="numeric"
          value={amountText}
          onChange={(e) => {
            const value = Number(onlyDigits(e.target.value) || "0") / 100;
            setAmount(value);
            setAmountText(formatBRL(value));
          }}
          onBlur={() => updateAmount(clampAmount(amount))}
          className="mt-2 h-14 w-full rounded-[2px] border border-neutral-200 bg-white px-4 text-2xl font-black text-ink outline-none transition-all focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10"
        />
        {amount !== validAmount && (
          <p className="mt-1 ml-1 text-xs font-semibold text-red-600">
            Escolha um valor entre {formatBRL(SIMULATION.minAmount)} e {formatBRL(SIMULATION.maxAmount)}.
          </p>
        )}
      </div>

      <div>
        <input
          type="range"
          aria-label="Valor desejado"
          min={SIMULATION.minAmount}
          max={SIMULATION.maxAmount}
          step={SIMULATION.amountStep}
          value={validAmount}
          onChange={(e) => updateAmount(Number(e.target.value))}
          className={rangeClass}
          style={rangeFill(validAmount, SIMULATION.minAmount, SIMULATION.maxAmount)}
        />
        <div className="mt-2 flex justify-between text-[11px] font-black uppercase tracking-widest text-neutral-500">
          <span>R$ 1 mil</span>
          <span>Seu sonho</span>
          <span>R$ 50 mil</span>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-neutral-500">Prazo</p>
        <div className="mt-1 mb-3 flex items-center justify-between">
          <span className="text-2xl font-black text-brand-accent">{term} meses</span>
          <span className="rounded-[2px] bg-ink px-2 py-1 text-[10px] font-black uppercase tracking-widest text-white">
            Até {SIMULATION.maxTerm}x
          </span>
        </div>
        <input
          type="range"
          aria-label="Prazo em meses"
          min={SIMULATION.minTerm}
          max={SIMULATION.maxTerm}
          step={1}
          value={term}
          onChange={(e) => setTerm(Number(e.target.value))}
          className={rangeClass}
          style={rangeFill(term, SIMULATION.minTerm, SIMULATION.maxTerm)}
        />
        <div className="mt-2 flex justify-between text-[11px] font-black uppercase tracking-widest text-neutral-500">
          <span>{SIMULATION.minTerm} meses</span>
          <span>{SIMULATION.maxTerm} meses</span>
        </div>
      </div>

      <div className="rounded-[2px] bg-neutral-100 p-5 text-center">
        <p className="text-sm font-bold text-neutral-600">Parcela mensal aproximada</p>
        <p className="mt-1 text-xs font-black text-brand-accent">{term}x</p>
        <p className="text-4xl font-black tracking-tight text-brand-accent">{formatBRL(installment)}</p>
        <p className="mt-4 border-t border-neutral-200 pt-3 text-xs font-medium leading-relaxed text-neutral-500">
          Estamos considerando uma taxa inicial simulada. A aprovação e as condições finais dependem da análise de
          crédito.
        </p>
      </div>

      <button
        type="button"
        onClick={() => onContinue(validAmount, term)}
        className="group flex h-14 w-full items-center justify-center gap-3 rounded-[2px] bg-brand-accent text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-brand-accent/25 transition-all hover:bg-brand-accent-hover"
      >
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        Solicitar análise de crédito
      </button>
    </div>
  );
}
