import { z } from "zod";

export const PERFIS = [
  "Aposentado",
  "Assalariado",
  "Pensionista",
  "Servidor Público",
  "Militar",
  "Autônomo",
  "Beneficiário com renda menor que um salário-mínimo",
  "Outros",
] as const;

export const BANCOS = [
  "G8 Bank",
  "Bradesco",
  "Itaú",
  "Caixa",
  "Santander",
  "Banco do Brasil",
  "Nubank",
  "Outros",
] as const;

export const CANAIS = [
  "Instagram",
  "Facebook",
  "TikTok",
  "Kwai",
  "WhatsApp",
  "Pesquisa Google",
  "E-mail",
  "SMS",
  "Indicação",
  "Outros",
] as const;

export const onlyDigits = (value: string) => value.replace(/\D/g, "");

export function isValidCpf(value: string) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const checkDigit = (length: number) => {
    let sum = 0;
    for (let i = 0; i < length; i++) sum += Number(cpf[i]) * (length + 1 - i);
    const rest = (sum * 10) % 11;
    return rest === 10 ? 0 : rest;
  };

  return checkDigit(9) === Number(cpf[9]) && checkDigit(10) === Number(cpf[10]);
}

export function maskCpf(value: string) {
  return onlyDigits(value)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function maskPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

export const leadSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .refine((v) => v.split(/\s+/).length >= 2, "Informe nome e sobrenome"),
  cpf: z.string().refine(isValidCpf, "CPF inválido"),
  telefone: z
    .string()
    .refine((v) => onlyDigits(v).length === 11, "Informe um celular com DDD"),
  email: z.email("E-mail inválido"),
  perfil: z.enum(PERFIS, { error: "Selecione seu perfil" }),
  banco: z.enum(BANCOS, { error: "Selecione o banco" }),
  canal: z.enum(CANAIS, { error: "Selecione uma opção" }),
  aceite: z.literal(true, { error: "É necessário aceitar para continuar" }),
});

export type LeadInput = z.infer<typeof leadSchema>;
