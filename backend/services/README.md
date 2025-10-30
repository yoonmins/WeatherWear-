# Weather API Service 사용 가이드

## 개요
OpenWeatherMap API를 사용하여 날씨 정보를 가져오고, 온도에 따른 옷차림을 추천하는 서비스입니다.

## 설정 방법

### 1. API 키 발급
1. [OpenWeatherMap](https://openweathermap.org/api) 접속
2. 무료 계정 생성
3. API Keys 메뉴에서 키 발급
4. 발급받은 키를 `.env` 파일에 추가

```bash
WEATHER_API_KEY=your_actual_api_key_here
```

### 2. 무료 플랜 제한사항
- 1분당 60회 요청
- 1일 1,000,000회 요청
- 현재 날씨 및 5일 예보 사용 가능

## API 엔드포인트

### 1. 도시 이름으로 현재 날씨 조회
```http
GET /api/weather/city/:city
```

**예시:**
```bash
curl http://localhost:5000/api/weather/city/Seoul
```

**응답:**
```json
{
  "success": true,
  "data": {
    "location": {
      "name": "Seoul",
      "country": "KR",
      "coordinates": {
        "lat": 37.5683,
        "lon": 126.9778
      }
    },
    "weather": {
      "main": "Clear",
      "description": "맑음",
      "icon": "01d",
      "iconUrl": "https://openweathermap.org/img/wn/01d@2x.png"
    },
    "temperature": {
      "current": 15,
      "feelsLike": 14,
      "min": 12,
      "max": 18
    },
    "details": {
      "humidity": 65,
      "pressure": 1013,
      "windSpeed": 3.5,
      "windDirection": 180,
      "clouds": 10,
      "visibility": 10000
    },
    "clothingRecommendation": {
      "category": "쌀쌀함",
      "recommendation": ["자켓", "가디건", "청바지", "면바지", "스니커즈"],
      "advice": "가을 느낌의 따뜻한 옷차림이 좋습니다."
    }
  }
}
```

### 2. 위도/경도로 현재 날씨 조회
```http
GET /api/weather/coords?lat=37.5683&lon=126.9778
```

**예시:**
```bash
curl "http://localhost:5000/api/weather/coords?lat=37.5683&lon=126.9778"
```

### 3. 5일 날씨 예보 조회
```http
GET /api/weather/forecast/:city
```

**예시:**
```bash
curl http://localhost:5000/api/weather/forecast/Seoul
```

**응답:**
```json
{
  "success": true,
  "data": {
    "location": {
      "name": "Seoul",
      "country": "KR"
    },
    "forecasts": [
      {
        "datetime": "2024-10-30T12:00:00.000Z",
        "temperature": {
          "current": 16,
          "feelsLike": 15,
          "min": 14,
          "max": 18
        },
        "weather": {
          "main": "Clear",
          "description": "맑음",
          "icon": "01d"
        },
        "details": {
          "humidity": 60,
          "windSpeed": 2.5,
          "clouds": 5,
          "pop": 10
        }
      }
    ]
  }
}
```

### 4. 온도별 옷차림 추천
```http
GET /api/weather/recommendation?temperature=15
```

**예시:**
```bash
curl "http://localhost:5000/api/weather/recommendation?temperature=15"
```

**응답:**
```json
{
  "success": true,
  "data": {
    "category": "쌀쌀함",
    "recommendation": ["자켓", "가디건", "청바지", "면바지", "스니커즈"],
    "advice": "가을 느낌의 따뜻한 옷차림이 좋습니다."
  }
}
```

## 온도별 옷차림 가이드

| 온도 범위 | 카테고리 | 추천 아이템 |
|----------|---------|-----------|
| 28°C 이상 | 매우 더움 | 민소매, 반팔, 반바지, 원피스, 샌들 |
| 23-27°C | 더움 | 반팔, 얇은 셔츠, 반바지, 면바지 |
| 20-22°C | 약간 더움 | 얇은 가디건, 긴팔, 면바지, 청바지 |
| 17-19°C | 선선함 | 가디건, 니트, 맨투맨, 청바지 |
| 12-16°C | 쌀쌀함 | 자켓, 가디건, 청바지, 면바지 |
| 9-11°C | 추움 | 트렌치 코트, 야상, 니트, 청바지 |
| 5-8°C | 매우 추움 | 코트, 가죽 자켓, 히트텍, 목도리 |
| 4°C 이하 | 한파 | 패딩, 두꺼운 코트, 목도리, 장갑 |

## 코드에서 사용하기

### 서비스 직접 사용
```javascript
const { weatherService } = require('./services');

// 도시 이름으로 날씨 조회
const weather = await weatherService.getCurrentWeatherByCity('Seoul');

// 위도/경도로 날씨 조회
const weather = await weatherService.getCurrentWeatherByCoords(37.5683, 126.9778);

// 예보 조회
const forecast = await weatherService.getForecastByCity('Seoul');

// 옷차림 추천
const recommendation = weatherService.getClothingRecommendation(15);
```

## 주요 도시 목록

### 한국
- Seoul (서울)
- Busan (부산)
- Incheon (인천)
- Daegu (대구)
- Daejeon (대전)
- Gwangju (광주)
- Ulsan (울산)
- Jeju (제주)

### 영문 이름 사용 필수
API 요청 시 반드시 영문 도시명을 사용해야 합니다.

## 에러 처리

### 일반적인 에러
```json
{
  "success": false,
  "error": "도시를 찾을 수 없습니다. 도시 이름을 확인하세요."
}
```

### 에러 종류
- **401**: 유효하지 않은 API 키
- **404**: 도시를 찾을 수 없음
- **429**: API 요청 한도 초과
- **500**: 서버 오류

## 테스트

### Postman으로 테스트
1. GET 요청 생성
2. URL: `http://localhost:5000/api/weather/city/Seoul`
3. Send 클릭

### cURL로 테스트
```bash
# 현재 날씨
curl http://localhost:5000/api/weather/city/Seoul

# 좌표로 조회
curl "http://localhost:5000/api/weather/coords?lat=37.5683&lon=126.9778"

# 예보
curl http://localhost:5000/api/weather/forecast/Seoul

# 옷차림 추천
curl "http://localhost:5000/api/weather/recommendation?temperature=20"
```

## 주의사항

1. **API 키 보안**: `.env` 파일을 절대 Git에 커밋하지 마세요
2. **요청 제한**: 무료 플랜의 요청 한도를 주의하세요
3. **도시 이름**: 영문으로 정확히 입력하세요
4. **에러 처리**: 프론트엔드에서 적절한 에러 처리를 구현하세요

## 다음 단계

- [ ] 캐싱 구현 (Redis)
- [ ] 요청 제한 미들웨어 추가
- [ ] 더 많은 날씨 정보 추가 (UV 지수, 공기 질 등)
- [ ] 사용자 위치 기반 자동 날씨 조회
- [ ] 알림 기능 추가
