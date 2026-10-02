"use client";

import { useState } from "react";
import LeadForm from "@/components/LeadForm";
import Simulator from "@/components/Simulator";
import { SIMULATION } from "@/lib/simulation";

// Fluxo do card do hero: primeiro a simulação, depois a captura dos dados.
export default function CreditApplication() {
  const [step, setStep] = useState<"simulation" | "form">("simulation");
  const [amount, setAmount] = useState<number>(SIMULATION.defaultAmount);
  const [term, setTerm] = useState<number>(SIMULATION.defaultTerm);

  if (step === "simulation") {
    return (
      <Simulator
        initialAmount={amount}
        initialTerm={term}
        onContinue={(value, months) => {
          setAmount(value);
          setTerm(months);
          setStep("form");
        }}
      />
    );
  }

  return (
    <>
      <div className="mb-6 border-l-4 border-brand-accent pl-4">
        <h2 className="text-xl font-black leading-tight tracking-tight sm:text-2xl">Agora, preencha seus dados.</h2>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
          Leva menos de 2 minutos
        </p>
      </div>
      <LeadForm amount={amount} term={term} onEditSimulation={() => setStep("simulation")} />
    </>
  );
}
