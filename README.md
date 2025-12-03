# WeatherWear 🍀
날씨 기반 옷 추천 서비스

날씨 정보를 바탕으로 사용자에게 적절한 옷차림을 추천하는 웹 애플리케이션입니다.

---

## 📋 목차
- [주요 기능](#-주요-기능)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [기술 스택](#-기술-스택)
- [설치 방법](#-설치-방법)
- [실행 방법](#-실행-방법)
- [환경 변수 설정](#-환경-변수-설정)
- [보안 수칙](#-보안-수칙)
- [API 문서](#-api-문서)
- [개발 가이드](#-개발-가이드)
- [트러블슈팅](#-트러블슈팅)

---

## ✨ 주요 기능
- 국내 주요 15+ 도시 실시간 날씨 표시 및 지도 마커 색상(온도 구간) 매핑
- 도시 클릭 시 당일 상세 + 일주일치 옷차림을 하나의 카드에서 확인
- 현재 위치 기반 주간 옷차림 자동 추천, 도시 선택 시 해당 도시 기준으로 즉시 전환
- One Call 7일 예보 우선, 실패 시 5일 예보를 일별로 요약해 fallback
- 강수 확률/풍속을 카테고리 옆 배지로 표시, 추천 이미지·아이템은 무작위 섞기

## 🚀 시작하기

### 필수 요구사항
다음 프로그램들이 설치되어 있어야 합니다:

- **Node.js**: v16.0.0 이상 (권장: v18 LTS)
- **npm**: v8.0.0 이상
- **Git**: 최신 버전

### 빠른 시작 (5분 안에 실행하기)

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/WeatherWear-.git
cd WeatherWear-

# 2. 모든 의존성 설치 (백엔드 + 프론트엔드)
npm run install-all

# 3. 환경 변수 설정
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 4. 개발 서버 실행 (백엔드 + 프론트엔드 동시 실행)
npm start
```

✅ 완료! 브라우저에서 http://localhost:3000 접속

---

## 📁 프로젝트 구조

```
WeatherWear-/
│
├── backend/                # Express 백엔드 서버
│   ├── server.js          # 서버 진입점
│   ├── package.json       # 백엔드 의존성
│   ├── .env               # 백엔드 환경 변수 (git ignore)
│   └── .env.example       # 환경 변수 템플릿
│
├── frontend/              # React 프론트엔드
│   ├── src/              # 소스 코드
│   │   ├── App.js        # 메인 앱 컴포넌트
│   │   └── index.js      # 진입점
│   ├── public/           # 정적 파일
│   ├── package.json      # 프론트엔드 의존성
│   ├── .env              # 프론트엔드 환경 변수 (git ignore)
│   └── .env.example      # 환경 변수 템플릿
│
├── package.json          # 루트 패키지 (스크립트 관리)
├── .gitignore            # Git 제외 파일 목록
└── README.md             # 프로젝트 문서
```

---

## 🛠 기술 스택

### Backend
| 기술 | 버전 | 용도 |
|------|------|------|
| **Node.js** | v18+ | JavaScript 런타임 |
| **Express** | v4.18+ | 웹 서버 프레임워크 |
| **CORS** | v2.8+ | Cross-Origin Resource Sharing |
| **Helmet** | v7.1+ | 보안 헤더 설정 |
| **Morgan** | v1.10+ | HTTP 요청 로깅 |
| **dotenv** | v16.3+ | 환경 변수 관리 |

### Frontend
| 기술 | 버전 | 용도 |
|------|------|------|
| **React** | v19.2+ | UI 라이브러리 |
| **React DOM** | v19.2+ | React 렌더링 |
| **React Scripts** | v5.0+ | CRA 빌드 도구 |

### DevOps
| 기술 | 용도 |
|------|------|
| **Concurrently** | 동시 스크립트 실행 |
| **Nodemon** | 백엔드 자동 재시작 |

---

## 📦 설치 방법

### 방법 1: 전체 자동 설치 (권장)
```bash
npm run install-all
```
> 루트, 백엔드, 프론트엔드의 모든 의존성을 한 번에 설치합니다.

### 방법 2: 개별 설치
```bash
# 1. 루트 의존성 (concurrently)
npm install

# 2. 백엔드 의존성
cd backend
npm install
cd ..

# 3. 프론트엔드 의존성
cd frontend
npm install
cd ..
```

### 설치 확인
```bash
# Node.js 버전 확인
node --version  # v16.0.0 이상이어야 함

# npm 버전 확인
npm --version   # v8.0.0 이상이어야 함
```

---

## ▶️ 실행 방법

### 개발 모드

#### 옵션 1: 동시 실행 (권장)
```bash
npm start
```
- 백엔드 서버: http://localhost:5000
- 프론트엔드 앱: http://localhost:3000
- 백엔드와 프론트엔드가 동시에 실행됩니다
- 코드 변경 시 자동으로 재시작됩니다

#### 옵션 2: 개별 실행
**터미널 1 - 백엔드**
```bash
npm run server
# 또는
cd backend && npm run dev
```

**터미널 2 - 프론트엔드**
```bash
npm run client
# 또는
cd frontend && npm start
```

### 프로덕션 모드

#### 빌드
```bash
# 프론트엔드 빌드
npm run build

# 빌드 결과물은 frontend/build/ 에 생성됩니다
```

#### 프로덕션 서버 실행
```bash
cd backend
NODE_ENV=production npm start
```

---

## 🔐 환경 변수 설정

### Backend 환경 변수 (`backend/.env`)

```bash
# 서버 포트
PORT=5000

# 환경 모드 (development, production, test)
NODE_ENV=development

# OpenWeather API 키 (필수)
WEATHER_API_KEY=your_openweather_api_key
```

**설정 방법:**
```bash
cp backend/.env.example backend/.env
# 에디터로 backend/.env 파일을 열어 필요한 값을 수정하세요
```

### Frontend 환경 변수 (`frontend/.env`)

```bash
# 백엔드 API URL
REACT_APP_API_URL=http://localhost:5000/api

# 네이버 지도 클라이언트 ID (필수)
REACT_APP_NAVER_MAP_CLIENT_ID=your_naver_map_client_id
```

**설정 방법:**
```bash
cp frontend/.env.example frontend/.env
# 에디터로 frontend/.env 파일을 열어 필요한 값을 수정하세요
```

> ⚠️ **중요**: `.env` 파일은 절대 Git에 커밋하지 마세요! (이미 .gitignore에 포함됨)

---

## 🛡 보안 수칙

- API 키·비밀번호 등 비밀 값은 **반드시 `.env`** 에만 보관하고 Git에 올리지 않습니다.
- `WEATHER_API_KEY`, `REACT_APP_NAVER_MAP_CLIENT_ID`는 로컬 `.env`에서만 관리하고 배포 시 비밀 저장소를 사용하세요.
- 인증서/키 파일(`*.pem`, `*.key`, `*.pfx` 등)과 데이터베이스 파일(`*.sqlite` 등)은 `.gitignore`에 추가되어 있습니다.
- 개인 테스트 파일이나 로그(`*.log`, `coverage/`, `build/`)는 커밋하지 않습니다.

---

## 📚 API 문서

### Base URL
```
http://localhost:5000/api
```

### 엔드포인트

#### 1. 헬스 체크
서버 상태를 확인합니다.

```http
GET /api/health
```

**응답 예시:**
```json
{
  "status": "ok",
  "message": "WeatherWear API is running"
}
```

#### 2. 기본 API
API 환영 메시지를 반환합니다.

```http
GET /api
```

**응답 예시:**
```json
{
  "message": "Welcome to WeatherWear API"
}
```

### 에러 응답

#### 404 Not Found
```json
{
  "error": "Route not found"
}
```

#### 500 Internal Server Error
```json
{
  "error": "Something went wrong!"
}
```

---

## 👨‍💻 개발 가이드

### 새로운 API 엔드포인트 추가

1. `backend/server.js` 파일을 엽니다
2. 기존 라우트 아래에 새로운 라우트를 추가합니다:

```javascript
// 예: 날씨 정보 가져오기
app.get('/api/weather', (req, res) => {
  res.json({
    temperature: 22,
    condition: 'sunny'
  });
});
```

3. 서버가 자동으로 재시작됩니다 (nodemon 사용 중)

### 새로운 React 컴포넌트 추가

1. `frontend/src/components/` 디렉토리에 새 파일 생성
2. 컴포넌트 작성:

```jsx
// frontend/src/components/WeatherCard.js
function WeatherCard({ temperature, condition }) {
  return (
    <div className="weather-card">
      <h2>{temperature}°C</h2>
      <p>{condition}</p>
    </div>
  );
}

export default WeatherCard;
```

3. `App.js`에서 import하여 사용

### 백엔드 API 호출하기

프론트엔드에서 백엔드 API를 호출할 때는 상대 경로를 사용하세요 (프록시 설정됨):

```javascript
// ✅ 올바른 방법
fetch('/api/weather')
  .then(res => res.json())
  .then(data => console.log(data));

// ❌ 잘못된 방법 (절대 경로 사용하지 마세요)
fetch('http://localhost:5000/api/weather')
```

### 코드 스타일

- **들여쓰기**: 2칸 스페이스
- **따옴표**: 작은따옴표 사용
- **세미콜론**: 사용

---

## 🐛 트러블슈팅

### 문제 1: 포트가 이미 사용 중입니다
```
Error: listen EADDRINUSE: address already in use :::5000
```

**해결방법:**
```bash
# macOS/Linux
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID번호> /F
```

또는 `.env` 파일에서 포트 번호를 변경하세요.

---

### 문제 2: npm install 실패
```
npm ERR! code ELIFECYCLE
```

**해결방법:**
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
rm -rf backend/node_modules backend/package-lock.json
rm -rf frontend/node_modules frontend/package-lock.json

npm run install-all
```

---

### 문제 3: 프록시 연결 실패
```
Proxy error: Could not proxy request
```

**해결방법:**
1. 백엔드 서버가 실행 중인지 확인
2. `frontend/package.json`의 proxy 설정 확인:
```json
"proxy": "http://localhost:5000"
```
3. 포트 번호가 `backend/.env`의 PORT와 일치하는지 확인

---

### 문제 4: CORS 에러
```
Access to fetch has been blocked by CORS policy
```

**해결방법:**
- 백엔드에 이미 CORS가 설정되어 있습니다
- 프록시를 사용하세요 (상대 경로로 API 호출)
- 프론트엔드와 백엔드를 모두 실행했는지 확인하세요

---

## 📝 사용 가능한 스크립트

### 루트 디렉토리
| 명령어 | 설명 |
|--------|------|
| `npm start` | 백엔드 + 프론트엔드 동시 실행 |
| `npm run server` | 백엔드만 실행 (개발 모드) |
| `npm run client` | 프론트엔드만 실행 |
| `npm run build` | 프론트엔드 프로덕션 빌드 |
| `npm run install-all` | 모든 의존성 설치 |
| `npm test` | 모든 테스트 실행 |

### Backend 디렉토리
| 명령어 | 설명 |
|--------|------|
| `npm start` | 프로덕션 모드 실행 |
| `npm run dev` | 개발 모드 실행 (nodemon) |
| `npm test` | 백엔드 테스트 실행 |

### Frontend 디렉토리
| 명령어 | 설명 |
|--------|------|
| `npm start` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm test` | 프론트엔드 테스트 실행 |
| `npm run eject` | CRA 설정 추출 (⚠️ 되돌릴 수 없음!) |

---

## 🚀 Vercel 배포 가이드

### 사전 준비

1. **Vercel 계정 생성**
   - [Vercel](https://vercel.com) 방문 후 GitHub 계정으로 가입

2. **필수 API 키 준비**
   - OpenWeather API 키 ([발급 방법](API_KEY_SETUP.md))
   - 네이버 지도 클라이언트 ID

### 배포 단계

#### 1. GitHub 저장소 연결

```bash
# GitHub에 푸시
git add .
git commit -m "Add Vercel deployment configuration"
git push origin main
```

#### 2. Vercel 프로젝트 생성

1. Vercel 대시보드에서 **"New Project"** 클릭
2. GitHub 저장소 선택 및 Import
3. Framework Preset: **"Other"** 선택
4. Build Settings는 기본값 유지 (vercel.json에서 자동 설정됨)

#### 3. 환경 변수 설정

Vercel 대시보드 → Settings → Environment Variables에서 다음 변수 추가:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `NODE_ENV` | `production` | Production |
| `WEATHER_API_KEY` | `your_api_key` | Production |
| `REACT_APP_NAVER_MAP_CLIENT_ID` | `your_client_id` | Production |
| `ALLOWED_ORIGINS` | `https://your-domain.vercel.app` | Production |
| `RATE_LIMIT_MAX` | `100` | Production |

> ⚠️ **중요**: 배포 후 실제 Vercel 도메인으로 `ALLOWED_ORIGINS`를 업데이트하세요!

#### 4. 배포 실행

**"Deploy"** 버튼 클릭 → 자동 빌드 및 배포 시작

#### 5. 배포 확인

배포 완료 후 제공되는 URL로 접속하여 다음 확인:

```bash
# Health check
curl https://your-domain.vercel.app/api/health

# API 엔드포인트 확인
curl https://your-domain.vercel.app/api
```

### 로컬에서 Vercel 테스트

```bash
# Vercel CLI 설치
npm i -g vercel

# 로컬에서 Vercel 환경 시뮬레이션
vercel dev
```

---

## 🔒 보안 체크리스트

배포 전 다음 보안 요소들이 모두 적용되었는지 확인하세요:

### ✅ 적용된 보안 기능

- [x] **HTTPS 강제**: Vercel이 자동으로 SSL 인증서 적용
- [x] **보안 헤더**: 
  - Content Security Policy (CSP)
  - X-Frame-Options (Clickjacking 방지)
  - X-Content-Type-Options (MIME 스니핑 방지)
  - X-XSS-Protection
  - Strict-Transport-Security (HSTS)
  - Referrer-Policy
- [x] **CORS 제한**: `ALLOWED_ORIGINS` 환경 변수로 허용 도메인 제한
- [x] **Rate Limiting**: DDoS 방지를 위한 요청 속도 제한 (15분당 100회)
- [x] **입력 검증**: XSS 및 SQL Injection 방지를 위한 입력 sanitization
- [x] **환경 변수 보호**: API 키 및 비밀 정보는 `.env` 파일로 관리 (Git 제외)

### 📋 배포 후 추가 권장 사항

1. **도메인 설정**
   ```
   Vercel Dashboard → Domains → Add Domain
   커스텀 도메인 연결 후 ALLOWED_ORIGINS 업데이트
   ```

2. **모니터링 설정**
   - Vercel Analytics 활성화
   - Error Logging 확인

3. **정기적인 보안 업데이트**
   ```bash
   # 의존성 취약점 검사
   npm audit
   
   # 자동 수정
   npm audit fix
   ```

4. **API 키 로테이션**
   - 정기적으로 API 키 갱신
   - 의심스러운 활동 발견 시 즉시 키 변경

---

## 🚧 다음 개발 계획

- [x] 날씨 API 연동 (OpenWeatherMap)
- [x] 위치 기반 날씨 정보 가져오기
- [x] 온도별 옷차림 추천 알고리즘
- [x] Vercel 배포 설정
- [ ] 사용자 인증 시스템 (JWT)
- [ ] 데이터베이스 연동 (MongoDB/PostgreSQL)
- [ ] 사용자 선호도 저장 기능
- [ ] PWA (Progressive Web App) 지원


---

## 📄 라이선스

이 프로젝트는 [LICENSE](LICENSE) 파일에 명시된 라이선스를 따릅니다.

---

## 💬 문의 및 기여

문제가 발생하거나 개선 사항이 있다면 Issue를 열어주세요!

**Happy Coding! 🎉**
