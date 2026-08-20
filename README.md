# Korp_Teste_JoaoNass

![.NET SDK 10.0](https://img.shields.io/badge/.NET-10.0-purple)
![Angular](https://img.shields.io/badge/Angular-18-red)
![SQL Server](https://img.shields.io/badge/SQL%20Server-2022-blue)
![License](https://img.shields.io/badge/license-Educacional-lightgrey)

Sistema de gerenciamento de estoque desenvolvido como parte de um teste técnico.

A aplicação possui um frontend desenvolvido em Angular, APIs REST desenvolvidas em ASP.NET Core e persistência de dados utilizando Entity Framework Core e SQL Server.

---

## 📑 Sumário

- [Tecnologias](#-tecnologias)
- [Sobre o projeto](#-sobre-o-projeto)
- [Interface](#-interface)
- [Arquitetura](#-arquitetura)
- [Estrutura](#-estrutura)
- [Pré-requisitos](#️-pré-requisitos)
- [Configuração](#-configuração)
- [Execução](#️-execução)
- [Funcionalidades](#-funcionalidades)
- [API](#-api)
- [Objetivo](#-objetivo)
- [Autor](#-autor)

---

## 🛠️ Tecnologias

### Backend

- C#
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- REST API

### Frontend

- Angular
- TypeScript
- HTML5
- CSS3

### Ferramentas

- Visual Studio
- Visual Studio Code
- Git
- GitHub
- Postman

---

## 📋 Sobre o projeto

O projeto consiste em uma aplicação web para gerenciamento de produtos e notas fiscais.

O frontend é responsável pela interface com o usuário e se comunica com as APIs através de requisições HTTP.

O backend é dividido em APIs responsáveis pelo gerenciamento do estoque e das notas fiscais, organizando as regras da aplicação através de Services e realizando a persistência dos dados utilizando Entity Framework Core e SQL Server.

---

## 🖥️ Interface

A aplicação possui uma interface web desenvolvida em Angular para interação com os dados do sistema.

### Tela inicial

<img src="https://github.com/user-attachments/assets/7fa7ae03-558a-4365-9e58-a0f947974daf" alt="Tela inicial" width="900">

### Produtos

<img src="https://github.com/user-attachments/assets/96c04def-36d2-4991-a5db-18526e89861e" alt="Tela de produtos" width="900">

### Estoque de Produtos

<img src="https://github.com/user-attachments/assets/3a2326b5-2de0-4ad7-a750-aa615c52c154" alt="Estoque de produtos" width="900">

### Cadastro de Notas

<img src="https://github.com/user-attachments/assets/17dedaec-fcf7-4165-a9b5-43c0251e08b6" alt="Cadastro de notas" width="900">

### Notas abertas/fechadas

<img src="https://github.com/user-attachments/assets/857ea3d5-9d75-4583-845c-ce71066c2dcb" alt="Notas abertas e fechadas" width="900">

---

## 🏗️ Arquitetura

```text
                    ┌───────────────────┐
                    │      Angular      │
                    │     Frontend      │
                    └─────────┬─────────┘
                              │
                         HTTP / REST
                              │
               ┌──────────────┴──────────────┐
               │                             │
               ▼                             ▼
    ┌─────────────────────┐       ┌─────────────────────┐
    │    Estoque.api      │       │   NotaFiscal.api    │
    │   ASP.NET Core API  │◄─────►│   ASP.NET Core API  │
    └──────────┬──────────┘       └──────────┬──────────┘
               │                             │
               ▼                             ▼
    ┌─────────────────────┐       ┌─────────────────────┐
    │     SQL Server      │       │     SQL Server      │
    │    EstoqueDB        │       │   NotaFiscalDB      │
    └─────────────────────┘       └─────────────────────┘
```

### Fluxo do backend

```text
Controller
    │
    ▼
 Service
    │
    ▼
Entity Framework Core
    │
    ▼
 SQL Server
```

A `NotaFiscal.api` também utiliza um cliente HTTP para comunicação com a `Estoque.api` quando necessário.

---

## 📁 Estrutura

```text
Korp_Teste_JoaoNass/
│
├── Estoque.api/
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   ├── Services/
│   ├── Program.cs
│   ├── appsettings.json
│   └── Estoque.api.csproj
│
├── NotaFiscal.api/
│   ├── Controllers/
│   ├── Clients/
│   ├── Data/
│   ├── Program.cs
│   ├── appsettings.json
│   └── NotaFiscal.api.csproj
│
├── korp-app/
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       ├── app.ts
│   │       ├── app.html
│   │       └── app.css
│   │
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── iniciar-projeto.bat
└── Korp_Teste_JoaoNass.slnx
```

---

## ⚙️ Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- [.NET SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.dev/tools/cli)
- [SQL Server](https://www.microsoft.com/sql-server)
- [Git](https://git-scm.com/)

Caso o Angular CLI não esteja instalado:

```powershell
npm install -g @angular/cli
```

---

## 📥 Configuração

### 1. Clonar o projeto

```powershell
git clone https://github.com/joaonass/Korp_Teste_JoaoNass.git
cd Korp_Teste_JoaoNass
```

### 2. Configurar os bancos de dados

As aplicações utilizam SQL Server para persistência dos dados.

As conexões com os bancos estão configuradas nos respectivos arquivos `appsettings.json`.

As migrations do Entity Framework Core são aplicadas automaticamente durante a inicialização das APIs.

É necessário apenas ter o SQL Server instalado e em execução.

Caso necessário, ajuste as connection strings conforme a configuração do SQL Server da máquina.

---

## ▶️ Execução

O projeto possui um arquivo `iniciar-projeto.bat` que automatiza a inicialização do backend e do frontend.

Na raiz do projeto:

```powershell
.\iniciar-projeto.bat
```

O script inicia automaticamente os serviços necessários.

As migrations do Entity Framework Core também são aplicadas automaticamente durante a inicialização das APIs.

Após a inicialização, acesse:

```text
http://localhost:4200
```

### Execução manual

Caso seja necessário executar os projetos separadamente:

#### API de Estoque

```powershell
cd Estoque.api
dotnet restore
dotnet build
dotnet run
```

#### API de Nota Fiscal

Em outro terminal:

```powershell
cd NotaFiscal.api
dotnet restore
dotnet build
dotnet run
```

#### Frontend

Em outro terminal:

```powershell
cd korp-app
npm install
ng serve
```

Depois acesse:

```text
http://localhost:4200
```

---

## 📦 Funcionalidades

Atualmente, o sistema possui:

- Cadastro de produtos
- Listagem de produtos
- Cadastro de notas fiscais
- Controle de notas abertas e fechadas
- Comunicação entre Angular e ASP.NET Core
- Comunicação entre as APIs de Estoque e Nota Fiscal
- API REST
- Persistência utilizando SQL Server
- Migrations automáticas do Entity Framework Core
- Separação de responsabilidades através de Services

---

## 🔌 API

As APIs disponibilizam endpoints REST para gerenciamento dos produtos e notas fiscais.

### Listar produtos

```http
GET /api/produto
```

### Cadastrar produto

```http
POST /api/produto
Content-Type: application/json
```

Exemplo:

```json
{
  "nome": "Produto Teste",
  "quantidade": 10,
  "preco": 29.90
}
```

A API pode ser testada utilizando ferramentas como o Postman.

Exemplo:

```http
GET http://localhost:5250/api/produto
```

---

## 🔐 Configurações

Informações sensíveis, como credenciais de banco de dados, não devem ser armazenadas diretamente no repositório.

Para ambientes reais, recomenda-se utilizar:

- User Secrets
- Variáveis de ambiente
- Configurações específicas por ambiente

---

## 🎯 Objetivo

O projeto foi desenvolvido para demonstrar conhecimentos práticos em:

- C#
- ASP.NET Core
- Entity Framework Core
- SQL Server
- Angular
- TypeScript
- APIs REST
- Integração entre frontend e backend
- Comunicação entre APIs
- Git e GitHub
- Organização de projetos

---

## 👨‍💻 Autor

**João Nass**

Projeto desenvolvido para fins de teste técnico.

---

## 📄 Licença

Projeto desenvolvido para fins de avaliação técnica e aprendizado.
