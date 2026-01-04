# 📋 Projeto: Lista de Tarefas (To-Do List)

## 📌 Visão Geral

Este projeto é uma **aplicação web de lista de tarefas** desenvolvida com foco em boas práticas modernas de desenvolvimento **Fullstack**, utilizando **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **Prisma ORM** e **PostgreSQL**.

O objetivo principal do projeto é permitir que o usuário **crie, visualize, atualize e exclua tarefas**, mantendo os dados persistidos em um banco de dados relacional. O projeto foi pensado tanto como estudo prático quanto como portfólio profissional.

---

## 🎯 Objetivos do Projeto

* Aplicar conceitos modernos de **React e Next.js (App Router)**
* Criar uma aplicação **Fullstack** usando apenas Next.js
* Utilizar **TypeScript** para maior segurança e organização do código
* Integrar um banco de dados **PostgreSQL** com **Prisma ORM**
* Construir uma interface moderna e responsiva com **Tailwind CSS** e **shadcn/ui**
* Organizar o projeto seguindo padrões escaláveis

---

## 🧰 Tecnologias Utilizadas

### 🔹 Front-end

* **Next.js 16** – Framework React com renderização híbrida (SSR / SSG)
* **React 19** – Biblioteca para construção de interfaces
* **TypeScript** – Tipagem estática para reduzir erros e melhorar manutenção
* **Tailwind CSS 4** – Estilização utilitária e responsiva
* **Radix UI** – Componentes acessíveis e desacoplados
* **Lucide React** – Biblioteca de ícones
* **Sonner** – Notificações (toasts)

### 🔹 Back-end

* **Next.js (Server Components + Server Actions)** – A aplicação utiliza o próprio Next.js como backend, **sem uso de API Routes**, acessando o banco diretamente no servidor
* **Prisma ORM** – Mapeamento objeto-relacional
* **PostgreSQL** – Banco de dados relacional
* **pg** – Driver de conexão com o PostgreSQL
* **dotenv** – Gerenciamento de variáveis de ambiente

---

## 🗂️ Estrutura do Projeto

A estrutura do projeto segue o padrão do **Next.js App Router**, com separação clara entre **UI**, **lógica de negócio**, **acesso a dados** e **camada de banco de dados**.

```bash
app/
 ├─ globals.css        # Estilos globais
 ├─ layout.tsx         # Layout raiz da aplicação
 ├─ page.tsx           # Página principal (Home)
 └─ components/        # Componentes de UI
     ├─ ui/            # Componentes reutilizáveis (botões, inputs, cards)
     │ 
     ├─ add-task.tsx
     ├─ edit-task.tsx
     ├─ filter.tsx
     ├─ TaskCounter.tsx
     ├─ TaskListItem.tsx
     ├─ TaskProgress.tsx
     ├─ TaskProgressBar.tsx
     └─ TaskEmpty.tsx

lib/
 ├─ prisma.ts          # Instância do Prisma Client
 ├─ utils.ts           # Funções utilitárias

prisma/
 ├─ schema.prisma      # Modelos do banco de dados
 ├─ migrations/        # Histórico de migrações

actions/
 ├─ add-task.ts        # Criação de tarefas
 ├─ edit-tasks.ts     # Edição de tarefas
 ├─ delete-task.ts    # Exclusão de tarefas
 ├─ delete-completed-tasks.ts
 ├─ getTasksFromDb.ts # Busca de tarefas
 └─ getTasksFromDb.ts

public/                # Arquivos públicos

.env                   # Variáveis de ambiente
```

---

## 🗄️ Modelagem do Banco de Dados

O banco de dados utiliza PostgreSQL com Prisma ORM.

Exemplo de modelo de tarefa:

```prisma
model Tasks {
id String @id @default(uuid(7)) @db.Uuid
title String
isCompleted Boolean @default(false)

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
}
```

Cada tarefa possui:

* Identificador único
* Título
* Status (concluída ou não)
* Data de criação

---

## 🔁 Funcionalidades

### ✅ Implementadas

* Criar nova tarefa
* Listar todas as tarefas
* Marcar tarefa como concluída
* Excluir tarefa
* Persistência dos dados no banco
* Interface responsiva
* Feedback visual com notificações

---

## ⚙️ Scripts do Projeto

```bash
npm run dev     # Ambiente de desenvolvimento
npm run build   # Build de produção
npm run start   # Rodar build
npm run lint    # Verificação de código
```

---

## 🧠 Conceitos Aplicados

* Componentização com React
* Hooks (`useState`, `useEffect`)
* Server Components e Client Components
* Server Actions para comunicação direta com o banco (sem API Routes)
* ORM e migrations com Prisma
* Boas práticas de organização
* Tipagem forte com TypeScript

---

## 🚀 Conclusão

Este projeto demonstra a capacidade de desenvolver uma aplicação **Fullstack moderna**, utilizando ferramentas amplamente usadas no mercado. Ele reforça conhecimentos em **frontend, backend, banco de dados e arquitetura**, servindo como uma excelente base para projetos maiores como sistemas de gestão, e-commerces ou aplicações SaaS.

---

📌 **Projeto desenvolvido para fins de estudo e portfólio profissional.**
