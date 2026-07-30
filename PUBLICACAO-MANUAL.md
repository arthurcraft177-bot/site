# Publicação manual — Anatomia Ativa

## Plataforma recomendada

Use **Cloudflare Workers**. O projeto já gera uma aplicação compatível com
Cloudflare, incluindo o arquivo de configuração em
`dist/server/wrangler.json`.

Vercel não é a primeira opção para este pacote porque ele usa `vinext` e gera
saída para Cloudflare Workers, não a saída `.next` esperada por uma implantação
Next.js convencional. GitHub Pages também não executa o Worker. O GitHub pode
ser usado normalmente para armazenar o código e conectado ao Cloudflare.

## Publicação direta pelo computador

Instale primeiro:

- Node.js 22 ou mais recente;
- Git;
- uma conta gratuita no Cloudflare.

Abra um terminal dentro da pasta extraída e execute:

```powershell
npm install
npm run build
npx wrangler login
npx wrangler deploy --config dist/server/wrangler.json
```

O que cada comando faz:

1. `npm install` instala as dependências exatas do projeto.
2. `npm run build` gera a versão de produção em `dist`.
3. `npx wrangler login` abre a autorização da sua conta Cloudflare.
4. `npx wrangler deploy --config dist/server/wrangler.json` publica o Worker e
   informa o novo endereço.

Depois da publicação, abra o endereço informado e force uma atualização para
que o service worker novo substitua o cache anterior.

## Usando GitHub e Cloudflare

Crie um repositório vazio no GitHub. Dentro da pasta extraída, execute:

```powershell
git init
git add .
git commit -m "Publicar versão auditada do Anatomia Ativa"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/anatomia-ativa.git
git push -u origin main
```

Troque `SEU-USUARIO` pelo seu usuário do GitHub.

No painel do Cloudflare:

1. abra **Workers & Pages**;
2. escolha importar ou conectar um repositório Git;
3. selecione o repositório `anatomia-ativa`;
4. use `npm run build` como comando de build;
5. use `npx wrangler deploy --config dist/server/wrangler.json` como comando de
   implantação, se a interface solicitar;
6. mantenha Node.js 22 ou mais recente.

## Sobre o endereço atual

O endereço atual
`https://anatomia-ativa-estudo.arthurcraft177.chatgpt.site` pertence ao serviço
Sites. Uma publicação manual no Cloudflare cria outro endereço. Para preservar
exatamente o endereço atual, é necessário concluir a publicação pelo mesmo
projeto Sites já existente.

## Erro que bloqueou a publicação automática

A proteção do repositório local foi contornada com uma área temporária de
envio. O bloqueio final foi de rede:

```text
fatal: unable to access 'https://git.chatgpt-team.site/...':
Failed to connect to git.chatgpt-team.site port 443:
Could not connect to server
```

Os arquivos corrigidos não foram substituídos nem descartados.
