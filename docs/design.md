# 설계 문서

## 문서 개요

- 프로젝트명: ReadyGo
- 작성일: 2026-05-26
- 문서 목적: 요구사항 분석 결과를 바탕으로 화면 구조, 주요 컴포넌트, 데이터 구조, API 연동 전략, 소프트웨어공학 설계 원칙 적용 방안을 정의한다.
- 대상 산출물: 외출 준비 통합 도우미 웹앱

## 설계 목표

ReadyGo는 아침 외출 준비에 필요한 정보를 한 화면에 통합하여 보여주는 웹앱이다. 사용자는 남은 외출 시간, 준비물 투두, 날씨와 옷차림 추천, 관심 정류장의 버스 정보를 순서대로 확인할 수 있다.

설계 목표는 다음과 같다.

- 바쁜 아침에도 빠르게 읽히는 단일 대시보드 제공
- 사용자가 직접 수정해야 하는 정보와 외부 데이터로 받아오는 정보를 명확히 분리
- 실제 API 연동과 mock 데이터 사용을 쉽게 교체할 수 있는 구조 마련
- 기능별 책임을 분리하여 유지보수와 테스트가 쉬운 구조 설계
- 소프트웨어공학에서 배운 추상화, 캡슐화, 모듈화, 낮은 결합도, 높은 응집도, SOLID 원칙을 반영

## 기술 방향

초기 구현은 웹앱으로 진행한다. 사용자가 모바일 화면에서 확인하는 상황을 주로 고려하되, 데스크톱 브라우저에서도 확인 가능한 반응형 웹앱으로 설계한다.

### 권장 기술 스택

- UI: React 기반 웹앱
- 언어: JavaScript 또는 TypeScript
- 스타일: CSS Modules, Tailwind CSS, 또는 일반 CSS
- 상태 관리: 초기 버전에서는 React state 중심으로 관리
- 데이터 저장: 초기 버전에서는 localStorage 사용
- 외부 API: 날씨 API 우선 검토, 버스 API는 mock 데이터 우선

TypeScript를 사용할 경우 데이터 타입을 명시하여 요구사항과 코드 간의 추적성을 높일 수 있다. 다만 과제 일정과 구현 난이도를 고려하여 JavaScript로 시작하고 JSDoc 또는 문서 기반 타입 정의를 병행하는 방식도 가능하다.

## 화면 구조

### 정보 우선순위

사용자가 정한 정보 우선순위는 다음과 같다.

1. 외출까지 남은 시간
2. 준비물 투두
3. 날씨 및 옷차림 추천
4. 관심 정류장 버스 정보

이 순서는 사용자가 아침에 가장 먼저 판단해야 하는 것이 "언제 나가야 하는가"이고, 그 다음이 "무엇을 챙겨야 하는가"라는 사용 맥락을 반영한다.

### 대시보드 영역

```text
ReadyGo
오늘 외출 준비

┌────────────────────────────┐
│ 1. 남은 시간 영역           │
│ 외출 시각, 남은 시간, 수정   │
└────────────────────────────┘

┌────────────────────────────┐
│ 2. 준비물 투두 영역         │
│ 추가, 수정, 삭제, 체크       │
└────────────────────────────┘

┌────────────────────────────┐
│ 3. 날씨 및 옷차림 영역      │
│ 현재 기온, 날씨, 추천 문구   │
└────────────────────────────┘

┌────────────────────────────┐
│ 4. 버스 정보 영역           │
│ 관심 정류장, 도착 예정 정보  │
└────────────────────────────┘
```

### 화면별 역할

초기 버전은 단일 화면으로 구성한다. 별도의 페이지 이동 없이 대시보드 안에서 필요한 정보를 확인하고 수정할 수 있도록 설계한다.

| 영역 | 목적 | 주요 동작 |
| --- | --- | --- |
| 남은 시간 | 사용자가 출발 시간 압박을 가장 먼저 파악 | 외출 시각 확인, 외출 시각 수정, 남은 시간 자동 갱신 |
| 준비물 투두 | 외출 전 챙길 항목을 관리 | 추가, 삭제, 내용 수정, 체크, 체크해제 |
| 날씨 및 옷차림 | 복장 판단 지원 | 현재 날씨 확인, 기온별 옷차림 추천 |
| 버스 정보 | 교통 상황 확인 | 관심 정류장 수정, 버스 도착 예정 정보 확인 |

## UI 디자인 방향

ReadyGo의 디자인은 Toss처럼 깔끔하고 트렌디한 금융/생활 도구형 UI를 지향한다.

### 디자인 원칙

- 정보 위계가 분명한 카드형 대시보드
- 넓은 여백과 명확한 타이포그래피 사용
- 과한 장식보다 실용성과 가독성 우선
- 중요한 수치인 남은 시간은 크게 표시
- 조작 가능한 요소는 버튼, 입력창, 체크박스 등 익숙한 UI 패턴 사용
- 모바일 화면에서 세로 스크롤만으로 자연스럽게 확인 가능

### 색상 및 분위기

- 기본 배경: 밝은 회색 또는 흰색 계열
- 주요 강조색: 파란색 계열
- 완료 상태: 중립 회색 또는 연한 초록색
- 위험 또는 촉박 상태: 붉은색 또는 주황색 계열

색상은 한 가지 색만 반복하지 않고, 정보의 의미에 따라 제한적으로 사용한다. 예를 들어 출발까지 10분 이하일 때는 남은 시간 영역에 경고 색상을 적용할 수 있다.

## 주요 컴포넌트 설계

초기 컴포넌트 구조는 다음과 같이 나눈다.

```text
App
└── DashboardPage
    ├── Header
    ├── DepartureTimePanel
    ├── TodoPanel
    │   ├── TodoInput
    │   └── TodoItem
    ├── WeatherPanel
    ├── OutfitRecommendation
    └── BusPanel
        └── BusStopSelector
```

### 컴포넌트 책임

| 컴포넌트 | 책임 |
| --- | --- |
| `App` | 전체 앱 초기화 및 전역 레이아웃 관리 |
| `DashboardPage` | 대시보드 영역 조합 |
| `Header` | 앱 이름, 오늘 날짜 표시 |
| `DepartureTimePanel` | 외출 시각과 남은 시간 표시 및 수정 |
| `TodoPanel` | 준비물 목록 상태와 사용자 조작 관리 |
| `TodoInput` | 새 준비물 입력 |
| `TodoItem` | 개별 준비물 표시, 수정, 삭제, 체크 처리 |
| `WeatherPanel` | 날씨 데이터 표시 |
| `OutfitRecommendation` | 기온 기반 옷차림 추천 표시 |
| `BusPanel` | 관심 정류장 및 버스 도착 정보 표시 |
| `BusStopSelector` | 관심 정류장 선택 또는 수정 |

컴포넌트는 UI 표시 책임을 중심으로 구성한다. 데이터 조회, 저장, 계산 로직은 별도 service 또는 utility 모듈로 분리하여 컴포넌트가 지나치게 많은 책임을 갖지 않도록 한다.

## 모듈 구조 설계

예상 폴더 구조는 다음과 같다.

```text
src/
├── components/
│   ├── Header/
│   ├── DepartureTimePanel/
│   ├── TodoPanel/
│   ├── WeatherPanel/
│   └── BusPanel/
├── services/
│   ├── weatherService.js
│   ├── mockWeatherService.js
│   ├── busService.js
│   ├── mockBusService.js
│   └── storageService.js
├── utils/
│   ├── timeUtils.js
│   └── outfitRules.js
├── data/
│   └── mockData.js
└── App.js
```

### 모듈별 책임

| 모듈 | 책임 |
| --- | --- |
| `components/` | 화면 렌더링과 사용자 이벤트 처리 |
| `services/weatherService.js` | 실제 날씨 API 조회 |
| `services/mockWeatherService.js` | mock 날씨 데이터 제공 |
| `services/busService.js` | 실제 버스 API 연동 가능성 캡슐화 |
| `services/mockBusService.js` | mock 버스 도착 정보 제공 |
| `services/storageService.js` | localStorage 저장과 조회 |
| `utils/timeUtils.js` | 남은 시간 계산, 시간 포맷 변환 |
| `utils/outfitRules.js` | 기온별 옷차림 추천 규칙 |
| `data/mockData.js` | 초기 예시 데이터 |

## 데이터 구조 설계

### 준비물 데이터

```js
{
  id: "todo-1",
  title: "학생증",
  completed: false,
  createdAt: "2026-05-26T08:00:00+09:00",
  updatedAt: "2026-05-26T08:00:00+09:00"
}
```

준비물 항목은 추가, 삭제, 수정, 체크, 체크해제를 지원한다. `id`를 기준으로 항목을 식별하고, `completed` 값으로 완료 상태를 관리한다.

### 외출 시각 데이터

```js
{
  targetTime: "08:40",
  updatedAt: "2026-05-26T08:00:00+09:00"
}
```

외출 시각은 사용자가 수정할 수 있으며, 현재 시각과 비교하여 남은 시간을 계산한다. 날짜를 별도로 저장하지 않는 초기 버전에서는 매일 오늘 날짜 기준의 외출 시각으로 해석한다.

### 날씨 데이터

```js
{
  locationName: "Seoul",
  temperature: 21,
  apparentTemperature: 22,
  condition: "맑음",
  weatherCode: 0,
  precipitation: 0,
  fetchedAt: "2026-05-26T08:00:00+09:00",
  source: "open-meteo"
}
```

날씨 데이터는 실제 API를 우선 검토한다. Open-Meteo는 위도와 경도 기반으로 현재 기온, 체감 온도, 강수량, 날씨 코드 등을 JSON으로 받을 수 있고 API key가 필요하지 않아 초기 웹앱에 적합하다. 단, 네트워크 실패나 API 응답 변경에 대비하여 mock 데이터로 대체할 수 있는 구조를 둔다.

### 옷차림 추천 데이터

```js
{
  minTemperature: 20,
  maxTemperature: 23,
  recommendation: "가벼운 니트나 얇은 재킷을 추천해요."
}
```

옷차림 추천은 API에서 직접 받지 않고, 앱 내부 규칙으로 계산한다. 이 방식은 외부 데이터와 추천 로직을 분리하여 테스트를 쉽게 만든다.

### 관심 정류장 데이터

```js
{
  stopId: "mock-stop-1",
  stopName: "홍대입구역",
  direction: "학교 방면"
}
```

초기 버전에서는 사용자가 관심 정류장을 수정할 수 있도록 설계한다. 실제 API 연동 시에는 `stopId`가 공공 API에서 요구하는 정류장 식별자로 대체될 수 있다.

### 버스 도착 데이터

```js
{
  stopId: "mock-stop-1",
  stopName: "홍대입구역",
  arrivals: [
    {
      routeId: "bus-273",
      routeName: "273",
      minutesLeft: 7,
      arrivalMessage: "7분 후 도착",
      congestion: "보통"
    }
  ],
  fetchedAt: "2026-05-26T08:00:00+09:00",
  source: "mock"
}
```

버스 정보는 관심 정류장 기준으로 여러 버스 도착 정보를 보여주는 구조를 사용한다. 실제 버스 API 연동은 인증키, 지역별 API 차이, 응답 구조 복잡도 때문에 일정상 위험 요소가 있으므로 초기 구현은 mock 데이터를 우선한다.

## API 및 Mock 데이터 전략

### 기본 전략

외부 데이터는 `service` 계층을 통해서만 접근한다. UI 컴포넌트는 실제 API인지 mock 데이터인지 알 필요 없이 동일한 형태의 데이터를 받는다.

```text
WeatherPanel → weatherService interface → realWeatherService 또는 mockWeatherService
BusPanel     → busService interface     → realBusService 또는 mockBusService
```

이 구조를 사용하면 외부 API 연동이 실패하거나 일정상 어렵더라도 UI와 핵심 로직을 유지한 채 데이터 공급 방식만 바꿀 수 있다.

### 날씨 API 전략

- 우선순위: 실제 API 연동 우선
- 후보: Open-Meteo Forecast API
- 이유: API key 없이 사용 가능하며, 현재 기온, 체감 온도, 날씨 코드, 강수량 등 대시보드에 필요한 정보를 제공한다.
- 대체 전략: 네트워크 오류 또는 구현 일정 문제가 있으면 `mockWeatherService`로 전환한다.

예상 요청 예시는 다음과 같다.

```text
https://api.open-meteo.com/v1/forecast
  ?latitude=37.5665
  &longitude=126.9780
  &current=temperature_2m,apparent_temperature,precipitation,weather_code
  &timezone=Asia/Seoul
```

### 버스 API 전략

- 우선순위: mock 데이터 우선, 실제 API는 확장 가능성으로 남김
- 이유: 버스 도착 정보는 지역별 API, 인증키, 정류장 ID, 노선 ID 등 고려할 요소가 많아 초기 구현 복잡도가 높다.
- 설계 방향: `busService` 인터페이스를 정의해두고, 초기에는 `mockBusService`가 관심 정류장과 도착 예정 정보를 반환한다.
- 확장 방향: 추후 실제 공공 API를 붙일 때 `busService` 구현체만 교체한다.

## 상태 관리 설계

초기 버전의 상태는 다음과 같이 나눈다.

| 상태 | 저장 위치 | 설명 |
| --- | --- | --- |
| 준비물 목록 | localStorage | 사용자가 수정하는 데이터이므로 브라우저에 저장 |
| 외출 시각 | localStorage | 사용자가 설정한 값을 유지 |
| 관심 정류장 | localStorage | 사용자가 선택한 정류장을 유지 |
| 날씨 데이터 | component state | API에서 받아온 일시적 데이터 |
| 버스 도착 데이터 | component state | API 또는 mock에서 받아온 일시적 데이터 |
| 옷차림 추천 | derived state | 기온을 바탕으로 계산 |
| 남은 시간 | derived state | 현재 시각과 외출 시각을 바탕으로 계산 |

사용자 입력 데이터와 외부 조회 데이터를 분리하여 저장한다. 사용자가 직접 수정한 정보는 localStorage에 저장하고, 날씨와 버스처럼 변동성이 큰 데이터는 화면 상태로 관리한다.

## 주요 로직 설계

### 남은 시간 계산

1. 사용자가 설정한 외출 시각을 읽는다.
2. 오늘 날짜와 외출 시각을 결합하여 목표 시간을 만든다.
3. 현재 시각과 목표 시각의 차이를 분 단위로 계산한다.
4. 0분보다 크면 `N분 남음`으로 표시한다.
5. 0분 이하이면 `외출 시간이 지났어요` 또는 `지금 나가야 해요`로 표시한다.
6. 1분 단위로 값을 갱신한다.

### 투두 조작

준비물 투두는 CRUD와 체크 상태 변경을 지원한다.

- 추가: 새 title을 입력받아 새 항목 생성
- 수정: 기존 항목의 title 변경
- 삭제: id 기준으로 항목 제거
- 체크: completed 값을 true로 변경
- 체크해제: completed 값을 false로 변경

투두 로직은 `TodoPanel` 내부에 모두 섞지 않고, 추후 `todoUtils` 또는 custom hook으로 분리할 수 있도록 설계한다.

### 옷차림 추천

옷차림 추천은 기온 구간별 규칙을 사용한다.

| 기온 | 추천 |
| --- | --- |
| 5도 미만 | 두꺼운 외투, 목도리, 장갑을 추천 |
| 5도 이상 10도 미만 | 코트나 패딩 등 따뜻한 겉옷 추천 |
| 10도 이상 17도 미만 | 재킷, 가디건, 니트 추천 |
| 17도 이상 23도 미만 | 얇은 긴팔, 가벼운 겉옷 추천 |
| 23도 이상 28도 미만 | 반팔, 얇은 셔츠 추천 |
| 28도 이상 | 통풍이 잘 되는 가벼운 옷 추천 |

이 규칙은 `outfitRules.js`에 분리하여 날씨 API와 독립적으로 테스트할 수 있게 한다.

## 소프트웨어공학 설계 원칙 적용

### 추상화

날씨와 버스 데이터는 실제 API 또는 mock 데이터에서 올 수 있지만, 화면에서는 동일한 추상 데이터 형태로 사용한다. 예를 들어 `WeatherPanel`은 `temperature`, `condition`, `fetchedAt`만 알면 되고, 데이터가 Open-Meteo에서 왔는지 mock에서 왔는지는 몰라도 된다.

### 캡슐화

localStorage 접근, API 호출, 시간 계산, 옷차림 추천 규칙은 각각 별도 모듈에 숨긴다. 컴포넌트는 필요한 함수만 호출하고 내부 구현에는 의존하지 않는다.

예를 들어 `storageService`는 localStorage key와 직렬화 방식을 내부에 감추고, 외부에는 `loadTodos`, `saveTodos`, `loadDepartureTime`, `saveDepartureTime` 같은 함수만 제공한다.

### 모듈화

대시보드를 남은 시간, 투두, 날씨, 버스 영역으로 나누고, 각 영역을 독립적인 컴포넌트와 서비스로 분리한다. 이렇게 하면 한 기능을 수정할 때 다른 기능에 미치는 영향을 줄일 수 있다.

### 결합도와 응집도

- 낮은 결합도: UI 컴포넌트가 특정 API 응답 형식에 직접 의존하지 않도록 service 계층에서 데이터를 변환한다.
- 높은 응집도: `timeUtils`는 시간 계산만, `outfitRules`는 옷차림 추천만, `weatherService`는 날씨 데이터 조회만 담당한다.

이 구조는 기능 간 의존성을 줄이고, 각 모듈이 하나의 명확한 책임을 갖도록 한다.

## SOLID 원칙 적용

### SRP: 단일 책임 원칙

각 컴포넌트와 모듈은 하나의 주된 책임만 갖는다. 예를 들어 `DepartureTimePanel`은 외출 시각과 남은 시간 표시를 담당하고, 실제 시간 차이 계산은 `timeUtils`에 위임한다.

### OCP: 개방-폐쇄 원칙

날씨와 버스 데이터 공급 방식은 확장에는 열려 있고 기존 UI 수정에는 닫혀 있도록 설계한다. 실제 API를 mock에서 real API로 바꾸더라도 `WeatherPanel`과 `BusPanel`의 구조는 최대한 유지한다.

### LSP: 리스코프 치환 원칙

`mockWeatherService`와 `realWeatherService`는 동일한 형태의 날씨 데이터를 반환해야 한다. 따라서 어떤 구현체를 사용해도 `WeatherPanel`은 동일하게 동작해야 한다.

### ISP: 인터페이스 분리 원칙

컴포넌트가 필요하지 않은 기능까지 가진 거대한 service에 의존하지 않도록 한다. 예를 들어 날씨 컴포넌트는 버스 조회 함수에 접근할 필요가 없고, 버스 컴포넌트는 투두 저장 함수에 접근할 필요가 없다.

### DIP: 의존성 역전 원칙

UI 컴포넌트가 구체적인 API 호출 방식에 직접 의존하지 않고, 추상화된 service 함수에 의존하도록 한다. 이로써 상위 수준의 UI 정책이 하위 수준의 API 구현 변화에 흔들리지 않게 한다.

## 요구사항 추적성

| 요구사항 | 설계 반영 |
| --- | --- |
| FR-01 대시보드 화면 제공 | `DashboardPage`와 네 개의 주요 패널로 반영 |
| FR-02 준비물 투두 목록 표시 | `TodoPanel`, `TodoItem` 설계 |
| FR-03 준비물 완료 체크 | `completed` 필드와 체크/체크해제 로직 설계 |
| FR-04 오늘 날씨 및 기온 표시 | `WeatherPanel`, `weatherService` 설계 |
| FR-05 기온별 옷차림 추천 | `OutfitRecommendation`, `outfitRules` 설계 |
| FR-06 외출 시각 표시 | `DepartureTimePanel`, `targetTime` 데이터 설계 |
| FR-07 외출까지 남은 시간 표시 | `timeUtils` 기반 남은 시간 계산 설계 |
| FR-08 버스 도착 정보 표시 | `BusPanel`, `busService` 설계 |
| FR-09 mock 데이터 기반 버스 정보 | `mockBusService` 설계 |
| FR-10 기본 설정값 제공 | `mockData.js`와 localStorage 초기값 설계 |
| FR-11 준비물 항목 추가 | `TodoInput`과 추가 로직 설계 |
| FR-12 준비물 항목 삭제 | `TodoItem`의 삭제 동작 설계 |
| FR-13 외출 시각 수정 | `DepartureTimePanel`의 시간 수정 동작 설계 |
| FR-14 준비물 항목 내용 수정 | `TodoItem`의 인라인 수정 동작 설계 |
| FR-15 관심 정류장 수정 | `BusStopSelector`의 정류장 수정 동작 설계 |

## 품질 관리 관점

### 테스트 가능성

다음 로직은 UI와 분리하여 단위 테스트가 가능하도록 설계한다.

- 남은 시간 계산
- 기온별 옷차림 추천
- 투두 추가, 수정, 삭제, 체크, 체크해제
- localStorage 저장 및 복원
- API 실패 시 mock 또는 fallback 데이터 표시

### 유지보수성

외부 API 응답 형식이 바뀌어도 service 계층에서만 수정하도록 설계한다. UI는 정규화된 앱 내부 데이터 구조를 사용하므로 변경 영향이 작다.

### 사용성

가장 중요한 정보인 남은 시간을 화면 상단에 배치하고, 조작이 잦은 투두를 그 아래에 둔다. 날씨와 버스 정보는 보조 판단 정보로 하단에 배치한다.

## 위험 요소와 대응

| 위험 요소 | 영향 | 대응 |
| --- | --- | --- |
| 날씨 API 연동 실패 | 날씨 영역 구현 지연 | `mockWeatherService`로 대체 가능하게 설계 |
| 버스 API 복잡도 증가 | 구현 시간 초과 | 초기 버전은 `mockBusService` 사용 |
| 한 화면 정보 과밀 | 사용성 저하 | 정보 우선순위에 따라 카드 크기와 위치 조정 |
| 상태 관리 복잡도 증가 | 버그 가능성 증가 | 사용자 데이터와 외부 조회 데이터를 분리 |
| 컴포넌트 책임 과다 | 유지보수성 저하 | 계산, 저장, API 호출을 별도 모듈로 분리 |

## 설계 결정 요약

- 앱 이름은 `ReadyGo`로 정한다.
- 웹앱 형태로 구현한다.
- 대시보드 정보 우선순위는 남은 시간, 투두, 날씨, 버스 순서로 한다.
- 날씨는 실제 API 연동을 우선 검토하고, Open-Meteo를 후보로 사용한다.
- 버스는 관심 정류장 기반 구조로 설계하되, 초기 구현은 mock 데이터를 우선한다.
- 투두는 추가, 삭제, 내용 수정, 체크, 체크해제를 지원한다.
- 외출 시각은 사용자가 수정할 수 있고 남은 시간은 자동 갱신한다.
- UI는 Toss처럼 깔끔하고 트렌디한 생활 도구형 대시보드를 지향한다.
- 추상화, 캡슐화, 모듈화, 낮은 결합도, 높은 응집도, SOLID 원칙을 설계 기준으로 삼는다.

## 참고 자료

- Open-Meteo Weather Forecast API: <https://open-meteo.com/en/docs>
