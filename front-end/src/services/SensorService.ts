import axios from "axios";
import { TemperaturaInterface } from "../Models/Temperatura";

const baseUrl = "http://localhost:3000";
class SensorService {

  // ------------TEMPERATURA
  async getTemperatura() {
    try {
      const response = await axios.get(`${baseUrl}/temperatura/list`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getTemperaturaPaginated(page: number, limit: number) {
    try {
      const response = await axios.get(`${baseUrl}/temperatura?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getTemperaturaById(id: number) {
    try {
      const response = await axios.get(`${baseUrl}/temperatura/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async insertTemperatura(sensor: TemperaturaInterface) {
    try {
      const response = await axios.post(`${baseUrl}/temperatura`, sensor);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteTemperaturaById(id: number) {
    try {
      const response = await axios.delete(`${baseUrl}/temperatura/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  // ----------------HUMIDADE-------------------
  async getHumidade() {
    try {
      const response = await axios.get(`${baseUrl}/umidade/list`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getHumidadePaginated(page: number, limit: number) {
    try {
      const response = await axios.get(`${baseUrl}/umidade?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getHumidadeById(id: number) {
    try {
      const response = await axios.get(`${baseUrl}/umidade/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async insertHumidade(sensor: TemperaturaInterface) {
    try {
      const response = await axios.post(`${baseUrl}/umidade`, sensor);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteHumidadeById(id: number) {
    try {
      const response = await axios.delete(`${baseUrl}/umidade/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  // -------------------PH----------------------
  async getPh() {
    try {
      const response = await axios.get(`${baseUrl}/ph/list`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPhPaginated(page: number, limit: number) {
    try {
      const response = await axios.get(`${baseUrl}/ph?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getPhById(id: number) {
    try {
      const response = await axios.get(`${baseUrl}/ph/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async insertPh(sensor: TemperaturaInterface) {
    try {
      const response = await axios.post(`${baseUrl}/ph`, sensor);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deletePhById(id: number) {
    try {
      const response = await axios.delete(`${baseUrl}/ph/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
export default new SensorService();