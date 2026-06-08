import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { spacing, fontSizes } from '../theme';

export function ConfiguracoesScreen() {
  const { isDark, toggleTheme, theme } = useTheme();
  const bg = isDark ? theme.background.dark : theme.background.light;
  const card = isDark ? theme.card.dark : theme.card.light;
  const textPrimary = isDark ? theme.text.primary.dark : theme.text.primary.light;
  const textSecondary = isDark ? theme.text.secondary.dark : theme.text.secondary.light;

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.titulo, { color: textPrimary }]}>Configurações</Text>

      <View style={[styles.item, { backgroundColor: card }]}>
        <View>
          <Text style={[styles.itemTitulo, { color: textPrimary }]}>Modo Escuro</Text>
          <Text style={[styles.itemSub, { color: textSecondary }]}>Alternar tema claro / escuro</Text>
        </View>
        <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ false: '#D1D5DB', true: '#2563EB' }} thumbColor="#fff" />
      </View>

      <View style={[styles.item, { backgroundColor: card }]}>
        <View>
          <Text style={[styles.itemTitulo, { color: textPrimary }]}>Projeto</Text>
          <Text style={[styles.itemSub, { color: textSecondary }]}>Zenite — CarbonEye Agro</Text>
        </View>
      </View>

      <View style={[styles.item, { backgroundColor: card }]}>
        <View>
          <Text style={[styles.itemTitulo, { color: textPrimary }]}>Fonte de Dados</Text>
          <Text style={[styles.itemSub, { color: textSecondary }]}>NASA POWER API + Sentinel-5P (ESA)</Text>
        </View>
      </View>

      <View style={[styles.item, { backgroundColor: card }]}>
        <View>
          <Text style={[styles.itemTitulo, { color: textPrimary }]}>ODS Alinhados</Text>
          <Text style={[styles.itemSub, { color: textSecondary }]}>ODS 2 · ODS 9 · ODS 13</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  titulo: { fontSize: fontSizes.xxl, fontWeight: '700', marginBottom: spacing.lg },
  item: { borderRadius: 12, padding: spacing.md, marginBottom: spacing.sm, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  itemTitulo: { fontSize: fontSizes.md, fontWeight: '600' },
  itemSub: { fontSize: fontSizes.sm, marginTop: 2 },
});
