export interface PropriedadeRural {
  id: number;
  nome: string;
  proprietario: string;
  areaHectares: number;
  estado: string;
  numeroCar: string;
  latitude: number;
  longitude: number;
}

export interface EventoEmissao {
  id: number;
  poluente: string;
  concentracaoUgM3: number;
  velocidadeVentoMs: number;
  direcaoVentoGraus: number;
  nivelRisco: 'Baixo' | 'Medio' | 'Alto';
  dataHora: string;
  industria?: { razaoSocial: string };
  propriedade?: { nome: string };
}

export interface LaudoPericial {
  id: number;
  quedaNdviPercent: number;
  descricaoNexoCausal: string;
  status: string;
  geradoEm: string;
}

export interface NasaWindData {
  velocidade: number;
  direcao: number;
  temperatura: number;
  umidade: number;
}
