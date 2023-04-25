'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      CREATE TABLE server.TB_TIPO_SENSOR (
        id bigint NOT NULL auto_increment,
        nome varchar(255),
        constraint pk_id_tipo_sensor primary key (id)
      )
    `);
    await queryInterface.sequelize.query(`
      CREATE TABLE server.TB_SENSOR (
        id bigint NOT NULL auto_increment,
        id_sensor bigint NOT NULL,
        valor double DEFAULT NULL,
        created_at timestamp,
        constraint pk_id_temperatura primary key (id),
        constraint fk_id_tipo_sensor foreign key (id_sensor) references tb_tipo_sensor (id)
      )
    `);
    await queryInterface.sequelize.query(`
      insert into server.tb_tipo_sensor (nome) values('TEMPERATURA');
    `);
    await queryInterface.sequelize.query(`
      insert into server.tb_tipo_sensor (nome) values('UMIDADE');
    `);
    await queryInterface.sequelize.query(`
      insert into server.tb_tipo_sensor (nome) values('PH');
    `);
  },
  down: async (queryInterface, Sequelize) => {
    const query = `
      DROP TABLE IF EXISTS server.TB_SENSORES
    `;
    await queryInterface.sequelize.query(query);
  }
};