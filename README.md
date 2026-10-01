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

## DigitalOcean App Platform

A configuração em [`.do/app.yaml`](.do/app.yaml) publica a aplicação como um Web Service
Node.js 22, com o servidor standalone do Next.js, arquivos estáticos e a rota `/api/leads`.
O serviço escuta em `0.0.0.0:8080`, verifica a saúde em `/` e faz deploy automático de
commits na branch `main` de `mktdigital-rsn/g8-credito-lp`.

1. Envie essas alterações para o GitHub e autorize o acesso da DigitalOcean ao repositório.
2. Crie uma aplicação no App Platform usando a especificação `.do/app.yaml`.
   Revise a região (`nyc`) e o tamanho da instância (`apps-s-1vcpu-1gb`) antes de criar
   o serviço pago. Para um fork, ajuste também `github.repo` e `github.branch`.
3. Configure `LEADS_API_URL` nas variáveis de ambiente do componente `web`, com escopo
   **Run Time** (e tipo **Secret** se a URL contiver credenciais). Sem essa variável,
   os leads serão apenas registrados nos logs, conforme o comportamento atual.

Com o `doctl` instalado, autenticado e com acesso ao repositório:

```bash
doctl apps create --spec .do/app.yaml
# Para atualizar uma aplicação existente:
doctl apps update <APP_ID> --spec .do/app.yaml
```

Ao atualizar via arquivo, inclua nele as configurações adicionais feitas no painel,
como `LEADS_API_URL` e domínios, para preservá-las.

Para verificar o mesmo build e servidor localmente, usando Node.js 22:

```bash
npm ci
npm run build:app-platform
PORT=8080 HOSTNAME=0.0.0.0 npm run start:app-platform
```

O build precisa acessar o Google Fonts para baixar a fonte usada por `next/font`.
Referência: [especificação do App Platform](https://docs.digitalocean.com/products/app-platform/reference/app-spec/).
