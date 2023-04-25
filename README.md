# Monitor-de-sensor

## Como rodar o back-end?

  0 - Acessar o local do server: `cd /server`
  
  1 - Instalar as bibliotecas: `npm i`
  
  > Necessário criar um schema no banco chamado *server*
  
  2 - Incializar as migrações: `npx sequelize-cli db:migrate`
  
  3 - Inicializar o servidor: `node .\controller\index.js`
  

## Rodar o font-end:

  0 - Acessar o local do front: `cd /front-end`
  
  1 - Instalar bibliotecas: `npm i`
  
  2 - Inicializar o front: `npm run dev`
  
