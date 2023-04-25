const Sequelize = require("sequelize");
const sequelize = new Sequelize("mysql://root@localhost:3306", {
  dialect: "mysql",
});
async function connect() {
  if (global.connection && global.connection.state == "disconnected")
    return global.connection;
  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(
    "mysql://root@localhost:3306"
  );
  console.log("Conectado ao banco!");
  global.connection = connection;
  return connection;
}
//----------------------------------base----------------------
async function getSensorById(id) {
  const conn = await connect();
  return await conn.query("select * from server.tb_sensor where id = " + id);
}

async function deleteSensorById(id) {
  const conn = await connect();
  return await conn.query("delete from server.tb_sensor where id = " + id);
}
// ---------------------------------TEMPERATURA--------------------------------------
async function getTemperatura(offset, limit) {
  const conn = await connect();
  offset = isNaN(offset) ? 0 : parseInt(offset);
  limit = isNaN(limit) ? 5 : parseInt(limit);
  const totalElements = await conn.query({
    sql: "SELECT count(*) as totalElements FROM server.tb_sensor where id_sensor = 1",
  });

  const results = await conn.query({
    sql: "SELECT id, valor, created_at FROM server.tb_sensor where id_sensor = 1 ORDER BY created_at LIMIT ?, ?",
    values: [offset, limit],
  });
  let list = null;
  totalElements.forEach((el) => {
    if (el.find((element) => element.totalElements)) {
      list = el.map((element) => {
        if (element.totalElements != undefined) {
          return {
            data: results[0],
            totalElements: element.totalElements,
          };
        }
      });
    }
  });

  return list;
}

async function insertTemperatura(sensor) {
  const conn = await connect();
  const sql = "insert into server.tb_sensor(id_sensor,valor) values (1,?)";
  const response = [sensor.valor];
  return await conn.query(sql, response);
}

// ------------------------HUMIDADE--------------------
async function gethumidade(offset, limit) {
  const conn = await connect();
  offset = isNaN(offset) ? 0 : parseInt(offset);
  limit = isNaN(limit) ? 5 : parseInt(limit);

  const totalElements = await conn.query({
    sql: "SELECT count(*) as totalElements FROM server.tb_sensor where id_sensor = 2",
  });

  const results = await conn.query({
    sql: "SELECT id, valor, created_at FROM server.tb_sensor where id_sensor = 2 ORDER BY created_at LIMIT ?, ?",
    values: [offset, limit],
  });
  let list = null;
  totalElements.forEach((el) => {
    if (el.find((element) => element.totalElements)) {
      list = el.map((element) => {
        if (element.totalElements != undefined) {
          return {
            data: results[0],
            totalElements: element.totalElements,
          };
        }
      });
    }
  });

  return list;
}
async function inserthumidade(sensor) {
  const conn = await connect();
  const sql = "insert into server.tb_sensor(id_sensor,valor) values (2,?)";
  const response = [sensor.valor];
  return await conn.query(sql, response);
}
// ------------------------PH-------------------------------
async function getPh(offset, limit) {
  const conn = await connect();
  offset = isNaN(offset) ? 0 : parseInt(offset);
  limit = isNaN(limit) ? 5 : parseInt(limit);
  const totalElements = await conn.query({
    sql: "SELECT count(*) as totalElements FROM server.tb_sensor where id_sensor = 3",
  });

  const results = await conn.query({
    sql: "SELECT id, valor, created_at FROM server.tb_sensor where id_sensor = 3 ORDER BY created_at LIMIT ?, ?",
    values: [offset, limit],
  });
  let list = null;
  totalElements.forEach((el) => {
    if (el.find((element) => element.totalElements)) {
      list = el.map((element) => {
        if (element.totalElements != undefined) {
          return {
            data: results[0],
            totalElements: element.totalElements,
          };
        }
      });
    }
  });

  return list;
}
async function insertPh(sensor) {
  const conn = await connect();
  const sql = "insert into server.tb_sensor(id_sensor,valor) values (3,?)";
  const response = [sensor.valor];
  return await conn.query(sql, response);
}

module.exports = {
  getSensorById,
  deleteSensorById,
  getTemperatura,
  insertTemperatura,
  gethumidade,
  inserthumidade,
  getPh,
  insertPh,
};
