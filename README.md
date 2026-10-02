# G8 Crédito — Landing Page

Landing page de captação de leads para empréstimo pessoal G8, em Next.js 16 + Tailwind v4,
com a identidade visual do modo `g8` do `g8-internet-banking`.

```bash
npm install
npm run dev
```

## Solicitação de crédito

O formulário faz `POST /api/leads` (`src/app/api/leads/route.ts`) com os dados e o documento de
identificação. A rota valida o formulário, solicita uma URL pré-assinada ao endpoint PF existente,
envia o arquivo para o armazenamento e cria a solicitação em `/api/carta-credito/publica`.

```
CREDIT_APPLICATION_API_BASE_URL=https://sua-api
CREDIT_APPLICATION_PUBLIC_ACCESS_KEY=<chave opcional; usada quando configurada>
```

Configure `CREDIT_APPLICATION_API_BASE_URL` no ambiente de runtime do servidor Next.js. A chave é
opcional enquanto a verificação estiver desabilitada no backend; se configurada, ela continua sendo
enviada para facilitar a reativação da verificação. A URL é a origem do backend, sem o sufixo `/api`.
O formulário aceita RG frente ou CNH em JPG, PNG ou PDF,
com até 10 MB. O arquivo é enviado usando o endpoint existente
`/api/auth/v2/cadastrarUsuarioPf/presigned-urls` e a chave retornada é enviada como referência do
documento na solicitação de crédito. Perfil, banco e canal de origem continuam no formulário, mas
o endpoint atual de carta de crédito não armazena esses três campos.

## DigitalOcean App Platform

A configuração em [`.do/app.yaml`](.do/app.yaml) publica a aplicação como um Web Service
Node.js 22, com o servidor standalone do Next.js, arquivos estáticos e a rota `/api/leads`.
O serviço escuta em `0.0.0.0:8080`, verifica a saúde em `/` e faz deploy automático de
commits na branch `main` de `mktdigital-rsn/g8-credito-lp`.

1. Envie essas alterações para o GitHub e autorize o acesso da DigitalOcean ao repositório.
2. Crie uma aplicação no App Platform usando a especificação `.do/app.yaml`.
   Revise a região (`nyc`) e o tamanho da instância (`apps-s-1vcpu-1gb`) antes de criar
   o serviço pago. Para um fork, ajuste também `github.repo` e `github.branch`.
3. Configure `CREDIT_APPLICATION_API_BASE_URL` no componente `web`, com escopo **Run Time**. A
   `CREDIT_APPLICATION_PUBLIC_ACCESS_KEY` é opcional enquanto a verificação estiver desabilitada no
   backend; se configurada, use o escopo **Run Time** e tipo **Secret**.

Para confirmar qual versão está no ar, consulte `GET /api/deploy-info`. A resposta contém o marcador
de release desta alteração em `America/Sao_Paulo`.

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
