import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EventoEmissao } from '../types';
import { RiscoTag } from './RiscoTag';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, fontSizes } from '../theme';

interface Props {
  evento: EventoEmissao;
  onFavoritar?: () => void;
  isFavorito?: boolean;
}

export function EventoCard({ evento, onFavoritar, isFavorito }: Props) {
  const { isDark, theme } = useTheme();
  const bg = isDark ? theme.card.dark : theme.card.light;
  const textPrimary = isDark ? theme.text.primary.dark : theme.text.primary.light;
  const textSecondary = isDark ? theme.text.secondary.dark : theme.text.secondary.light;

  return (
    <View style={[styles.card, { backgroundColor: bg }]}>
      <View style={styles.header}>
        <Text style={[styles.poluente, { color: textPrimary }]}>{evento.poluente}</Text>
        <RiscoTag nivel={evento.nivelRisco} />
      </View>
      <Text style={[styles.detalhe, { color: textSecondary }]}>
        Concentração: {evento.concentracaoUgM3} µg/m³
      </Text>
      <Text style={[styles.detalhe, { color: textSecondary }]}>
        Vento: {evento.velocidadeVentoMs} m/s — {evento.direcaoVentoGraus}°
      </Text>
      {evento.propriedade && (
        <Text style={[styles.detalhe, { color: textSecondary }]}>
          Propriedade: {evento.propriedade.nome}
        </Text>
      )}
      <Text style={[styles.detalhe, { color: textSecondary }]}>
        {new Date(evento.dataHora).toLocaleDateString('pt-BR')}
      </Text>
      {onFavoritar && (
        <TouchableOpacity onPress={onFavoritar} style={styles.btn}>
          <Text style={{ color: isFavorito ? '#DC2626' : '#2563EB', fontWeight: '600' }}>
            {isFavorito ? '★ Salvo' : '☆ Salvar'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08, shadowRadius: 4, elevation: 2,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.sm },
  poluente: { fontSize: fontSizes.lg, fontWeight: '700' },
  detalhe: { fontSize: fontSizes.md, marginBottom: 3 },
  btn: { marginTop: spacing.sm, alignSelf: 'flex-end' },
});
