## Monitor-de-sensor

### Como rodar o back-end?

- Acessar o local do server: `cd /server`
- Instalar as bibliotecas: `npm i`
  
> Necessário criar um schema no banco chamado *server*

-  Incializar as migrações: `npx sequelize-cli db:migrate`
-  Inicializar o servidor: `node .\controller\index.js`
  

### Rodar o font-end:

- Acessar o local do front: `cd /front-end`
- Instalar bibliotecas: `npm i`
- Inicializar o front: `npm run dev`
  
