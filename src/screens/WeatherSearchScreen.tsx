import React, { useState } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { fetchWeatherByCity, OpenWeatherCurrent } from '../services/weatherApi';
import WeatherCard from '../components/WeatherCard';
import LoadingIndicator from '../components/LoadingIndicator';
import { useAuth } from '../contexts/AuthContext';

const WeatherSearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<OpenWeatherCurrent[]>([]);
  const [loading, setLoading] = useState(false);
  const { signOut } = useAuth();

  const onSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    Keyboard.dismiss();
    try {
      const data = await fetchWeatherByCity(query.trim());
      setResults([data]);
    } catch (err: any) {
      Alert.alert('Error', err?.message ?? 'Could not fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const onSignOut = async () => {
    try {
      await signOut();
    } catch (err: any) {
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TextInput
          style={styles.input}
          placeholder="Search city (e.g. London)"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={onSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchBtn} onPress={onSearch}><Text style={{ color: 'white' }}>Search</Text></TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signout} onPress={onSignOut}>
        <Text style={{ color: '#ef4444' }}>Sign out</Text>
      </TouchableOpacity>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <WeatherCard weather={item} />}
          ListEmptyComponent={<Text style={{ padding: 20, textAlign: 'center' }}>No results — search a city above</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', marginBottom: 8 },
  input: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8 },
  searchBtn: { marginLeft: 8, backgroundColor: '#06b6d4', padding: 12, borderRadius: 8, justifyContent: 'center' },
  signout: { alignSelf: 'flex-end', marginBottom: 8 },
});

export default WeatherSearchScreen;
