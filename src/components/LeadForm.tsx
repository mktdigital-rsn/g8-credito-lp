"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2, Lock } from "lucide-react";
import { useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { toast } from "sonner";
import { brand } from "@/config/brand";
import { BANCOS, CANAIS, PERFIS, leadSchema, maskCpf, maskPhone, type LeadInput } from "@/lib/lead";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full h-12 rounded-[2px] border bg-neutral-50 px-4 text-[15px] font-semibold text-ink placeholder:text-neutral-400 placeholder:font-medium outline-none transition-all focus:bg-white focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 ml-1 text-xs font-semibold text-red-600">{message}</p>;
}

function SelectField({
  placeholder,
  options,
  registration,
  error,
}: {
  placeholder: string;
  options: readonly string[];
  registration: UseFormRegisterReturn;
  error?: string;
}) {
  return (
    <div>
      <div className="relative">
        <select
          {...registration}
          defaultValue=""
          aria-invalid={!!error}
          className={cn(
            fieldBase,
            "appearance-none pr-10 invalid:text-neutral-400",
            error ? "border-red-400" : "border-neutral-200"
          )}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => <option key={option} value={option} className="text-ink">{option}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      </div>
      <FieldError message={error} />
    </div>
  );
}

export default function LeadForm() {
  const [sent, setSent] = useState(false);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentError, setDocumentError] = useState<string>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({ resolver: zodResolver(leadSchema), mode: "onTouched" });

  const onSubmit = async (data: LeadInput) => {
    setDocumentError(undefined);
    if (!documentFile) {
      setDocumentError("Anexe uma imagem ou PDF do seu RG ou CNH.");
      return;
    }
    if (!["image/jpeg", "image/png", "application/pdf"].includes(documentFile.type)) {
      setDocumentError("Envie um arquivo JPG, PNG ou PDF.");
      return;
    }
    if (documentFile.size > 10 * 1024 * 1024) {
      setDocumentError("O arquivo deve ter no máximo 10 MB.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => formData.append(key, String(value)));
      formData.append("document", documentFile);
      const res = await fetch("/api/leads", {
        method: "POST",
        body: formData,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.message);
      setSent(true);
      reset();
      setDocumentFile(null);
    } catch (err) {
      toast.error(
        err instanceof Error && err.message
          ? err.message
          : "Não foi possível enviar sua solicitação. Tente novamente."
      );
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-10 px-2">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 ring-2 ring-green-500/30">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-black tracking-tight">Solicitação enviada!</h3>
        <p className="mt-3 max-w-xs text-sm font-medium text-neutral-500">
          Recebemos seus dados. Um especialista {brand.shortName} vai entrar em contato em breve pelo
          telefone ou e-mail informado.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-xs font-black uppercase tracking-widest text-brand-accent underline underline-offset-4"
        >
          Fazer nova solicitação
        </button>
      </div>
    );
  }

  const cpfReg = register("cpf");
  const phoneReg = register("telefone");
  const amountReg = register("amount", { valueAsNumber: true });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
      <div>
        <label htmlFor="amount" className="mb-1 ml-1 block text-xs font-bold text-neutral-500">
          Valor desejado
        </label>
        <input
          {...amountReg}
          id="amount"
          type="number"
          min="0.01"
          max={Number.MAX_SAFE_INTEGER}
          step="0.01"
          placeholder="Ex.: 5000,00"
          inputMode="decimal"
          aria-invalid={!!errors.amount}
          className={cn(fieldBase, errors.amount ? "border-red-400" : "border-neutral-200")}
        />
        <FieldError message={errors.amount?.message} />
      </div>

      <div>
        <input
          {...register("nome")}
          placeholder="Nome completo"
          autoComplete="name"
          aria-invalid={!!errors.nome}
          className={cn(fieldBase, errors.nome ? "border-red-400" : "border-neutral-200")}
        />
        <FieldError message={errors.nome?.message} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <input
            {...cpfReg}
            onChange={(e) => {
              e.target.value = maskCpf(e.target.value);
              cpfReg.onChange(e);
            }}
            placeholder="CPF"
            inputMode="numeric"
            aria-invalid={!!errors.cpf}
            className={cn(fieldBase, errors.cpf ? "border-red-400" : "border-neutral-200")}
          />
          <FieldError message={errors.cpf?.message} />
        </div>
        <div>
          <input
            {...phoneReg}
            onChange={(e) => {
              e.target.value = maskPhone(e.target.value);
              phoneReg.onChange(e);
            }}
            placeholder="Celular com DDD"
            inputMode="tel"
            autoComplete="tel-national"
            aria-invalid={!!errors.telefone}
            className={cn(fieldBase, errors.telefone ? "border-red-400" : "border-neutral-200")}
          />
          <FieldError message={errors.telefone?.message} />
        </div>
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="E-mail"
          autoComplete="email"
          aria-invalid={!!errors.email}
          className={cn(fieldBase, errors.email ? "border-red-400" : "border-neutral-200")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      <SelectField
        placeholder="Perfil"
        options={PERFIS}
        registration={register("perfil")}
        error={errors.perfil?.message}
      />
      <SelectField
        placeholder="Banco que recebe o salário ou benefício"
        options={BANCOS}
        registration={register("banco")}
        error={errors.banco?.message}
      />
      <SelectField
        placeholder="Como conheceu a G8?"
        options={CANAIS}
        registration={register("canal")}
        error={errors.canal?.message}
      />

      <div>
        <label htmlFor="documentKind" className="mb-1 ml-1 block text-xs font-bold text-neutral-500">
          Documento de identificação
        </label>
        <div className="relative">
          <select
            {...register("documentKind")}
            id="documentKind"
            defaultValue=""
            aria-invalid={!!errors.documentKind}
            className={cn(
              fieldBase,
              "appearance-none pr-10 invalid:text-neutral-400",
              errors.documentKind ? "border-red-400" : "border-neutral-200"
            )}
          >
            <option value="" disabled>Selecione RG ou CNH</option>
            <option value="RG_FRENTE">RG - frente</option>
            <option value="CNH_FRENTE">CNH</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        </div>
        <FieldError message={errors.documentKind?.message} />
      </div>

      <div>
        <label htmlFor="document" className="mb-1 ml-1 block text-xs font-bold text-neutral-500">
          Foto ou PDF do documento
        </label>
        <input
          id="document"
          type="file"
          accept="image/jpeg,image/png,application/pdf,.jpg,.jpeg,.png,.pdf"
          aria-invalid={!!documentError}
          onChange={(event) => {
            setDocumentFile(event.target.files?.[0] ?? null);
            setDocumentError(undefined);
          }}
          className={cn(fieldBase, "py-2 text-sm", documentError ? "border-red-400" : "border-neutral-200")}
        />
        <p className="mt-1 ml-1 text-xs text-neutral-400">JPG, PNG ou PDF · até 10 MB</p>
        <FieldError message={documentError} />
      </div>

      <div className="pt-1">
        <label className="flex items-start gap-3 text-xs font-medium leading-relaxed text-neutral-500">
          <input
            type="checkbox"
            {...register("aceite")}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand-accent"
          />
          <span>
            Autorizo a {brand.name} a entrar em contato e a tratar meus dados conforme o{" "}
            <a href="#privacidade" className="font-bold text-brand-accent underline underline-offset-2">
              Aviso de Privacidade
            </a>
            .
          </span>
        </label>
        <FieldError message={errors.aceite?.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-2 flex h-14 w-full items-center justify-center gap-3 rounded-[2px] bg-brand-accent text-sm font-black uppercase tracking-widest text-white shadow-xl shadow-brand-accent/25 transition-all hover:bg-brand-accent-hover disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" /> Enviando...
          </>
        ) : (
          <>
            Continuar
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-2 pt-1 text-[11px] font-semibold text-neutral-400">
        <Lock className="h-3.5 w-3.5" /> Seus dados estão protegidos
      </p>
    </form>
  );
}
