import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const API_BASE = 'https://travelagencyapi-a5zb.onrender.com/api/v1';
const DEBOUNCE_MS = 250;
const MIN_QUERY_LEN = 2;

function AirportField({ placeholder, iconFlip, value, onSelect }) {
  const [query, setQuery] = useState(value?.label ?? '');
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (abortRef.current) abortRef.current.abort();

    const trimmed = query.trim();
    if (trimmed.length < MIN_QUERY_LEN) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortRef.current = controller;
      try {
        const res = await fetch(
          `${API_BASE}/airports/search?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(res.status);
        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        if (err.name !== 'AbortError') setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handlePick = (airport) => {
    onSelect(airport);
    setQuery(`${airport.cidade} (${airport.iata})`);
    setOpen(false);
  };

  return (
    <View style={styles.fieldWrapper}>
      <View style={styles.row}>
        <Icon
          name="airplane"
          size={18}
          color="rgba(255,255,255,0.6)"
          style={iconFlip ? { transform: [{ scaleX: -1 }] } : null}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setOpen(true);
            onSelect(null);
          }}
          onFocus={() => setOpen(true)}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>

      {open && query.trim().length >= MIN_QUERY_LEN && (
        <View style={styles.suggestions}>
          {loading && (
            <View style={styles.suggestionEmpty}>
              <ActivityIndicator color="#a3e635" />
              <Text style={styles.suggestionEmptyText}>Buscando...</Text>
            </View>
          )}
          {!loading && suggestions.length === 0 && (
            <View style={styles.suggestionEmpty}>
              <Text style={styles.suggestionEmptyText}>
                Nenhum aeroporto encontrado
              </Text>
            </View>
          )}
          {!loading && suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(a) => a.iata}
              keyboardShouldPersistTaps="handled"
              style={{ maxHeight: 260 }}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.suggestionItem}
                  onPress={() => handlePick(item)}
                >
                  <Text style={styles.suggestionIata}>{item.iata}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.suggestionMain}>
                      {item.cidade}
                      {item.pais ? `, ${item.pais}` : ''}
                    </Text>
                    <Text style={styles.suggestionSub} numberOfLines={1}>
                      {item.nome}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
          )}
        </View>
      )}
    </View>
  );
}

function toIso(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatPtDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return '';
  return `${d}/${m}/${y}`;
}

function DateField({ label, value, onChange, minDate }) {
  const [show, setShow] = useState(false);
  const display = formatPtDate(value);
  const currentDate = value ? new Date(`${value}T00:00:00`) : new Date();

  const handleChange = (event, selected) => {
    if (Platform.OS === 'android') setShow(false);
    if (event?.type === 'dismissed') return;
    if (selected) onChange(toIso(selected));
  };

  return (
    <Pressable style={styles.pill} onPress={() => setShow(true)}>
      <Text style={styles.pillLabel}>{label}</Text>
      <View style={styles.dateWrapper}>
        <Icon name="calendar" size={16} color="rgba(255,255,255,0.6)" />
        <Text style={display ? styles.dateValue : styles.datePlaceholder}>
          {display || 'dd/mm/aaaa'}
        </Text>
      </View>
      {show && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          minimumDate={minDate ? new Date(`${minDate}T00:00:00`) : undefined}
          onChange={handleChange}
        />
      )}
    </Pressable>
  );
}

export default function SearchForm() {
  const navigation = useNavigation();
  const [origem, setOrigem] = useState(null);
  const [destino, setDestino] = useState(null);
  const [dataIda, setDataIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const canSearch =
    origem?.iata &&
    destino?.iata &&
    origem.iata !== destino.iata &&
    dataIda &&
    (!dataVolta || dataVolta >= dataIda) &&
    adultos >= 1;

  const handleSearch = async () => {
    if (!canSearch || searching) return;
    setSearching(true);
    setSearchError(null);

    const apiQs = new URLSearchParams({
      Origem: origem.iata,
      Destino: destino.iata,
      DataIda: dataIda,
      Adultos: String(adultos),
      Criancas: String(criancas),
    });
    if (dataVolta) apiQs.set('DataVolta', dataVolta);

    try {
      const res = await fetch(
        `${API_BASE}/travel-tickets/search?${apiQs.toString()}`,
      );
      if (!res.ok) throw new Error(`Erro na API: ${res.status}`);
      const results = await res.json();
      navigation.navigate('Passagens', {
        results,
        origem: origem.iata,
        destino: destino.iata,
        dataIda,
        dataVolta,
        adultos,
        criancas,
      });
    } catch (err) {
      setSearchError(err.message || 'Falha ao buscar passagens.');
    } finally {
      setSearching(false);
    }
  };

  return (
    <View style={styles.container}>
      <AirportField
        placeholder="Cidade de partida"
        value={origem}
        onSelect={setOrigem}
      />

      <View style={styles.divider} />

      <AirportField
        placeholder="Cidade de destino"
        iconFlip
        value={destino}
        onSelect={setDestino}
      />

      <View style={styles.divider} />

      <View style={styles.rowBottom}>
        <DateField label="Data partida" value={dataIda} onChange={setDataIda} />
        <View style={styles.pillDivider} />
        <DateField
          label="Data retorno"
          value={dataVolta}
          onChange={setDataVolta}
          minDate={dataIda}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.rowBottom}>
        <View style={styles.pillViajantes}>
          <Icon name="account" size={18} color="rgba(255,255,255,0.6)" />
          <Text style={styles.viajantesLabel}>Adultos</Text>
          <View style={styles.selectWrap}>
            <Picker
              selectedValue={adultos}
              onValueChange={(v) => setAdultos(Number(v))}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
                <Picker.Item key={n} label={String(n)} value={n} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.pillDivider} />

        <View style={styles.pillViajantes}>
          <Icon name="account-group" size={18} color="rgba(255,255,255,0.6)" />
          <Text style={styles.viajantesLabel}>Crianças</Text>
          <View style={styles.selectWrap}>
            <Picker
              selectedValue={criancas}
              onValueChange={(v) => setCriancas(Number(v))}
              style={styles.picker}
              dropdownIconColor="#fff"
            >
              {Array.from({ length: 10 }, (_, i) => i).map((n) => (
                <Picker.Item key={n} label={String(n)} value={n} />
              ))}
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <Pressable
        style={[
          styles.button,
          (!canSearch || searching) && styles.buttonDisabled,
        ]}
        disabled={!canSearch || searching}
        onPress={handleSearch}
      >
        {searching ? (
          <View style={styles.buttonLoading}>
            <ActivityIndicator color="#fff" />
            <Text style={styles.buttonText}>Buscando passagens...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Pesquisar</Text>
        )}
      </Pressable>

      {searchError ? (
        <Text style={styles.errorMessage}>{searchError}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(15, 30, 15, 0.85)',
    borderRadius: 20,
    padding: 6,
    width: 342,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  fieldWrapper: { position: 'relative' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  rowBottom: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, fontSize: 15, color: 'rgba(255,255,255,0.95)', padding: 0 },
  pill: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    flex: 1,
  },
  pillLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 13 },
  pillDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  pillViajantes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    flex: 1,
  },
  viajantesLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    flex: 1,
  },
  dateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    minHeight: 22,
  },
  dateValue: { fontSize: 14, color: 'rgba(255,255,255,0.95)' },
  datePlaceholder: { fontSize: 14, color: 'rgba(255,255,255,0.45)' },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: 6,
  },
  selectWrap: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    minWidth: 70,
  },
  picker: { color: '#fff', height: 40, width: 90 },
  suggestions: {
    position: 'absolute',
    top: '100%',
    left: 6,
    right: 6,
    marginTop: 4,
    padding: 6,
    backgroundColor: 'rgba(15,30,15,0.98)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    zIndex: 20,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  suggestionIata: {
    width: 44,
    fontWeight: '700',
    fontSize: 13,
    color: '#a3e635',
    backgroundColor: 'rgba(163,230,53,0.12)',
    borderRadius: 6,
    textAlign: 'center',
    paddingVertical: 6,
    overflow: 'hidden',
  },
  suggestionMain: { fontSize: 14, color: 'rgba(255,255,255,0.95)', fontWeight: '500' },
  suggestionSub: { fontSize: 12, color: 'rgba(255,255,255,0.55)' },
  suggestionEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
  },
  suggestionEmptyText: { fontSize: 13, color: 'rgba(255,255,255,0.55)' },
  button: {
    paddingVertical: 15,
    backgroundColor: '#2d5a2d',
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: { backgroundColor: '#3a3a3a', opacity: 0.6 },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  buttonLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  errorMessage: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#ffb4b4',
    backgroundColor: 'rgba(220,80,80,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(220,80,80,0.35)',
    borderRadius: 10,
    textAlign: 'center',
  },
});
