import axios from 'axios';
import { EventoEmissao, PropriedadeRural } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
});

// Dados mockados para demonstração enquanto a API .NET não está conectada
const MOCK_EVENTOS: EventoEmissao[] = [
  {
    id: 1,
    poluente: 'NO2',
    concentracaoUgM3: 87.4,
    velocidadeVentoMs: 4.2,
    direcaoVentoGraus: 220,
    nivelRisco: 'Alto',
    dataHora: new Date().toISOString(),
    industria: { razaoSocial: 'Polo Industrial Cubatão S.A.' },
    propriedade: { nome: 'Sítio Vale Verde' },
  },
  {
    id: 2,
    poluente: 'SO2',
    concentracaoUgM3: 45.1,
    velocidadeVentoMs: 3.1,
    direcaoVentoGraus: 195,
    nivelRisco: 'Medio',
    dataHora: new Date(Date.now() - 86400000).toISOString(),
    industria: { razaoSocial: 'Polo Industrial Cubatão S.A.' },
    propriedade: { nome: 'Sítio Vale Verde' },
  },
  {
    id: 3,
    poluente: 'NO2',
    concentracaoUgM3: 12.3,
    velocidadeVentoMs: 1.8,
    direcaoVentoGraus: 90,
    nivelRisco: 'Baixo',
    dataHora: new Date(Date.now() - 172800000).toISOString(),
    industria: { razaoSocial: 'Polo Industrial Cubatão S.A.' },
    propriedade: { nome: 'Sítio Vale Verde' },
  },
  {
    id: 4,
    poluente: 'SO2',
    concentracaoUgM3: 93.7,
    velocidadeVentoMs: 5.5,
    direcaoVentoGraus: 210,
    nivelRisco: 'Alto',
    dataHora: new Date(Date.now() - 259200000).toISOString(),
    industria: { razaoSocial: 'Polo Industrial Cubatão S.A.' },
    propriedade: { nome: 'Fazenda São João' },
  },
  {
    id: 5,
    poluente: 'NO2',
    concentracaoUgM3: 38.9,
    velocidadeVentoMs: 2.7,
    direcaoVentoGraus: 180,
    nivelRisco: 'Medio',
    dataHora: new Date(Date.now() - 345600000).toISOString(),
    industria: { razaoSocial: 'Polo Industrial Cubatão S.A.' },
    propriedade: { nome: 'Sítio Boa Vista' },
  },
];

export async function getEventos(): Promise<EventoEmissao[]> {
  try {
    const { data } = await api.get('/eventos');
    return data;
  } catch {
    // Retorna dados mockados quando API não está disponível
    return MOCK_EVENTOS;
  }
}

export async function getPropriedades(): Promise<PropriedadeRural[]> {
  try {
    const { data } = await api.get('/propriedades');
    return data;
  } catch {
    return [];
  }
}
