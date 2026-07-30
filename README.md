# Clean DDD

Projeto desenvolvido durante os estudos de **Domain-Driven Design (DDD)** e **Clean Architecture**, utilizando **Node.js** e **TypeScript**.

O objetivo deste projeto é modelar um domínio de fórum aplicando os principais conceitos do DDD, priorizando regras de negócio independentes de frameworks, banco de dados e detalhes de infraestrutura.

---

# 📖 Visão geral

O projeto simula um sistema de fórum, permitindo o gerenciamento de perguntas, respostas, comentários e notificações.

As principais funcionalidades implementadas são:

* Criação de perguntas
* Edição e exclusão de perguntas
* Listagem de perguntas recentes
* Busca de perguntas por slug
* Escolha da melhor resposta
* Criação, edição e exclusão de respostas
* Comentários em perguntas e respostas
* Gerenciamento de anexos
* Sistema de notificações
* Integração entre subdomínios utilizando Domain Events

---

# 🏛 Arquitetura

O projeto foi organizado seguindo os princípios da **Clean Architecture**, separando as responsabilidades em camadas bem definidas.

```text
src/
├── core/
│
├── domain/
│   ├── forum/
│   │   ├── application/
│   │   └── enterprise/
│   │
│   └── notification/
│       ├── application/
│       └── enterprise/
│
└── test/
```

## Estrutura das camadas

### Core

Contém componentes reutilizáveis compartilhados entre todos os domínios.

Exemplos:

* Entidades base
* Aggregate Root
* Either
* Domain Events
* Erros reutilizáveis
* Value Objects compartilhados

---

### Domain

Representa o coração da aplicação.

Nele ficam:

* Entidades
* Value Objects
* Eventos de domínio
* Regras de negócio

---

### Application

Responsável pelos **Casos de Uso** da aplicação.

Também contém:

* Interfaces de Repositórios
* Serviços da aplicação
* Subscribers de Domain Events

---

### Test

Contém toda a infraestrutura utilizada nos testes.

Exemplos:

* Factories
* Repositórios em memória
* Utilitários
* Testes unitários

---

# 📚 Conceitos aplicados

Durante o desenvolvimento foram utilizados diversos conceitos de **Domain-Driven Design**.

* Entities
* Value Objects
* Aggregate Roots
* Domain Events
* Use Cases
* Repository Pattern
* Dependency Inversion
* Functional Error Handling (Either)
* In-Memory Repositories
* Ubiquitous Language
* Bounded Contexts

---

# 🌐 Subdomínios

A aplicação foi dividida em dois subdomínios.

## Forum

Responsável por:

* Perguntas
* Respostas
* Comentários
* Anexos

## Notification

Responsável por:

* Envio de notificações
* Leitura de notificações
* Integração através de Domain Events

---

# 🔔 Domain Events

O projeto utiliza **Domain Events** para desacoplar regras de negócio entre diferentes partes da aplicação.

Eventos implementados:

* `AnswerCreatedEvent`
* `BestAnswerChosenEvent`

Esses eventos permitem que o subdomínio de notificações reaja automaticamente às ações realizadas no domínio do fórum.

Exemplo do fluxo:

```text
Usuário responde uma pergunta
            │
            ▼
   AnswerCreatedEvent
            │
            ▼
     OnAnswerCreated
            │
            ▼
 SendNotificationUseCase
            │
            ▼
 Notificação enviada ao autor da pergunta
```

---

# ⚠ Functional Error Handling

Os casos de uso utilizam o padrão **Either** para representar sucesso e falha de forma explícita, evitando o uso de exceções para erros de negócio esperados.

Essa abordagem torna o fluxo da aplicação mais previsível e facilita os testes.

---

# 🧪 Testes

O projeto possui uma suíte de testes unitários cobrindo:

* Casos de Uso
* Entidades
* Value Objects
* Domain Events
* Subscribers
* Functional Error Handling
* Repositórios em memória

---

# 🛠 Tecnologias

* Node.js
* TypeScript
* Vitest
* Day.js
* ESLint

---

# 🚀 Instalação

Clone o repositório:

```bash
git clone <url-do-repositorio>
```

Instale as dependências:

```bash
npm install
```

---

# ▶ Executando os testes

```bash
npm run test
```

Modo watch:

```bash
npm run test:watch
```

---

# 🔍 Lint

Executar o ESLint:

```bash
npm run lint
```

Corrigir problemas automaticamente:

```bash
npm run lint:fix
```

---

# 🎯 Objetivo do projeto

Este projeto tem caráter educacional e foi desenvolvido com o objetivo de aprofundar conhecimentos em:

* Domain-Driven Design (DDD)
* Clean Architecture
* Modelagem de Domínio
* Arquitetura de Software
* Testes Unitários
* Eventos de Domínio
* Boas práticas de desenvolvimento

Ele serve como base para futuras evoluções, como a integração com banco de dados, APIs REST e frameworks como Fastify e Prisma.

---

# 👨‍💻 Autor

Desenvolvido por **Luiz Henrique** como parte dos estudos de **Domain-Driven Design (DDD)** e **Clean Architecture**.
