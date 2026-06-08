import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventoEmissao } from '../types';

const KEY = '@zenite_favoritos';

export async function getFavoritos(): Promise<EventoEmissao[]> {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
}

export async function addFavorito(evento: EventoEmissao): Promise<void> {
  const lista = await getFavoritos();
  if (!lista.some(e => e.id === evento.id)) {
    await AsyncStorage.setItem(KEY, JSON.stringify([...lista, evento]));
  }
}

export async function removeFavorito(id: number): Promise<void> {
  const lista = await getFavoritos();
  await AsyncStorage.setItem(KEY, JSON.stringify(lista.filter(e => e.id !== id)));
}
