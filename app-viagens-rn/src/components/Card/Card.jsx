import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Card({ titulo, subtitulo, pontuacao, valor }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrap}>
        <Image
          source={require('../../../assets/Munique.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.titulo}>{titulo}</Text>

        <View style={styles.row}>
          <Icon name="office-building" size={16} color="#444" />
          <Text style={styles.subtitulo}>{subtitulo}</Text>
        </View>

        <View style={styles.row}>
          <Icon name="star" size={16} color="#f5b301" />
          <Text style={styles.pontuacao}>{pontuacao}</Text>
          <Text style={styles.reviews}>(Reviews)</Text>
        </View>

        <View style={styles.optionsRow}>
          <View style={styles.iconBox}>
            <Icon name="plus" size={18} color="#2d5a2d" />
          </View>
          <View style={styles.iconBox}>
            <Icon name="car" size={18} color="#2d5a2d" />
            <Icon name="directions" size={18} color="#2d5a2d" />
          </View>
        </View>

        <Text style={styles.valor}>{valor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageWrap: { width: '100%', height: 120 },
  image: { width: '100%', height: '100%' },
  info: { padding: 10, gap: 6 },
  titulo: { fontSize: 15, fontWeight: '700', color: '#222' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  subtitulo: { fontSize: 13, color: '#555' },
  pontuacao: { fontSize: 13, fontWeight: '600', color: '#222' },
  reviews: { fontSize: 12, color: '#888' },
  optionsRow: { flexDirection: 'row', gap: 10, marginTop: 4 },
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    backgroundColor: '#eef6ee',
  },
  valor: { fontSize: 15, fontWeight: '700', color: '#2d5a2d', marginTop: 4 },
});
