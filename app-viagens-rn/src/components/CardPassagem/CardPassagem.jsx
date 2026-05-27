import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CardPassagem({ dados }) {
  const {
    ciaAerea,
    horaPartidaIda, aeroPartidaIda, dataPartidaIda,
    horaChegadaIda, aeroChegadaIda, dataChegadaIda,
    horaPartidaVolta, aeroPartidaVolta, dataPartidaVolta,
    horaChegadaVolta, aeroChegadaVolta, dataChegadaVolta,
    paradas,
    valor,
  } = dados;

  return (
    <View style={styles.container}>
      <View style={styles.lateral}>
        <Icon name="airplane" size={16} color="#fff" style={styles.aviao} />
        <Text style={styles.cia}>{ciaAerea}</Text>
      </View>

      <View style={styles.info}>
        <View style={styles.linhaVoo}>
          <View style={styles.col}>
            <Text style={styles.horario}>{horaPartidaIda}</Text>
            <Text style={styles.data}>{aeroPartidaIda} · {dataPartidaIda}</Text>
          </View>
          <Icon name="airplane" size={16} color="#000" />
          <View style={styles.col}>
            <Text style={styles.horario}>{horaChegadaIda}</Text>
            <Text style={styles.data}>{aeroChegadaIda} · {dataChegadaIda}</Text>
          </View>
        </View>

        {aeroPartidaVolta ? (
          <View style={styles.linhaVoo}>
            <View style={styles.col}>
              <Text style={styles.horario}>{horaPartidaVolta}</Text>
              <Text style={styles.data}>{aeroPartidaVolta} · {dataPartidaVolta}</Text>
            </View>
            <Icon name="airplane" size={16} color="#000" style={styles.flip} />
            <View style={styles.col}>
              <Text style={styles.horario}>{horaChegadaVolta}</Text>
              <Text style={styles.data}>{aeroChegadaVolta} · {dataChegadaVolta}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.detalhes}>
          <View style={styles.bagagens}>
            <Image
              source={require('../../../assets/malas.png')}
              accessibilityLabel="Bagagem porão"
              style={styles.malaIcone}
              resizeMode="contain"
            />
            <Image
              source={require('../../../assets/malas_mao.png')}
              accessibilityLabel="Bagagem de mão"
              style={styles.malaIcone}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.paradas}>{paradas} Parada</Text>
          <Text style={styles.valor}>R${valor}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  lateral: {
    backgroundColor: '#2d5a2d',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  aviao: { transform: [{ rotate: '90deg' }], marginBottom: 6 },
  cia: { color: '#fff', fontSize: 11, fontWeight: '600', textAlign: 'center' },
  info: { flex: 1, padding: 12, gap: 8 },
  linhaVoo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 6,
  },
  col: { flex: 1 },
  horario: { fontSize: 16, fontWeight: '700', color: '#111' },
  data: { fontSize: 11, color: '#555' },
  flip: { transform: [{ rotate: '-90deg' }] },
  detalhes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  bagagens: { flexDirection: 'row', gap: 6 },
  malaIcone: { width: 20, height: 20 },
  paradas: { fontSize: 12, color: '#444' },
  valor: { fontSize: 14, fontWeight: '700', color: '#2d5a2d' },
});
