import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ListagemScreen } from '../screens/ListagemScreen';
import { FavoritosScreen } from '../screens/FavoritosScreen';
import { ConfiguracoesScreen } from '../screens/ConfiguracoesScreen';
import { useTheme } from '../contexts/ThemeContext';
import { colors } from '../theme';

const Tab = createBottomTabNavigator();

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons: Record<string, string> = {
    Home: '🛰️', Listagem: '📋', Favoritos: '★', Configuracoes: '⚙️',
  };
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>
      {icons[name] ?? '•'}
    </Text>
  );
}

export function AppNavigator() {
  const { isDark, theme } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: isDark ? '#6B7280' : '#9CA3AF',
          tabBarStyle: {
            backgroundColor: isDark ? theme.card.dark : theme.card.light,
            borderTopColor: isDark ? '#374151' : '#E5E7EB',
          },
          headerStyle: { backgroundColor: isDark ? theme.card.dark : theme.card.light },
          headerTintColor: isDark ? theme.text.primary.dark : theme.text.primary.light,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Tab.Screen name="Listagem" component={ListagemScreen} options={{ title: 'Eventos' }} />
        <Tab.Screen name="Favoritos" component={FavoritosScreen} />
        <Tab.Screen name="Configuracoes" component={ConfiguracoesScreen} options={{ title: 'Configurações' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
