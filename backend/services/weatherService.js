const axios = require('axios');

/**
 * 날씨 API 서비스
 * OpenWeatherMap API를 사용하여 날씨 정보를 가져옵니다
 */

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

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

    const response = await axios.get(`${WEATHER_API_BASE_URL}/weather`, {
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

    const response = await axios.get(`${WEATHER_API_BASE_URL}/weather`, {
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

    const response = await axios.get(`${WEATHER_API_BASE_URL}/forecast`, {
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
  if (temperature >= 28) {
    return {
      category: '매우 더움',
      recommendation: ['민소매', '반팔', '반바지', '원피스', '샌들'],
      advice: '가볍고 시원한 옷을 착용하세요. 자외선 차단에 신경쓰세요.'
    };
  } else if (temperature >= 23) {
    return {
      category: '더움',
      recommendation: ['반팔', '얇은 셔츠', '반바지', '면바지', '운동화'],
      advice: '통풍이 잘 되는 옷을 선택하세요.'
    };
  } else if (temperature >= 20) {
    return {
      category: '약간 더움',
      recommendation: ['얇은 가디건', '긴팔', '면바지', '청바지'],
      advice: '일교차에 대비해 얇은 겉옷을 챙기세요.'
    };
  } else if (temperature >= 17) {
    return {
      category: '선선함',
      recommendation: ['가디건', '니트', '맨투맨', '청바지', '면바지'],
      advice: '가볍게 걸칠 수 있는 옷을 준비하세요.'
    };
  } else if (temperature >= 12) {
    return {
      category: '쌀쌀함',
      recommendation: ['자켓', '가디건', '청바지', '면바지', '스니커즈'],
      advice: '가을 느낌의 따뜻한 옷차림이 좋습니다.'
    };
  } else if (temperature >= 9) {
    return {
      category: '추움',
      recommendation: ['트렌치 코트', '야상', '니트', '청바지', '스니커즈'],
      advice: '아우터를 꼭 챙기세요.'
    };
  } else if (temperature >= 5) {
    return {
      category: '매우 추움',
      recommendation: ['코트', '가죽 자켓', '히트텍', '니트', '목도리'],
      advice: '따뜻한 겨울 옷을 착용하세요.'
    };
  } else {
    return {
      category: '한파',
      recommendation: ['패딩', '두꺼운 코트', '목도리', '장갑', '방한화'],
      advice: '최대한 두껍게 입고 외출을 자제하세요.'
    };
  }
}

module.exports = {
  getCurrentWeatherByCity,
  getCurrentWeatherByCoords,
  getForecastByCity,
  getClothingRecommendation
};
