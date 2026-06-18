# 🎨 Mujakjung-fe (무작정 프론트엔드)

> **React와 TypeScript를 활용한 무작정 프로젝트의 프론트엔드**
> 사용자 친화적인 UI와 효율적인 상태 관리를 통해 최상의 사용자 경험을 제공합니다.

---

## 🚀 Tech Stack

| 분류 | 기술 스택 |
| :--- | :--- |
| **Library** | React 18+ |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **State Management** | Axios / React Query (추천) |
| **Styling** | CSS Modules / Styled-components |
| **Icon** | Lucide React / FontAwesome |

---

## 📦 주요 기능

- **로그인 및 인증**
  - [x] 카카오 소셜 로그인 연동 (Redirect URI 처리)
  - [ ] JWT 토큰 저장 및 관리 (LocalStorage/Cookie)
- **회원 기능**
  - [x] 회원가입 폼 유효성 검사 (Validation)
  - [ ] 마이페이지 정보 조회 및 수정
- **UI/UX**
  - [x] 반응형 레이아웃 구성
  - [ ] 공통 컴포넌트(Button, Input, Modal) 모듈화

---

## ⚙️ 시작하기

### 1️⃣ 패키지 설치
프로젝트 루트 폴더에서 아래 명령어를 실행하여 필요한 라이브러리를 설치합니다.

```bash
npm install
# 또는
yarn install
2️⃣ 환경 변수 설정 (.env)
루트 디렉토리에 .env 파일을 생성하고 카카오 앱 키를 설정하세요.

코드 스니펫
VITE_KAKAO_REST_API_KEY=c20fa1e751278dc7d481f42f175401b2
VITE_KAKAO_REDIRECT_URI=http://localhost:8081/auth/kakao/callback
3️⃣ 개발 서버 실행
Bash
npm run dev
기본 접속 주소: http://localhost:5173

🗂️ 프로젝트 구조
Plaintext
src
 ├─ assets          # 이미지, 폰트 등 정적 파일
 ├─ components      # 재사용 가능한 공통 컴포넌트
 ├─ hooks           # 커스텀 훅 (API 호출 등)
 ├─ pages           # 페이지 단위 컴포넌트 (Login, Home 등)
 ├─ services        # API 통신 로직 (Axios 인스턴스 등)
 ├─ types           # TypeScript 타입 정의
 └─ App.tsx         # 메인 라우팅 설정






<img width="1280" height="764" alt="image" src="https://github.com/user-attachments/assets/63212116-ba06-4bc7-b4d2-efd65924fff6" />


