# G8 Crédito — Landing Page

Landing page de captação de leads para empréstimo pessoal G8, em Next.js 16 + Tailwind v4,
com a identidade visual do modo `g8` do `g8-internet-banking`.

```bash
npm install
npm run dev
```

## Envio de leads

O formulário faz `POST /api/leads` (`src/app/api/leads/route.ts`), que valida os dados com zod
(`src/lib/lead.ts`). Se `LEADS_API_URL` estiver definida, o lead é repassado para essa URL;
caso contrário, apenas é registrado no log do servidor.

```
LEADS_API_URL=https://sua-api/leads
```
