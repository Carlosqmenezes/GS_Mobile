import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { getWindData } from '../services/nasaApi';
import { NasaWindData } from '../types';
import { useEventos } from '../hooks/useEventos';
import { colors, spacing, fontSizes } from '../theme';

export function HomeScreen() {
  const { isDark, theme } = useTheme();
  const { eventos, loading } = useEventos();
  const [vento, setVento] = useState<NasaWindData | null>(null);
  const [loadingVento, setLoadingVento] = useState(true);

  const bg = isDark ? theme.background.dark : theme.background.light;
  const card = isDark ? theme.card.dark : theme.card.light;
  const textPrimary = isDark ? theme.text.primary.dark : theme.text.primary.light;
  const textSecondary = isDark ? theme.text.secondary.dark : theme.text.secondary.light;

  useEffect(() => {
    getWindData(-23.89, -46.42)
      .then(setVento)
      .catch(() => setVento(null))
      .finally(() => setLoadingVento(false));
  }, []);

  const total = eventos.length;
  const altos = eventos.filter(e => e.nivelRisco === 'Alto').length;
  const medios = eventos.filter(e => e.nivelRisco === 'Medio').length;

  return (
    <ScrollView style={[styles.container, { backgroundColor: bg }]} contentContainerStyle={styles.content}>
      <Text style={[styles.titulo, { color: textPrimary }]}>🛰️ Zenite</Text>
      <Text style={[styles.subtitulo, { color: textSecondary }]}>
        Monitor de Poluição Industrial via Satélite
      </Text>

      <View style={[styles.card, { backgroundColor: card }]}>
        <Text style={[styles.cardTitulo, { color: textPrimary }]}>🌬️ Condições Atuais — Cubatão/SP</Text>
        {loadingVento ? (
          <ActivityIndicator color={colors.primary} />
        ) : vento && vento.velocidade > 0 ? (
          <>
            <Text style={[styles.cardItem, { color: textSecondary }]}>Vento: {vento.velocidade.toFixed(1)} m/s — {vento.direcao.toFixed(0)}°</Text>
            <Text style={[styles.cardItem, { color: textSecondary }]}>Temperatura: {vento.temperatura.toFixed(1)} °C</Text>
            <Text style={[styles.cardItem, { color: textSecondary }]}>Umidade: {vento.umidade.toFixed(0)}%</Text>
          </>
        ) : (
          <Text style={{ color: textSecondary }}>Aguardando dados da NASA...</Text>
        )}
        <Text style={[styles.fonte, { color: textSecondary }]}>Fonte: NASA POWER API</Text>
      </View>

      <View style={styles.indicadores}>
        <View style={[styles.indicador, { backgroundColor: card }]}>
          <Text style={[styles.indValor, { color: colors.primary }]}>{total}</Text>
          <Text style={[styles.indLabel, { color: textSecondary }]}>Eventos</Text>
        </View>
        <View style={[styles.indicador, { backgroundColor: card }]}>
          <Text style={[styles.indValor, { color: colors.risco.alto }]}>{altos}</Text>
          <Text style={[styles.indLabel, { color: textSecondary }]}>Alto Risco</Text>
        </View>
        <View style={[styles.indicador, { backgroundColor: card }]}>
          <Text style={[styles.indValor, { color: colors.risco.medio }]}>{medios}</Text>
          <Text style={[styles.indLabel, { color: textSecondary }]}>Médio Risco</Text>
        </View>
      </View>

      {loading && <ActivityIndicator color={colors.primary} style={{ marginTop: 20 }} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md },
  titulo: { fontSize: fontSizes.xxl, fontWeight: '700', marginBottom: 4 },
  subtitulo: { fontSize: fontSizes.md, marginBottom: spacing.lg },
  card: { borderRadius: 12, padding: spacing.md, marginBottom: spacing.md, elevation: 2 },
  cardTitulo: { fontSize: fontSizes.lg, fontWeight: '600', marginBottom: spacing.sm },
  cardItem: { fontSize: fontSizes.md, marginBottom: 4 },
  fonte: { fontSize: 11, marginTop: spacing.sm, fontStyle: 'italic' },
  indicadores: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  indicador: { flex: 1, borderRadius: 12, padding: spacing.md, alignItems: 'center', elevation: 2 },
  indValor: { fontSize: fontSizes.xxl, fontWeight: '700' },
  indLabel: { fontSize: fontSizes.sm, marginTop: 2 },
});