import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { useFavoritos } from '../hooks/useFavoritos';
import { EventoCard } from '../components/EventoCard';
import { spacing, fontSizes } from '../theme';

export function FavoritosScreen() {
  const { isDark, theme } = useTheme();
  const { favoritos, loading, remover } = useFavoritos();
  const bg = isDark ? theme.background.dark : theme.background.light;
  const textPrimary = isDark ? theme.text.primary.dark : theme.text.primary.light;

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      {loading ? (
        <ActivityIndicator color="#2563EB" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: spacing.md }}
          ListHeaderComponent={
            <Text style={[styles.titulo, { color: textPrimary }]}>
              ★ Eventos Salvos ({favoritos.length})
            </Text>
          }
          ListEmptyComponent={
            <Text style={{ color: textPrimary, textAlign: 'center', marginTop: 40 }}>
              Nenhum evento salvo ainda.{'\n'}Salve eventos na aba Listagem.
            </Text>
          }
          renderItem={({ item }) => (
            <EventoCard evento={item} isFavorito={true} onFavoritar={() => remover(item.id)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  titulo: { fontSize: fontSizes.xl, fontWeight: '700', marginBottom: 16 },
});
