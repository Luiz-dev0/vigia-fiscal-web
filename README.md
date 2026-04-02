# Vigia Fiscal — Web

Frontend do SaaS de monitoramento de NF-es em tempo real.

## Stack

- React 19 + TypeScript
- Vite 6
- TailwindCSS v4
- React Router v7
- Axios

## Desenvolvimento local

```bash
# Instalar dependências
npm install

# Criar arquivo de ambiente
cp .env.example .env

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

O backend deve estar rodando em http://localhost:8080.

## Build de produção

```bash
npm run build
```

## Docker

```bash
# Build da imagem
docker build -t vigia-fiscal-web .

# Rodar o container
docker run -p 80:80 vigia-fiscal-web
```

## Variáveis de ambiente

| Variável       | Descrição              | Padrão                  |
|---------------|------------------------|-------------------------|
| VITE_API_URL  | URL base da API        | http://localhost:8080   |
