<div align="center">

# Gerenciador Financeiro

Aplicação web para registrar receitas e despesas, acompanhar o saldo e converter moedas com cotações atualizadas.

[![Abrir aplicação](https://img.shields.io/badge/Abrir_aplicação-22C55E?style=for-the-badge&logo=vercel&logoColor=white)](https://gerenciador-financas-beige.vercel.app/)
[![Código](https://img.shields.io/badge/Ver_código-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/marcosloll/gerenciador-financas)

</div>

## Funcionalidades

- Cadastro de receitas e despesas.
- Resumo automático de entradas, saídas e saldo.
- Listagem e exclusão de transações.
- Conversão entre USD, BRL, EUR, GBP, JPY, CAD e AUD.
- Consulta de câmbio pela ExchangeRate-API.
- Interface responsiva.

> As transações ficam no estado da aplicação durante a sessão atual. Recarregar a página reinicia a lista.

## Tecnologias

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=111)

## Executar localmente

### Pré-requisitos

- Node.js
- npm
- Uma chave da [ExchangeRate-API](https://www.exchangerate-api.com/)

### Instalação

1. Clone o repositório.
2. Entre na pasta do projeto.
3. Instale as dependências com `npm install`.
4. Copie `.env.example` para `.env.local`.
5. Substitua o valor de exemplo pela sua chave da ExchangeRate-API.
6. Inicie o projeto com `npm run dev`.

Exemplo da variável:

```env
VITE_EXCHANGE_API_KEY=your_exchange_rate_api_key
```

## Segurança da chave

Arquivos `.env` não devem ser enviados ao Git. Variáveis iniciadas por `VITE_` são incluídas no código executado pelo navegador, portanto a chave também deve possuir restrições adequadas no serviço de origem.

## Estrutura principal

```text
src/
├── components/
│   ├── CurrencyConverter.jsx
│   ├── Summary.jsx
│   ├── TransactionForm.jsx
│   └── TransactionList.jsx
├── utils/
│   └── formatCurrency.js
├── App.jsx
└── main.jsx
```

## Autor

Desenvolvido por [Marcos Davy](https://github.com/marcosloll).
