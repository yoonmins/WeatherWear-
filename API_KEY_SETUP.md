# API 키 설정 가이드 🔐

## ⚠️ 중요: API 키 보안

**절대 API 키를 코드에 직접 작성하지 마세요!**
모든 API 키는 반드시 `.env` 파일에 저장해야 합니다.

## 현재 보안 설정 상태 ✅

### 1. .env 파일은 Git에서 제외됨
`.gitignore` 파일에 다음 항목들이 포함되어 있어 API 키가 GitHub에 업로드되지 않습니다:

```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env.*.local
```

### 2. .env.example 파일은 포함됨
팀원들이 참고할 수 있도록 `.env.example` 파일은 Git에 포함됩니다.
(실제 키 값이 아닌 템플릿만 포함)

---

## 🔑 OpenWeatherMap API 키 발급 방법

### 1단계: 계정 생성
1. [OpenWeatherMap](https://openweathermap.org/api) 접속
2. 우측 상단 "Sign In" 클릭
3. "Create an Account" 선택
4. 이메일, 비밀번호 입력 후 가입

### 2단계: API 키 발급
1. 로그인 후 "API keys" 메뉴 클릭
2. "Key name"에 원하는 이름 입력 (예: WeatherWear)
3. "Generate" 버튼 클릭
4. 생성된 API 키 복사

### 3단계: .env 파일에 추가

**backend/.env 파일 열기:**
```bash
cd backend
# 에디터로 .env 파일 열기
code .env
# 또는
vim .env
```

**API 키 입력:**
```bash
PORT=5000
NODE_ENV=development

# OpenWeatherMap API Key
# https://openweathermap.org/api 에서 발급받으세요
WEATHER_API_KEY=여기에_발급받은_실제_키_입력
```

**예시:**
```bash
WEATHER_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 4단계: 서버 재시작
```bash
# 개발 서버가 실행 중이라면 Ctrl+C로 중지 후
npm start
```

---

## 무료 플랜 제한사항

| 항목 | 제한 |
|-----|------|
| 분당 요청 | 60회 |
| 일일 요청 | 1,000,000회 |
| 사용 가능 API | 현재 날씨, 5일 예보 |
| 활성화 시간 | 발급 후 10분-2시간 |

⚠️ **주의**: API 키 발급 후 실제로 사용 가능해지기까지 최대 2시간이 걸릴 수 있습니다.

---

## ✅ 올바른 사용법

### ✅ 좋은 예시 (환경 변수 사용)

**backend/services/weatherService.js:**
```javascript
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;  // ✅ 올바름!
```

**backend/.env:**
```bash
WEATHER_API_KEY=a1b2c3d4e5f6g7h8i9j0  # ✅ 올바름!
```

---

## ❌ 잘못된 사용법

### ❌ 나쁜 예시 (코드에 직접 입력)

```javascript
// ❌ 절대 이렇게 하지 마세요!
const WEATHER_API_KEY = 'a1b2c3d4e5f6g7h8i9j0';
```

```javascript
// ❌ 이것도 안됩니다!
const apiKey = 'my-secret-key';
```

### 왜 나쁜가요?
- Git에 커밋되면 API 키가 공개됩니다
- 누구나 당신의 API 키를 사용할 수 있습니다
- API 한도 초과, 요금 청구 등의 문제 발생
- 보안 취약점이 됩니다

---

## 🧪 API 키 테스트

### 1. 직접 테스트
```bash
# 서버 실행 후
curl http://localhost:5000/api/weather/city/Seoul
```

### 2. 예상 응답 (성공)
```json
{
  "success": true,
  "data": {
    "location": {
      "name": "Seoul",
      "country": "KR"
    },
    "temperature": {
      "current": 15
    }
  }
}
```

### 3. 예상 응답 (실패)
```json
{
  "success": false,
  "error": "유효하지 않은 API 키입니다. WEATHER_API_KEY를 확인하세요."
}
```

---

## 🔧 트러블슈팅

### 문제 1: "WEATHER_API_KEY가 설정되지 않았습니다"
**원인**: `.env` 파일에 키가 없거나 오타가 있습니다.

**해결방법:**
```bash
# 1. .env 파일 확인
cat backend/.env

# 2. WEATHER_API_KEY가 있는지 확인
# 3. 오타가 없는지 확인 (공백, 따옴표 등)
# 4. 서버 재시작
```

---

### 문제 2: "유효하지 않은 API 키입니다"
**원인**: API 키가 잘못되었거나 아직 활성화되지 않았습니다.

**해결방법:**
```bash
# 1. OpenWeatherMap 사이트에서 키 확인
# 2. 키를 복사해서 .env에 다시 붙여넣기
# 3. 발급 후 2시간 정도 기다리기
# 4. 서버 재시작
```

---

### 문제 3: ".env 파일을 읽을 수 없습니다"
**원인**: .env 파일 위치가 잘못되었습니다.

**해결방법:**
```bash
# .env 파일은 backend/ 폴더 안에 있어야 합니다
WeatherWear-/
└── backend/
    └── .env  ← 여기!
```

---

## 📚 다른 API 키 추가하기

앞으로 다른 API를 사용하게 되면 같은 방식으로 추가하세요.

### 예시: Google Maps API 추가

**backend/.env:**
```bash
PORT=5000
NODE_ENV=development

# OpenWeatherMap API Key
WEATHER_API_KEY=your_weather_api_key

# Google Maps API Key
GOOGLE_MAPS_API_KEY=your_google_maps_key

# Database
DATABASE_URL=your_database_url
```

**backend/.env.example:**
```bash
PORT=5000
NODE_ENV=development

# OpenWeatherMap API Key
WEATHER_API_KEY=your_weather_api_key

# Google Maps API Key (선택사항)
GOOGLE_MAPS_API_KEY=your_google_maps_key

# Database (선택사항)
DATABASE_URL=your_database_url
```

---

## ✅ 보안 체크리스트

프로젝트 시작 전 반드시 확인하세요:

- [ ] `.env` 파일이 `.gitignore`에 포함되어 있나요?
- [ ] `.env.example` 파일에는 실제 키가 없나요?
- [ ] 코드에 API 키를 직접 입력하지 않았나요?
- [ ] `process.env.변수명` 형태로 환경 변수를 사용하나요?
- [ ] Git 커밋 전에 `.env` 파일이 제외되었는지 확인했나요?

```bash
# Git 상태 확인
git status

# .env 파일이 표시되면 안됩니다!
```

---

## 📞 도움이 필요하신가요?

1. 프로젝트 README.md 참고
2. backend/services/README.md 참고
3. OpenWeatherMap 공식 문서: https://openweathermap.org/api
4. GitHub Issues에 질문 남기기

---

**기억하세요: API 키는 비밀번호처럼 안전하게 보관해야 합니다! 🔒**
