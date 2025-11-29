import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { OpenWeatherCurrent } from '../services/weatherApi';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const iconUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

const WeatherCard: React.FC<{ weather: OpenWeatherCurrent }> = ({ weather }) => {
  const [expanded, setExpanded] = useState(false);
  const w = weather.weather[0];

  return (
    <Animatable.View animation="fadeInUp" duration={350} style={styles.card}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setExpanded((s) => !s)}>
        <View style={styles.row}>
          <View>
            <Text style={styles.city}>{weather.name}{weather.sys?.country ? `, ${weather.sys.country}` : ''}</Text>
            <Text style={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
          </View>

          <View style={styles.right}>
            <Image source={{ uri: iconUrl(w.icon) }} style={{ width: 64, height: 64 }} />
          </View>
        </View>

        {expanded && (
          <Animatable.View animation="fadeIn" duration={250} style={styles.expanded}>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="water" size={20} />
              <Text style={styles.detailText}>Humidity: {weather.main.humidity}%</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="weather-windy" size={20} />
              <Text style={styles.detailText}>Wind: {weather.wind.speed} m/s</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="gauge" size={20} />
              <Text style={styles.detailText}>Pressure: {weather.main.pressure} hPa</Text>
            </View>
            <View style={styles.detailRow}>
              <MaterialCommunityIcons name="information-outline" size={20} />
              <Text style={styles.detailText}>Condition: {w.description}</Text>
            </View>
          </Animatable.View>
        )}
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: { marginVertical: 8, padding: 12, borderRadius: 10, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e6eef7' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  city: { fontSize: 18, fontWeight: '700' },
  temp: { fontSize: 16, color: '#0369a1', marginTop: 4 },
  right: { alignItems: 'center' },
  expanded: { marginTop: 12, borderTopWidth: 1, borderTopColor: '#e6eef7', paddingTop: 8 },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  detailText: { marginLeft: 8 },
});

export default WeatherCard;
