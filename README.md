# Angular SSR Demo 🚀

Projeto de referência para estudo de **Server-Side Rendering (SSR)** com Angular 18, usando `@angular/ssr` + Express.

## O que é SSR?

No modelo tradicional (CSR — Client-Side Rendering), o browser recebe um HTML vazio e o Angular monta a página via JavaScript. Com SSR, o servidor já entrega o HTML completamente renderizado, o que traz:

- ✅ **Melhor SEO** — motores de busca leem o conteúdo sem precisar executar JS
- ✅ **Menor tempo até o primeiro conteúdo visível (FCP)**
- ✅ **Melhor experiência em conexões lentas**

## Como verificar que o SSR está funcionando

Execute no terminal após iniciar o servidor:

```bash
curl http://localhost:4000
curl http://localhost:4000/api-example
```

Se o HTML retornado já contiver o conteúdo da página (ex.: `<h1>SSR em Angular</h1>`, lista de posts), o SSR está ativo. Com CSR puro, esse HTML estaria vazio (`<app-root></app-root>`).

Também é possível verificar no browser via **Ctrl+U** (Ver código-fonte) — o conteúdo deve aparecer diretamente no HTML, sem depender de JavaScript.

## Estrutura do projeto

```
src/
├── app/
│   ├── components/
│   │   ├── main-page/          # Página inicial — renderiza mensagem via SSR
│   │   └── api-example/        # Busca posts da API JSONPlaceholder via HttpClient
│   ├── services/
│   │   └── example.service.ts  # DataService — consome https://jsonplaceholder.typicode.com/posts
│   ├── app.config.ts           # Providers globais (Router, HttpClient, Hydration)
│   ├── app.config.server.ts    # Config exclusiva do servidor (provideServerRendering)
│   └── app.routes.ts           # Rotas lazy-loaded
└── main.server.ts              # Entry point do servidor Angular
server.ts                       # Servidor Express que integra o Angular SSR Engine
```

## Rotas

| Rota           | Componente          | Descrição                                      |
|----------------|---------------------|------------------------------------------------|
| `/`            | `MainPageComponent` | Página inicial com mensagem renderizada no SSR |
| `/api-example` | `ApiExampleComponent` | Lista de posts consumida via HTTP            |

## Pontos-chave da configuração

### `app.config.ts` — providers essenciais

```ts
provideHttpClient(withFetch())
```

> ⚠️ `withFetch()` é **obrigatório** em SSR. O `HttpClient` padrão usa `XMLHttpRequest`, que não existe no Node.js. O `withFetch()` troca a implementação para a API nativa `fetch`, compatível com browser e servidor.

```ts
provideClientHydration()
```

> Ativa a **hidratação** do Angular: reutiliza o DOM pré-renderizado pelo servidor em vez de descartá-lo, evitando um "flash" de tela ao carregar o JS.

### `app.config.server.ts` — config do servidor

```ts
provideServerRendering()
```

> Registrado apenas no contexto do servidor. Habilita o motor de renderização do `@angular/ssr`.

### `server.ts` — Express + Angular Engine

O servidor Express usa o `CommonEngine` do `@angular/ssr` para renderizar cada rota Angular no servidor e enviar o HTML resultante para o cliente.

## Scripts disponíveis

| Comando              | Descrição                                              |
|----------------------|--------------------------------------------------------|
| `npm start`          | Servidor de desenvolvimento CSR em `localhost:4200`    |
| `npm run build`      | Build de produção (browser + server bundles)           |
| `npm run dev:ssr`    | Build + inicia servidor SSR em `localhost:4000`        |
| `npm run serve:ssr:angular-ssr-demo` | Inicia SSR sem rebuildar (usa dist existente) |
| `npm test`           | Executa testes unitários via Karma                     |

## Pré-requisitos

- Node.js 18+
- Angular CLI 18: `npm install -g @angular/cli`

## Como rodar

```bash
npm install
npm run dev:ssr
# Acesse http://localhost:4000
```

## Referências

- [Angular SSR — documentação oficial](https://angular.dev/guide/ssr)
- [JSONPlaceholder — API fake para testes](https://jsonplaceholder.typicode.com)
- [provideHttpClient — Angular docs](https://angular.dev/api/common/http/provideHttpClient)
