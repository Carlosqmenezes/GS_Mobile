import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

interface Props { nivel: 'Baixo' | 'Medio' | 'Alto'; }

export function RiscoTag({ nivel }: Props) {
  const cor = { Baixo: colors.risco.baixo, Medio: colors.risco.medio, Alto: colors.risco.alto }[nivel];
  return (
    <View style={[styles.badge, { backgroundColor: cor + '22' }]}>
      <Text style={[styles.texto, { color: cor }]}>{nivel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99, alignSelf: 'flex-start' },
  texto: { fontSize: 12, fontWeight: '600' },
});
