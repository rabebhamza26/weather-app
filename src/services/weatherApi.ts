import axios from 'axios';

const OPENWEATHER_API_KEY = "demo_key_replace_with_yours"; // You can get a free one from openweathermap.org

export type OpenWeatherCurrent = {
  id: number;
  name: string;
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_min?: number;
    temp_max?: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg?: number;
  };
  sys?: {
    country?: string;
  };
};

const BASE = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeatherByCity(city: string): Promise<OpenWeatherCurrent> {
  const apiKey = OPENWEATHER_API_KEY;
  
  if (!apiKey || apiKey === "demo_key_replace_with_yours") {
    // Return mock data for testing
    return Promise.resolve({
      id: 2643743,
      name: city,
      dt: Date.now() / 1000,
      main: {
        temp: 15,
        feels_like: 14,
        humidity: 65,
        pressure: 1015,
        temp_min: 13,
        temp_max: 17
      },
      weather: [{
        id: 801,
        main: "Clouds",
        description: "few clouds",
        icon: "02d"
      }],
      wind: {
        speed: 3.6,
        deg: 200
      },
      sys: {
        country: "GB"
      }
    });
  }
  
  try {
    const url = `${BASE}/weather`;
    const resp = await axios.get(url, { 
      params: { 
        q: city, 
        appid: apiKey, 
        units: 'metric' 
      } 
    });
    
    if (resp.status !== 200) {
      throw new Error(`API returned status ${resp.status}`);
    }
    
    return resp.data as OpenWeatherCurrent;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error?.message ?? 'Failed to fetch weather data');
  }
}