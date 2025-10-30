# WeatherWear 🍀
날씨 기반 옷 추천 서비스

날씨 정보를 바탕으로 사용자에게 적절한 옷차림을 추천하는 웹 애플리케이션입니다.

---

## 📋 목차
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [기술 스택](#-기술-스택)
- [설치 방법](#-설치-방법)
- [실행 방법](#-실행-방법)
- [환경 변수 설정](#-환경-변수-설정)
- [API 문서](#-api-문서)
- [개발 가이드](#-개발-가이드)
- [트러블슈팅](#-트러블슈팅)

---

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

# TODO: 날씨 API 키 추가 예정
# WEATHER_API_KEY=your_api_key_here
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

# 프론트엔드 포트
PORT=3000
```

**설정 방법:**
```bash
cp frontend/.env.example frontend/.env
# 에디터로 frontend/.env 파일을 열어 필요한 값을 수정하세요
```

> ⚠️ **중요**: `.env` 파일은 절대 Git에 커밋하지 마세요! (이미 .gitignore에 포함됨)

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

## 🚧 다음 개발 계획

- [ ] 날씨 API 연동 (OpenWeatherMap 등)
- [ ] 위치 기반 날씨 정보 가져오기
- [ ] 온도별 옷차림 추천 알고리즘
- [ ] 사용자 인증 시스템 (JWT)
- [ ] 데이터베이스 연동 (MongoDB/PostgreSQL)
- [ ] 사용자 선호도 저장 기능
- [ ] 반응형 UI 디자인
- [ ] PWA (Progressive Web App) 지원

---

## 📄 라이선스

이 프로젝트는 [LICENSE](LICENSE) 파일에 명시된 라이선스를 따릅니다.

---

## 💬 문의 및 기여

문제가 발생하거나 개선 사항이 있다면 Issue를 열어주세요!

**Happy Coding! 🎉**
