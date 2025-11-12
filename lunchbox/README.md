# Lunch Team Builder

모듈형 점심 팀 빌더 미니 프로젝트의 초기 셋업입니다. 이 디렉터리(`lunchbox/`)를 프로젝트 루트로 사용하며, React 프론트엔드와 Node.js(Express) 백엔드를 각각 독립 폴더로 구성했습니다.

## 프로젝트 구조

```
.
├── backend/    # Express + TypeScript 기반 API 서버
└── frontend/   # React + Vite 기반 클라이언트
```

## 로컬 개발 방법

### 프론트엔드

```bash
cd frontend
npm install
npm run dev
```

### 백엔드

```bash
cd backend
npm install
npm run dev
```

프론트엔드는 기본적으로 `http://localhost:5173`, 백엔드는 `http://localhost:4000` 포트에서 실행되도록 구성되어 있습니다.

## 다음 단계

- 팀 생성, 제외 프리셋, 통계 등 도메인별 API 라우터 추가
- React 라우팅/상태 관리 도입 및 UI 컴포넌트 설계
- Docker Compose로 서비스 통합 및 배포 파이프라인 구성
