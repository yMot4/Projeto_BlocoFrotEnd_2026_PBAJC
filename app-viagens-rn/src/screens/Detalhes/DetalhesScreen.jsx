import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function VooBox({
  titulo,
  ciaAerea,
  aeroPartida,
  aeroChegada,
  dataPartida,
  horaPartida,
  dataChegada,
  horaChegada,
}) {
  return (
    <View style={styles.box}>
      <Text style={styles.boxTitle}>{titulo}</Text>

      <View style={styles.localidade}>
        <Text style={styles.localData}>{dataPartida} • {horaPartida}</Text>
        <View style={styles.localRow}>
          <Icon name="airplane-takeoff" size={20} color="#2d5a2d" />
          <Text style={styles.localAero}>{aeroPartida}</Text>
        </View>
      </View>

      <View style={styles.infoCia}>
        <Icon name="airplane" size={16} color="#444" />
        <Text style={styles.cia}>{ciaAerea}</Text>
      </View>

      <View style={styles.localidade}>
        <Text style={styles.localData}>{dataChegada} • {horaChegada}</Text>
        <View style={styles.localRow}>
          <Icon name="airplane-landing" size={20} color="#2d5a2d" />
          <Text style={styles.localAero}>{aeroChegada}</Text>
        </View>
      </View>
    </View>
  );
}

export default function DetalhesScreen({ route, navigation }) {
  const item = route?.params?.item;

  if (!item) {
    return (
      <SafeAreaView style={styles.tela} edges={['top']}>
        <Text style={styles.status}>Nenhum dado encontrado.</Text>
      </SafeAreaView>
    );
  }

  const {
    ciaAerea,
    valor,
    aeroPartidaIda, aeroChegadaIda, dataPartidaIda, horaPartidaIda, dataChegadaIda, horaChegadaIda,
    aeroPartidaVolta, aeroChegadaVolta, dataPartidaVolta, horaPartidaVolta, dataChegadaVolta, horaChegadaVolta,
  } = item;

  const valorFmt = Number(valor).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });

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
        <Text style={styles.headerTitle}>Ida e volta para: {aeroChegadaIda}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <VooBox
          titulo={`Voo para ${aeroChegadaIda}`}
          ciaAerea={ciaAerea}
          aeroPartida={aeroPartidaIda}
          aeroChegada={aeroChegadaIda}
          dataPartida={dataPartidaIda}
          horaPartida={horaPartidaIda}
          dataChegada={dataChegadaIda}
          horaChegada={horaChegadaIda}
        />

        {aeroPartidaVolta && (
          <VooBox
            titulo={`Voo para ${aeroChegadaVolta}`}
            ciaAerea={ciaAerea}
            aeroPartida={aeroPartidaVolta}
            aeroChegada={aeroChegadaVolta}
            dataPartida={dataPartidaVolta}
            horaPartida={horaPartidaVolta}
            dataChegada={dataChegadaVolta}
            horaChegada={horaChegadaVolta}
          />
        )}

        <View style={styles.opcionais}>
          <Text style={styles.opcaoTitle}>Hotéis</Text>
          <Text style={styles.opcaoTitle}>Aluguel de Carros</Text>
        </View>
      </ScrollView>

      <View style={styles.confirmar}>
        <Text style={styles.preco}>R$ {valorFmt}</Text>
        <Pressable style={styles.btnConfirmar}>
          <Text style={styles.btnConfirmarText}>Confirmar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#E8F3E9' },
  status: { textAlign: 'center', padding: 24, color: '#555' },
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
  headerTitle: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  scroll: { padding: 16, gap: 16 },
  box: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  boxTitle: { fontSize: 16, fontWeight: '700', color: '#222' },
  localidade: { gap: 4 },
  localData: { fontSize: 12, color: '#666' },
  localRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  localAero: { fontSize: 18, fontWeight: '600', color: '#222' },
  infoCia: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cia: { fontSize: 13, color: '#444' },
  opcionais: { gap: 8, marginTop: 8 },
  opcaoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2d5a2d',
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  confirmar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  preco: { fontSize: 18, fontWeight: '700', color: '#2d5a2d' },
  btnConfirmar: {
    backgroundColor: '#2d5a2d',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  btnConfirmarText: { color: '#fff', fontWeight: '700' },
});
