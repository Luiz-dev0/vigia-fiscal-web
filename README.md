# Vigia Fiscal — Web

Frontend do [Vigia Fiscal](https://vigiafiscal.com.br), SaaS B2B brasileiro para monitoramento de NF-es (Notas Fiscais Eletrônicas) em tempo real.

O sistema consulta a SEFAZ automaticamente por CNPJ, envia alertas via WhatsApp e e-mail, e permite realizar a Manifestação do Destinatário diretamente pela plataforma.

## Repositórios do projeto

| Repositório | Descrição |
|---|---|
| [`vigia-fiscal-web`](https://github.com/Luiz-dev0/vigia-fiscal-web) | Frontend (este repositório) |
| [`nfe-monitor-api`](https://github.com/Luiz-dev0/nfe-monitor-api) | Backend — Spring Boot + Java 21 |
| [`vigia-fiscal-infra`](https://github.com/Luiz-dev0/vigia-fiscal-infra) | Infraestrutura — Docker, Nginx, CI/CD |

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

| Variável | Descrição | Padrão |
|---|---|---|
| VITE_API_URL | URL base da API | http://localhost:8080 |

## Arquitetura

​```
vigiafiscal.com.br        → Frontend (React + Vite)
api.vigiafiscal.com.br    → Backend (Spring Boot)
                          → PostgreSQL 16
                          → Nginx (reverse proxy + SSL)
​```

Deploy automático via GitHub Actions em push para `main`.