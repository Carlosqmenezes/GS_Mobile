import { useState, useEffect, useCallback } from 'react';
import { EventoEmissao } from '../types';
import { getFavoritos, addFavorito, removeFavorito } from '../storage/favoritos';

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<EventoEmissao[]>([]);
  const [loading, setLoading] = useState(true);

  const carregar = useCallback(async () => {
    setLoading(true);
    const data = await getFavoritos();
    setFavoritos(data);
    setLoading(false);
  }, []);

  async function adicionar(evento: EventoEmissao) {
    await addFavorito(evento);
    await carregar();
  }

  async function remover(id: number) {
    await removeFavorito(id);
    await carregar();
  }

  useEffect(() => { carregar(); }, [carregar]);

  return { favoritos, loading, adicionar, remover, carregar };
}
