const axios = require('axios');

/**
 * 날씨 API 서비스
 * OpenWeatherMap API를 사용하여 날씨 정보를 가져옵니다
 */

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const { getClothesByTempRange } = require('../example/clother');
const axiosInstance = axios.create({
  baseURL: WEATHER_API_BASE_URL
});

/**
 * 도시 이름으로 현재 날씨 정보 가져오기
 * @param {string} city - 도시 이름 (예: "Seoul", "Busan")
 * @returns {Promise<Object>} 날씨 정보 객체
 */
async function getCurrentWeatherByCity(city) {
  try {
    if (!WEATHER_API_KEY) {
      throw new Error('WEATHER_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.');
    }

    const response = await axiosInstance.get('/weather', {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric', // 섭씨 온도
        lang: 'kr' // 한국어 설명
      }
    });

    return formatWeatherData(response.data);
  } catch (error) {
    handleWeatherApiError(error);
  }
}

/**
 * 위도/경도로 현재 날씨 정보 가져오기
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @returns {Promise<Object>} 날씨 정보 객체
 */
async function getCurrentWeatherByCoords(lat, lon) {
  try {
    if (!WEATHER_API_KEY) {
      throw new Error('WEATHER_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.');
    }

    const response = await axiosInstance.get('/weather', {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'kr'
      }
    });

    return formatWeatherData(response.data);
  } catch (error) {
    handleWeatherApiError(error);
  }
}

/**
 * 5일 날씨 예보 가져오기
 * @param {string} city - 도시 이름
 * @returns {Promise<Object>} 예보 정보 객체
 */
async function getForecastByCity(city) {
  try {
    if (!WEATHER_API_KEY) {
      throw new Error('WEATHER_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.');
    }

    const response = await axiosInstance.get('/forecast', {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'kr'
      }
    });

    return formatForecastData(response.data);
  } catch (error) {
    handleWeatherApiError(error);
  }
}

/**
 * 5일 날씨 예보 가져오기 (좌표)
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @returns {Promise<Object>} 예보 정보 객체
 */
async function getForecastByCoords(lat, lon) {
  try {
    if (!WEATHER_API_KEY) {
      throw new Error('WEATHER_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.');
    }

    const response = await axiosInstance.get('/forecast', {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'kr'
      }
    });

    return formatForecastData(response.data);
  } catch (error) {
    handleWeatherApiError(error);
  }
}

/**
 * 7일 일별 예보 가져오기 (One Call)
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @returns {Promise<Object>} 7일 예보
 */
async function getWeeklyForecastByCoords(lat, lon) {
  try {
    if (!WEATHER_API_KEY) {
      throw new Error('WEATHER_API_KEY가 설정되지 않았습니다. .env 파일을 확인하세요.');
    }

    const response = await axiosInstance.get('/onecall', {
      params: {
        lat,
        lon,
        exclude: 'current,minutely,hourly,alerts',
        appid: WEATHER_API_KEY,
        units: 'metric',
        lang: 'kr'
      }
    });

    return formatWeeklyForecastData(response.data);
  } catch (error) {
    handleWeatherApiError(error);
  }
}

/**
 * 날씨 데이터 포맷팅
 * @param {Object} data - API 응답 데이터
 * @returns {Object} 포맷된 날씨 정보
 */
function formatWeatherData(data) {
  return {
    location: {
      name: data.name,
      country: data.sys.country,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      }
    },
    weather: {
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    },
    temperature: {
      current: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max)
    },
    details: {
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      clouds: data.clouds.all,
      visibility: data.visibility
    },
    sun: {
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('ko-KR'),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('ko-KR')
    },
    timestamp: new Date(data.dt * 1000).toISOString()
  };
}

/**
 * 예보 데이터 포맷팅
 * @param {Object} data - API 응답 데이터
 * @returns {Object} 포맷된 예보 정보
 */
function formatForecastData(data) {
  return {
    location: {
      name: data.city.name,
      country: data.city.country,
      coordinates: {
        lat: data.city.coord.lat,
        lon: data.city.coord.lon
      }
    },
    forecasts: data.list.map(item => ({
      datetime: new Date(item.dt * 1000).toISOString(),
      temperature: {
        current: Math.round(item.main.temp),
        feelsLike: Math.round(item.main.feels_like),
        min: Math.round(item.main.temp_min),
        max: Math.round(item.main.temp_max)
      },
      weather: {
        main: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      },
      details: {
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        clouds: item.clouds.all,
        pop: Math.round(item.pop * 100) // 강수 확률 (%)
      }
    }))
  };
}

/**
 * 7일 일별 예보 데이터 포맷팅
 * @param {Object} data - One Call API 응답 데이터
 * @returns {Object} 포맷된 예보 정보
 */
function formatWeeklyForecastData(data) {
  return {
    timezone: data.timezone,
    daily: (data.daily || []).map(item => ({
      date: new Date(item.dt * 1000).toISOString(),
      temperature: {
        min: Math.round(item.temp.min),
        max: Math.round(item.temp.max),
        day: Math.round(item.temp.day),
        night: Math.round(item.temp.night)
      },
      weather: {
        main: item.weather[0].main,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
      },
      details: {
        humidity: item.humidity,
        windSpeed: item.wind_speed,
        clouds: item.clouds
      },
      pop: Math.round((item.pop || 0) * 100)
    }))
  };
}

/**
 * 5일(3시간 단위) 예보를 일별 요약으로 변환 (One Call 실패 시 사용)
 */
function buildDailySummaryFromForecast(forecastData) {
  const byDate = new Map();

  (forecastData.forecasts || []).forEach(item => {
    const dateKey = item.datetime.slice(0, 10); // YYYY-MM-DD
    const entry = byDate.get(dateKey) || {
      temps: [],
      hums: [],
      winds: [],
      pops: [],
      descriptions: {}
    };

    entry.temps.push(item.temperature.current, item.temperature.min, item.temperature.max);
    entry.hums.push(item.details.humidity);
    entry.winds.push(item.details.windSpeed);
    entry.pops.push(item.details.pop);

    const desc = item.weather.description;
    entry.descriptions[desc] = (entry.descriptions[desc] || 0) + 1;

    byDate.set(dateKey, entry);
  });

  const sorted = Array.from(byDate.entries()).sort(([a], [b]) => (a < b ? -1 : 1));
  return sorted.map(([date, entry]) => {
    const min = Math.round(Math.min(...entry.temps));
    const max = Math.round(Math.max(...entry.temps));
    const avg = Math.round((min + max) / 2);
    const avgPop = Math.round(
      entry.pops.reduce((sum, val) => sum + (Number.isFinite(val) ? val : 0), 0) / entry.pops.length
    );
    const avgWind = Number(
      (entry.winds.reduce((sum, val) => sum + (Number.isFinite(val) ? val : 0), 0) / entry.winds.length).toFixed(1)
    );
    const avgHum = Math.round(
      entry.hums.reduce((sum, val) => sum + (Number.isFinite(val) ? val : 0), 0) / entry.hums.length
    );
    const topDesc = Object.entries(entry.descriptions).sort((a, b) => b[1] - a[1])[0]?.[0];

    return {
      date,
      temperature: {
        min,
        max,
        day: avg,
        night: avg
      },
      weather: {
        main: topDesc || 'Forecast',
        description: topDesc || '예보 데이터 요약'
      },
      details: {
        humidity: avgHum,
        windSpeed: avgWind,
        clouds: null
      },
      pop: avgPop
    };
  });
}

/**
 * 날씨 API 에러 처리
 * @param {Error} error - 에러 객체
 */
function handleWeatherApiError(error) {
  if (error.response) {
    // API 응답이 있지만 에러 상태 코드
    const status = error.response.status;
    const message = error.response.data.message;

    switch (status) {
      case 401:
        throw new Error('유효하지 않은 API 키입니다. WEATHER_API_KEY를 확인하세요.');
      case 404:
        throw new Error('도시를 찾을 수 없습니다. 도시 이름을 확인하세요.');
      case 429:
        throw new Error('API 요청 한도를 초과했습니다. 잠시 후 다시 시도하세요.');
      default:
        throw new Error(`날씨 API 에러: ${message || '알 수 없는 오류'}`);
    }
  } else if (error.request) {
    // 요청은 보냈지만 응답이 없음
    throw new Error('날씨 API 서버에 연결할 수 없습니다. 네트워크를 확인하세요.');
  } else {
    // 그 외 에러
    throw new Error(`날씨 정보를 가져오는 중 오류가 발생했습니다: ${error.message}`);
  }
}

/**
 * 온도에 따른 옷차림 추천
 * @param {number} temperature - 온도 (섭씨)
 * @returns {Object} 옷차림 추천 정보
 */
function getClothingRecommendation(temperature) {
  // 기존 카테고리/텍스트 추천
  let base = {};
  if (temperature >= 28) {
    base = {
      category: '매우 더움',
      recommendation: ['민소매', '반팔', '반바지', '원피스', '샌들'],
      advice: '가볍고 시원한 옷을 착용하세요. 자외선 차단에 신경쓰세요.'
    };
  } else if (temperature >= 23) {
    base = {
      category: '더움',
      recommendation: ['반팔', '얇은 셔츠', '반바지', '면바지', '운동화'],
      advice: '통풍이 잘 되는 옷을 선택하세요.'
    };
  } else if (temperature >= 20) {
    base = {
      category: '약간 더움',
      recommendation: ['얇은 가디건', '긴팔', '면바지', '청바지'],
      advice: '일교차에 대비해 얇은 겉옷을 챙기세요.'
    };
  } else if (temperature >= 17) {
    base = {
      category: '선선함',
      recommendation: ['가디건', '니트', '맨투맨', '청바지', '면바지'],
      advice: '가볍게 걸칠 수 있는 옷을 준비하세요.'
    };
  } else if (temperature >= 12) {
    base = {
      category: '쌀쌀함',
      recommendation: ['자켓', '가디건', '청바지', '면바지', '스니커즈'],
      advice: '가을 느낌의 따뜻한 옷차림이 좋습니다.'
    };
  } else if (temperature >= 9) {
    base = {
      category: '추움',
      recommendation: ['트렌치 코트', '야상', '니트', '청바지', '스니커즈'],
      advice: '아우터를 꼭 챙기세요.'
    };
  } else if (temperature >= 5) {
    base = {
      category: '매우 추움',
      recommendation: ['코트', '가죽 자켓', '히트텍', '니트', '목도리'],
      advice: '따뜻한 겨울 옷을 착용하세요.'
    };
  } else {
    base = {
      category: '한파',
      recommendation: ['패딩', '두꺼운 코트', '목도리', '장갑', '방한화'],
      advice: '최대한 두껍게 입고 외출을 자제하세요.'
    };
  }

  // 🧥 이미지 기반 추천 → clothes.js(or clother.js) 호출
  const imageItems = getClothesByTempRange(temperature);

  // 테스트용 필드
  base.extra = '이 데이터는 테스트용으로 추가되었습니다.';

  return {
    ...base,
    images: imageItems // 이미지 배열 추가
  };
}

/**
 * 온도 + 날씨 조건을 함께 고려한 고급 옷차림 추천
 */
function getClothingRecommendationAdvanced({
  temperature,
  weatherMain,
  windSpeed = 0,
  humidity = 0,
  isNight = false
}) {
  // 기본 온도 기반 추천
  const base = getClothingRecommendation(temperature);

  const accessories = [];
  const tips = [];

  // 비 / 이슬비
  if (weatherMain === 'Rain' || weatherMain === 'Drizzle') {
    accessories.push('우산', '방수 재킷');
    tips.push('비 예보가 있으니 우산과 방수되는 아우터를 준비하세요.');
  }

  // 눈
  if (weatherMain === 'Snow') {
    accessories.push('방수 부츠', '두꺼운 양말');
    tips.push('눈길 미끄럼에 주의하세요.');
  }

  // 강풍
  if (windSpeed >= 8) {
    accessories.push('모자', '귀마개');
    tips.push('바람이 강해 체감 온도가 더 낮게 느껴집니다.');
  }

  // 높은 습도
  if (humidity >= 80 && temperature >= 24) {
    tips.push('습도가 높아 끈적거릴 수 있으니 통풍이 잘 되는 옷을 추천합니다.');
  }

  // 밤
  if (isNight) {
    tips.push('밤에는 일교차가 커서 체감이 더 춥습니다.');
  }

  const coldRisk = calculateColdRisk(temperature, windSpeed);

  return {
    ...base,
    riskLevel: coldRisk,
    accessories,
    extraTips: tips
  };
}

/**
 * 체감 추위 위험도 계산
 */
function calculateColdRisk(temperature, windSpeed) {
  const feels = temperature - windSpeed * 0.7;
  if (feels <= 0) return 'HIGH';
  if (feels <= 10) return 'MEDIUM';
  return 'LOW';
}

/**
 * 한국 주요 도시 목록
 */
const KOREAN_CITIES = [
  { name: 'Seoul', displayName: '서울', coords: { lat: 37.5665, lon: 126.9780 } },
  { name: 'Busan', displayName: '부산', coords: { lat: 35.1796, lon: 129.0756 } },
  { name: 'Incheon', displayName: '인천', coords: { lat: 37.4563, lon: 126.7052 } },
  { name: 'Daegu', displayName: '대구', coords: { lat: 35.8714, lon: 128.6014 } },
  { name: 'Daejeon', displayName: '대전', coords: { lat: 36.3504, lon: 127.3845 } },
  { name: 'Gwangju', displayName: '광주', coords: { lat: 35.1595, lon: 126.8526 } },
  { name: 'Ulsan', displayName: '울산', coords: { lat: 35.5384, lon: 129.3114 } },
  { name: 'Suwon', displayName: '수원', coords: { lat: 37.2636, lon: 127.0286 } },
  { name: 'Jeju', displayName: '제주', coords: { lat: 33.4996, lon: 126.5312 } },
  { name: 'Chuncheon', displayName: '춘천', coords: { lat: 37.8813, lon: 127.7298 } },
  { name: 'Gangneung', displayName: '강릉', coords: { lat: 37.7519, lon: 128.8761 } },
  { name: 'Sokcho', displayName: '속초', coords: { lat: 38.2070, lon: 128.5910 } },
  { name: 'Gyeongju', displayName: '경주', coords: { lat: 35.8562, lon: 129.2247 } },
  { name: 'Jeonju', displayName: '전주', coords: { lat: 35.8242, lon: 127.1480 } },
  { name: 'Yeosu', displayName: '여수', coords: { lat: 34.7604, lon: 127.6622 } },
  { name: 'Cheongju', displayName: '청주', coords: { lat: 36.6424, lon: 127.4890 } },
  { name: 'Pohang', displayName: '포항', coords: { lat: 36.0190, lon: 129.3435 } },
  { name: 'Andong', displayName: '안동', coords: { lat: 36.5684, lon: 128.7294 } }
];

/**
 * 한국 주요 도시 모두의 날씨 정보 가져오기
 * @returns {Promise<Array>} 모든 도시의 날씨 정보 배열
 */
async function getAllKoreanCitiesWeather() {
  try {
    const weatherPromises = KOREAN_CITIES.map(city =>
      getCurrentWeatherByCoords(city.coords.lat, city.coords.lon)
        .then(data => ({
          ...data,
          displayName: city.displayName,
          cityName: city.name,
          clothingRecommendation: getClothingRecommendation(data.temperature.current)
        }))
        .catch(error => ({
          cityName: city.name,
          displayName: city.displayName,
          error: error.message
        }))
    );

    const results = await Promise.all(weatherPromises);
    return results.filter(result => !result.error);
  } catch (error) {
    throw new Error(`한국 도시 날씨 정보를 가져오는 중 오류가 발생했습니다: ${error.message}`);
  }
}

/**
 * 도시 기준 7일치 예보 + 옷차림 추천
 * @param {string} city - 도시 이름 (영문)
 * @returns {Promise<Object>} 7일치 옷차림 플랜
 */
async function getWeeklyOutfitPlanByCity(city) {
  const matchedCity = KOREAN_CITIES.find(
    c => c.name.toLowerCase() === city.toLowerCase()
  );

  // 좌표 확보
  let coordinates = matchedCity?.coords;
  let displayName = matchedCity?.displayName || city;
  let cityName = matchedCity?.name || city;

  if (!coordinates) {
    const current = await getCurrentWeatherByCity(city);
    coordinates = current.location.coordinates;
    displayName = current.location.name;
    cityName = current.location.name;
  }

  let weekly = null;
  let fallbackUsed = false;

  try {
    weekly = await getWeeklyForecastByCoords(coordinates.lat, coordinates.lon);
  } catch (error) {
    const forecast = await getForecastByCity(cityName);
    const dailySummaries = buildDailySummaryFromForecast(forecast);
    weekly = {
      timezone: forecast.location?.country || 'KST',
      daily: dailySummaries
    };
    fallbackUsed = true;
  }

  if (!weekly?.daily?.length) {
    throw new Error('주간 예보 데이터를 불러오지 못했습니다.');
  }

  const days = weekly.daily.slice(0, 7).map(day => {
    const avgTemp = Math.round((day.temperature.min + day.temperature.max) / 2);
    return {
      ...day,
      averageTemperature: avgTemp,
      clothingRecommendation: getClothingRecommendation(avgTemp)
    };
  });

  return {
    cityName,
    displayName,
    coordinates,
    timezone: weekly.timezone,
    days,
    source: fallbackUsed ? 'forecast' : 'onecall'
  };
}

/**
 * 좌표 기준 7일치 예보 + 옷차림 추천
 * @param {number} lat
 * @param {number} lon
 */
async function getWeeklyOutfitPlanByCoords(lat, lon) {
  if (!lat || !lon) {
    throw new Error('위도/경도가 필요합니다.');
  }

  // 현재 날씨로 위치명 확보
  const current = await getCurrentWeatherByCoords(lat, lon);

  let weekly = null;
  let fallbackUsed = false;

  try {
    weekly = await getWeeklyForecastByCoords(lat, lon);
  } catch (error) {
    const forecast = await getForecastByCoords(lat, lon);
    const dailySummaries = buildDailySummaryFromForecast(forecast);
    weekly = {
      timezone: forecast.location?.country || 'KST',
      daily: dailySummaries
    };
    fallbackUsed = true;
  }

  if (!weekly?.daily?.length) {
    throw new Error('주간 예보 데이터를 불러오지 못했습니다.');
  }

  const days = weekly.daily.slice(0, 7).map(day => {
    const avgTemp = Math.round((day.temperature.min + day.temperature.max) / 2);
    return {
      ...day,
      averageTemperature: avgTemp,
      clothingRecommendation: getClothingRecommendation(avgTemp)
    };
  });

  return {
    cityName: current.location.name,
    displayName: current.location.name,
    coordinates: { lat, lon },
    timezone: weekly.timezone,
    days,
    source: fallbackUsed ? 'forecast' : 'onecall'
  };
}

module.exports = {
  getCurrentWeatherByCity,
  getCurrentWeatherByCoords,
  getForecastByCity,
  getForecastByCoords,
  getClothingRecommendation,
  getClothingRecommendationAdvanced,
  getAllKoreanCitiesWeather,
  getWeeklyForecastByCoords,
  getWeeklyOutfitPlanByCity,
  getWeeklyOutfitPlanByCoords,
  KOREAN_CITIES
};
