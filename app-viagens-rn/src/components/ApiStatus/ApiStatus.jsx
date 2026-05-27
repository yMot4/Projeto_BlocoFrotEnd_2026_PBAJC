import { useEffect, useState } from 'react';
import { View, Text, Pressable, Linking, StyleSheet } from 'react-native';

const HEALTH_URL =
  'https://travelagencyapi-a5zb.onrender.com/api/v1/providers/health';
const SWAGGER_URL =
  'https://travelagencyapi-a5zb.onrender.com/swagger/index.html';
const POLL_MS = 30000;
const TIMEOUT_MS = 15000;

const STATUS = {
  loading: { color: '#f5b301', text: 'Por favor aguarde, conectando à API...' },
  online: { color: '#3ec46d', text: 'API online' },
  offline: { color: '#e15050', text: 'API offline' },
};

export default function ApiStatus() {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    const ping = async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      try {
        const res = await fetch(HEALTH_URL, { signal: controller.signal });
        if (!cancelled) setStatus(res.ok ? 'online' : 'offline');
      } catch {
        if (!cancelled) setStatus('offline');
      } finally {
        clearTimeout(timer);
      }
    };

    ping();
    const interval = setInterval(ping, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const { color, text } = STATUS[status];

  const content = (
    <View style={styles.container}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.label}>{text}</Text>
    </View>
  );

  if (status === 'online') {
    return (
      <Pressable onPress={() => Linking.openURL(SWAGGER_URL)}>
        {content}
      </Pressable>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  dot: { width: 10, height: 10, borderRadius: 5 },
  label: { color: '#fff', fontSize: 12, fontWeight: '500' },
});
