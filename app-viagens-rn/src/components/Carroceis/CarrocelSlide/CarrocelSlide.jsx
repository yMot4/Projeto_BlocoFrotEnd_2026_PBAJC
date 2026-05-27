import { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import Card from '../../Card/Card';

const TempoAutoSlide = 3000;
const TempoAMaisAutoSlide = 5000;
const TempoComDelayAutoSlide = TempoAutoSlide + TempoAMaisAutoSlide;
const CARD_WIDTH = 236;

export default function CarrocelSlide({ titulo, maxItens }) {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);
  const activeIndexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=${maxItens}`,
        );
        if (!response.ok)
          throw new Error(`HTTP error: Status ${response.status}`);
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [maxItens]);

  const scrollTo = (index) => {
    if (!listRef.current || data.length === 0) return;
    listRef.current.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
    setActiveIndex(index);
    activeIndexRef.current = index;
  };

  const agendarProximoSlide = (delay) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (data.length > 0) {
        const prox = (activeIndexRef.current + 1) % data.length;
        scrollTo(prox);
      }
      agendarProximoSlide(TempoAutoSlide);
    }, delay);
  };

  useEffect(() => {
    if (data.length > 0) agendarProximoSlide(TempoAutoSlide);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.length]);

  const handleUserInteraction = () => {
    agendarProximoSlide(TempoComDelayAutoSlide);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pacotes Promocionais</Text>

      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(_, i) => String(i)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        onScrollBeginDrag={handleUserInteraction}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
          setActiveIndex(idx);
          activeIndexRef.current = idx;
        }}
        getItemLayout={(_, i) => ({
          length: CARD_WIDTH,
          offset: CARD_WIDTH * i,
          index: i,
        })}
        renderItem={({ index }) => (
          <Card
            titulo="Munique, Alemanha"
            subtitulo="Munich Marriott Hotel"
            pontuacao={4.8}
            valor="R$2.458"
          />
        )}
      />

      <View style={styles.dots}>
        {data.map((_, i) => (
          <Pressable
            key={i}
            onPress={() => {
              scrollTo(i);
              handleUserInteraction();
            }}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', alignItems: 'center', gap: 12 },
  title: { fontSize: 18, fontWeight: '700', color: '#2d5a2d' },
  list: { paddingHorizontal: 8 },
  dots: { flexDirection: 'row', gap: 6, marginTop: 6 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(45,90,45,0.3)',
  },
  dotActive: { backgroundColor: '#2d5a2d', width: 18 },
});
