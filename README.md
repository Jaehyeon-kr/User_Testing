# T-STOCK A/B 사용성 테스트

주식 앱 프로토타입의 A/B 버전 사용성 테스트 도구입니다.

- **A버전**: 수정 전 (기존 UI)
- **B버전**: 수정 후 (휴리스틱 개선 적용)

---

## GitHub에 올리는 방법

### 1. Git 초기화 및 원격 저장소 연결

```bash
cd 프로젝트폴더경로

git init
git remote add origin https://github.com/Jaehyeon-kr/User_Testing.git
```

### 2. .gitignore 설정

`node_modules`, `dist` 등 불필요한 파일을 제외합니다.

```bash
# .gitignore 파일이 자동 생성되어 있습니다
# 없다면 아래 내용으로 생성하세요

node_modules/
dist/
.DS_Store
*.zip
```

### 3. 커밋 및 푸시

```bash
git add .
git commit -m "Initial commit: T-STOCK A/B 사용성 테스트"
git branch -M main
git push -u origin main
```

> 만약 이미 원격에 내용이 있어서 push가 거부되면:
> ```bash
> git pull origin main --allow-unrelated-histories
> git push -u origin main
> ```

---

## 실행 방법

### 사전 준비

- [Node.js](https://nodejs.org/) 18 이상 설치 필요

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npx vite
```

실행 후 터미널에 표시되는 주소(기본: `http://localhost:5173`)를 브라우저에서 열어주세요.

### 3. A/B 버전 선택

- 하단 바에서 **A버전** / **B버전** 버튼으로 선택 가능
- 또는 URL 파라미터로 직접 접근:
  - B버전 (기본): `http://localhost:5173`
  - A버전: `http://localhost:5173?version=A`

---

## 테스트 진행 방법

1. 화면 하단 바에 **참가자 ID** (예: P01)를 입력합니다.
2. **A버전** 또는 **B버전**을 선택합니다.
3. **테스트 시작** 버튼을 클릭합니다.
4. 안내 화면에서 태스크를 확인하고 진행합니다.
5. 각 태스크 완료 후 설문(난이도/자신감/정보충분도)에 응답합니다.
6. 5개 태스크 완료 후 SUS(시스템 사용성 척도) 설문에 응답합니다.
7. 결과 화면에서 **CSV 다운로드**가 자동으로 진행됩니다.

### 태스크 목록

| # | 태스크 | 미션 |
|---|--------|------|
| 1 | 종목 조회 및 정보 파악 | 삼성전자 종목의 PER 값 확인 |
| 2 | 주식 주문 실행 | 삼성전자 2주 매수 주문 |
| 3 | 주문 취소 | 주문한 삼성전자 2주 취소 |
| 4 | 심플 모드 커스터마이징 | 심플 모드에서 '글로벌 증시' 메뉴 추가 |
| 5 | 여론 분석 정보 확인 | 삼성전자 여론 분석 데이터 수집 기간 확인 |

### 결과 데이터

- 테스트 완료 시 `tstock_ab_test_results.csv` 파일이 자동 다운로드됩니다.
- 여러 참가자의 결과가 누적되어 하나의 CSV로 저장됩니다.
- 결과 화면에서 **전체 CSV 다운로드** 버튼으로 이전 결과도 다운로드할 수 있습니다.

---

## 빌드

```bash
npm run build
```

`dist/` 폴더에 정적 파일이 생성됩니다.
