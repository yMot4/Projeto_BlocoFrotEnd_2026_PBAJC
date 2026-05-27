import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardPassagem from '../../components/CardPassagem/CardPassagem';

export default function PassagensScreen({ route, navigation }) {
  const params = route?.params ?? {};
  const prefetched = params.results;
  const { origem, destino, dataIda, dataVolta, adultos = 1, criancas = 0 } = params;

  const [dados, setDados] = useState(prefetched ?? []);
  const [loading, setLoading] = useState(!prefetched);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (prefetched) return;
    if (!origem || !destino || !dataIda) {
      setError('Parâmetros de busca incompletos.');
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const fetchDados = async () => {
      try {
        setLoading(true);
        setError(null);
        const qs = new URLSearchParams({
          Origem: origem,
          Destino: destino,
          DataIda: dataIda,
          Adultos: String(adultos),
          Criancas: String(criancas),
        });
        if (dataVolta) qs.set('DataVolta', dataVolta);
        const response = await fetch(
          `https://travelagencyapi-a5zb.onrender.com/api/v1/travel-tickets/search?${qs.toString()}`,
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error(`Erro na API: ${response.status}`);
        const resultado = await response.json();
        setDados(resultado);
      } catch (erro) {
        if (erro.name !== 'AbortError') setError(erro.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDados();
    return () => controller.abort();
  }, [prefetched, origem, destino, dataIda, dataVolta, adultos, criancas]);

  return (
    <SafeAreaView style={styles.tela} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="Voltar"
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={22} color="#fff" />
        </Pressable>
        <Text style={styles.headerTitle}>Resultado da Pesquisa</Text>
      </View>

      <View style={styles.filters}>
        <View style={styles.btnFilter}>
          <Icon name="sort" size={18} color="#222" />
          <Text style={styles.filterText}>Ordenar</Text>
        </View>
        <View style={styles.btnFilter}>
          <Icon name="filter-variant" size={18} color="#222" />
          <Text style={styles.filterText}>Filtrar</Text>
        </View>
      </View>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2d5a2d" />
        </View>
      )}

      {error && !loading && (
        <Text style={styles.error}>{error}</Text>
      )}

      {!loading && !error && (
        <FlatList
          data={dados}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.navigate('Detalhes', { id: item.id, item })
              }
            >
              <CardPassagem dados={item} />
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Nenhuma passagem encontrada.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E8F3E9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2d5a2d',
  },
  btnBack: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '700' },
  filters: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  btnFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#fff',
  },
  filterText: { fontSize: 13, color: '#222' },
  list: { paddingHorizontal: 16, paddingBottom: 24 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  error: { color: '#c0392b', textAlign: 'center', padding: 16 },
  empty: { textAlign: 'center', color: '#555', padding: 24 },
});
