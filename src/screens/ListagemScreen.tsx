import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator, RefreshControl } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useEventos } from '../hooks/useEventos';
import { useFavoritos } from '../hooks/useFavoritos';
import { EventoCard } from '../components/EventoCard';
import { spacing, fontSizes } from '../theme';

export function ListagemScreen() {
  const { isDark, theme } = useTheme();
  const { eventos, loading, recarregar } = useEventos();
  const { favoritos, adicionar, remover } = useFavoritos();
  const [busca, setBusca] = useState('');
  const [filtroRisco, setFiltroRisco] = useState('Todos');

  const bg = isDark ? theme.background.dark : theme.background.light;
  const card = isDark ? theme.card.dark : theme.card.light;
  const textPrimary = isDark ? theme.text.primary.dark : theme.text.primary.light;

  const filtrados = eventos.filter(e => {
    const matchBusca = e.poluente.toLowerCase().includes(busca.toLowerCase());
    const matchRisco = filtroRisco === 'Todos' || e.nivelRisco === filtroRisco;
    return matchBusca && matchRisco;
  });

  const isFavorito = (id: number) => favoritos.some(f => f.id === id);

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <TextInput
        style={[styles.input, { backgroundColor: card, color: textPrimary }]}
        placeholder="Buscar por poluente..."
        placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
        value={busca}
        onChangeText={setBusca}
      />
      <View style={styles.filtros}>
        {['Todos', 'Baixo', 'Medio', 'Alto'].map(f => (
          <Text
            key={f}
            onPress={() => setFiltroRisco(f)}
            style={[styles.filtro, {
              backgroundColor: filtroRisco === f ? '#2563EB' : card,
              color: filtroRisco === f ? '#fff' : textPrimary,
            }]}
          >{f}</Text>
        ))}
      </View>
      {loading ? (
        <ActivityIndicator color="#2563EB" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtrados}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: spacing.md }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={recarregar} />}
          ListEmptyComponent={
            <Text style={{ color: textPrimary, textAlign: 'center', marginTop: 40 }}>
              Nenhum evento encontrado.
            </Text>
          }
          renderItem={({ item }) => (
            <EventoCard
              evento={item}
              isFavorito={isFavorito(item.id)}
              onFavoritar={() => isFavorito(item.id) ? remover(item.id) : adicionar(item)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: { margin: spacing.md, borderRadius: 10, padding: spacing.sm + 4, fontSize: fontSizes.md },
  filtros: { flexDirection: 'row', paddingHorizontal: spacing.md, gap: 8, marginBottom: spacing.sm },
  filtro: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 99, fontSize: fontSizes.sm, fontWeight: '600', overflow: 'hidden' },
});
