const db = require("../repository/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 3000;

const server = express();
server.use(bodyParser());
server.use(cors());
server.use(express.json());

const body = [];
// ------------------TEMPERATURA-------------------
server.get("/temperatura/list", async (req, resp) => {
  try {
    const temperatura = await db.getTemperatura();
    resp.status(200).json(temperatura);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao buscar temperatura" });
  }
});

server.get("/temperatura", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  if (isNaN(page) || isNaN(limit)) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }
  const offset = (page - 1) * limit;
  const results = await db.getTemperatura(offset, limit);
  return res.json({
    data: results.map((el) => el.data),
    page,
    limit: limit,
    totalElements: results.map((el) => el.totalElements)[0],
  });
});

server.get("/temperatura/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    const temperatura = await db.getSensorById(id);
    resp.status(200).json(temperatura[0]);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao buscar temperatura" });
  }
});

server.post("/temperatura", (req, resp) => {
  try {
    const { valor } = req.body;
    db.insertTemperatura({ valor });
    return resp.status(200).json({ valor });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao Inserir sensor" });
  }
});

server.delete("/temperatura/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    db.deleteSensorById(id);
    resp
      .status(200)
      .json({ message: `Sensor de Ph com id ${id} deletado com sucesso` });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao deletar sensor de Ph" });
  }
});

// -------------------HUMIDADE--------------------

server.get("/umidade/list", async (req, resp) => {
  try {
    const humidade = await db.gethumidade();
    resp.status(200).json(humidade);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao buscar humidade" });
  }
});

server.get("/umidade", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  if (isNaN(page) || isNaN(limit)) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  const offset = (page - 1) * limit;
  const results = await db.gethumidade(offset, limit);
  res.json({
    data: results.map((el) => el.data),
    page,
    limit,
    totalElements: results.map((el) => el.totalElements)[0],
  });
});

server.get("/umidade/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    const humidade = await db.getSensorById(id);
    resp.status(200).json(humidade[0]);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao buscar Humidade" });
  }
});

server.post("/umidade", (req, resp) => {
  try {
    const { valor } = req.body;
    db.inserthumidade({ valor });
    return resp.status(200).json({ valor });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao Inserir Humidade" });
  }
});

server.delete("/umidade/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    db.deleteSensorById(id);
    resp.status(200).json({
      message: `Sensor de Humidade com id ${id} deletado com sucesso`,
    });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao deletar Humidade" });
  }
});

// ------------PH--------------------

server.get("/ph/list", async (req, resp) => {
  try {
    const ph = await db.getPh();
    resp.status(200).json(ph);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao buscar ph" });
  }
});

server.get("/ph", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  if (isNaN(page) || isNaN(limit)) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  const offset = (page - 1) * limit;
  const results = await db.getPh(offset, limit);
  res.json({
    data: results.map((el) => el.data),
    page,
    limit,
    totalElements: results.map((el) => el.totalElements)[0],
  });
});

server.get("/ph/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    const ph = await db.getSensorById(id);
    resp.status(200).json(ph[0]);
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao buscar Ph" });
  }
});

server.post("/ph", (req, resp) => {
  try {
    const { valor } = req.body;
    db.insertPh({ valor });
    return resp.status(200).json({ valor });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao Inserir Ph" });
  }
});

server.delete("/ph/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    db.deleteSensorById(id);
    resp
      .status(200)
      .json({ message: `Sensor de Ph com id ${id} deletado com sucesso` });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ message: "Erro ao deletar Sensor de Ph" });
  }
});
// -----------OPTIONS---------------
server.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Headers", "application/json");
  res.sendStatus(204);
});
server.listen(port, () => {
  console.log("Servidor rodando na porta:", port);
});
