import { useState, useEffect } from 'react';
import { EventoEmissao } from '../types';
import { getEventos } from '../services/zeniteApi';

export function useEventos() {
  const [eventos, setEventos] = useState<EventoEmissao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function carregar() {
    try {
      setLoading(true);
      setError(null);
      const data = await getEventos();
      setEventos(data);
    } catch {
      setError('Erro ao carregar eventos.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  return { eventos, loading, error, recarregar: carregar };
}
