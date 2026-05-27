import { View, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchForm from '../../components/SearchForm/SearchForm';
import CarrocelSlide from '../../components/Carroceis/CarrocelSlide/CarrocelSlide';
import ApiStatus from '../../components/ApiStatus/ApiStatus';

export default function HomeScreen() {
  return (
    <View style={styles.tela}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1521292270410-a8c4d716d518?fm=jpg&q=60&w=3000&auto=format&fit=crop',
        }}
        style={styles.bg}
        resizeMode="cover"
      >
        <SafeAreaView edges={['top']} style={styles.safe}>
          <View style={styles.statusWrap}>
            <ApiStatus />
          </View>
          <View style={styles.searchWrap}>
            <SearchForm />
          </View>
        </SafeAreaView>
      </ImageBackground>

      <ScrollView style={styles.painel} contentContainerStyle={styles.painelContent}>
        <CarrocelSlide titulo="promo" maxItens={10} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#000' },
  bg: { width: '100%', height: 500 },
  safe: { flex: 1, alignItems: 'center' },
  statusWrap: { marginTop: 12 },
  searchWrap: { marginTop: 16 },
  painel: {
    flex: 1,
    marginTop: -80,
    backgroundColor: '#E8F3E9',
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
  },
  painelContent: { alignItems: 'center', paddingTop: 40, paddingBottom: 32 },
});
