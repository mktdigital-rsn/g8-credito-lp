// Parâmetros do simulador (mockup do card do Trello). A taxa é apenas ilustrativa:
// a aprovação e as condições finais dependem da análise de crédito.
export const SIMULATION = {
  minAmount: 1_000,
  maxAmount: 50_000,
  amountStep: 500,
  defaultAmount: 7_000,
  minTerm: 6,
  maxTerm: 48,
  defaultTerm: 18,
  monthlyRate: 0.0249,
} as const;

// Parcela pela tabela Price.
export function monthlyInstallment(amount: number, months: number, rate: number = SIMULATION.monthlyRate) {
  if (amount <= 0 || months <= 0) return 0;
  return (amount * rate) / (1 - Math.pow(1 + rate, -months));
}

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const formatBRL = (value: number) => brl.format(value);

export const clampAmount = (value: number) =>
  Math.min(SIMULATION.maxAmount, Math.max(SIMULATION.minAmount, value));
