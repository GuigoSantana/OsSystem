# React + TypeScript + Vite + Tailwindcss + Axios + Zustand

Esse projeto é a base do que consigo fazer com meu conhecimento, claro que com ajuda das documentações, tutoriais e IA.

Pra esse projeto usei:

- React: (Com a BuildTool Vite), Componentes funcionais, hooks simples, funções asyncronas (requisições HTTP), React-router-dom.
- TypeScript: Tipagem das propriedades e dados usados na aplicação.
- Tailwindcss: Modelagem de componentes, estilização de células do aplicativo, responsividade e flexibilidade.
- Axios: Requisições para a API REST do projeto, tratamento de erros nas chamadas armazenando em estado no React o retorno das chamadas.
- Zustand: Embora em aprendizado, gostei do formato mais simples de manipulação do estado global da aplicação, é uma camada com muito poder(mesmo eu não sabendo usar tudo ainda ^^).

✅ Como Rodar o Projeto
Para executar o projeto localmente na sua máquina, siga os passos abaixo:

1. Clone o repositório
   
   git clone https://github.com/GuigoSantana/OsSystem.git

   cd OsSystem

2. Instale as dependências

   Certifique-se de que você tenha o Node.js instalado (versão 16 ou superior recomendada).

   npm install

3. Configure a URL da API

   Copie o arquivo de exemplo e ajuste se necessário:

   cp .env.example .env

   O valor padrão aponta para o backend local no Docker:

   VITE_API_URL=http://localhost:3333

4. Inicie o servidor de desenvolvimento

   npm run dev

   Após isso, o Vite abrirá um servidor local. Acesse no navegador:

   http://localhost:5173

🧰 Tecnologias Utilizadas
React + Vite

TypeScript

TailwindCSS

Axios

Zustand

React Router DOM
