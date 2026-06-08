# ZeniteApp — CarbonEye Agro

Aplicativo mobile de monitoramento de poluição industrial via satélite, desenvolvido para o Global Solution 2026 da FIAP.

## Integrante

- Nome: SEU NOME COMPLETO
- RM: SEU RM
- Curso: Engenharia de Software — FIAP

## Sobre o Projeto

O ZeniteApp permite que pequenos agricultores monitorem em tempo real a dispersão de poluentes industriais (NO2 e SO2) em suas regiões, utilizando dados públicos e gratuitos da NASA POWER API e do satélite Sentinel-5P da ESA.

O problema que resolve: agricultores próximos a polos industriais sofrem perdas de produtividade causadas por poluição atmosférica, mas não têm ferramentas acessíveis para monitorar e comprovar esse impacto. O Zenite democratiza esse acesso.

## Funcionalidades

- Dashboard com dados meteorológicos em tempo real via NASA POWER API (vento, temperatura, umidade)
- Listagem de eventos de emissão de poluentes com filtros por tipo de risco e busca por poluente
- Sistema de favoritos com persistência local via AsyncStorage
- Configurações com alternância de tema claro e escuro (dark mode)

## Tecnologias Utilizadas

- React Native
- Expo SDK 51
- TypeScript
- React Navigation (Bottom Tabs + Native Stack)
- Axios
- AsyncStorage
- Context API
- Custom Hooks

## Fontes de Dados

- NASA POWER API — dados meteorológicos históricos e em tempo real
- Sentinel-5P (ESA) — monitoramento de poluentes atmosféricos (NO2, SO2)

## ODS Alinhados

- ODS 2 — Fome Zero e Agricultura Sustentável
- ODS 9 — Industria, Inovacao e Infraestrutura
- ODS 13 — Acao Contra a Mudanca Global do Clima

## Como Executar

### Pre-requisitos

- Node.js instalado (versao LTS recomendada)
- Expo Go instalado no celular (disponivel na App Store e Google Play)

### Instalacao

```bash
npm install --legacy-peer-deps
```

### Executar no navegador

```bash
npx expo start --web
```

### Executar no celular

```bash
npx expo start
```

Apos iniciar, escaneie o QR code exibido no terminal com o aplicativo Expo Go.

### Executar no Android

```bash
npx expo start --android
```

### Executar no iOS

```bash
npx expo start --ios
```

## Estrutura do Projeto

src/
├── components/       — Componentes reutilizaveis (EventoCard, RiscoTag)
├── contexts/         — Context API para tema global
├── hooks/            — Custom hooks (useEventos, useFavoritos)
├── navigation/       — Configuracao de navegacao
├── screens/          — Telas do aplicativo
├── services/         — Integracao com APIs externas
├── storage/          — Persistencia local com AsyncStorage
├── theme/            — Cores, espacamentos e tipografia
└── types/            — Interfaces TypeScript



## Observacoes

- O aplicativo utiliza dados mockados para eventos de emissao enquanto a API backend nao esta conectada.
- Para conectar com a API .NET do projeto, altere a baseURL em `src/services/zeniteApi.ts` para o endereco do servidor.
