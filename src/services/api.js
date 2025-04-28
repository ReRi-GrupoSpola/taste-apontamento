// Serviço de conexão API
import axios from 'axios';

const api = axios.create({
 baseURL: 'https://suaapi.com/api',
});

export default api;