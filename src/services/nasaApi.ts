import axios from 'axios';
import { NasaWindData } from '../types';

const NASA_BASE = 'https://power.larc.nasa.gov/api/temporal/daily/point';

export async function getWindData(lat: number, lon: number): Promise<NasaWindData> {
  const hoje = new Date();
  const fim = hoje.toISOString().slice(0, 10).replace(/-/g, '');
  const inicio = new Date(hoje.setDate(hoje.getDate() - 7))
    .toISOString().slice(0, 10).replace(/-/g, '');

  const { data } = await axios.get(NASA_BASE, {
    params: {
      parameters: 'WS10M,WD10M,T2M,RH2M',
      community: 'RE',
      longitude: lon,
      latitude: lat,
      start: inicio,
      end: fim,
      format: 'JSON',
    },
  });

  const params = data.properties.parameter;
  const datas = Object.keys(params.WS10M);
  const ultima = datas[datas.length - 1];

return {
  velocidade: params.WS10M[ultima] === -999 ? 0 : params.WS10M[ultima] ?? 0,
  direcao: params.WD10M[ultima] === -999 ? 0 : params.WD10M[ultima] ?? 0,
  temperatura: params.T2M[ultima] === -999 ? 0 : params.T2M[ultima] ?? 0,
  umidade: params.RH2M[ultima] === -999 ? 0 : params.RH2M[ultima] ?? 0,
};
}
