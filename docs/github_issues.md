# GitHub Issue 등록 계획

작성일: 2026-05-24

이 문서는 GitHub issue에 등록할 작업 단위를 미리 정리한 것이다. 실제 issue 등록 후에는 issue 번호를 문서 또는 회의록에 연결하여 요구사항, 설계, 구현, 테스트 과정의 추적성을 확보한다.

## Issue 1. 요구사항 분석 문서 작성

- Title: `docs: 요구사항 분석 문서 작성`
- Labels: `documentation`, `requirements`
- Milestone: `requirements`

### 내용

외출 준비 통합 도우미 앱의 문제 정의, 사용자 시나리오, 기능 요구사항, 비기능 요구사항, 우선순위를 정리한다.

### 완료 조건

- `docs/requirements.md`에 요구사항 분석 내용 작성
- 기능 요구사항과 비기능 요구사항 분리
- 우선순위와 수용 기준 작성
- 다음 단계인 설계 문서 작성 기준 확보

## Issue 2. 화면 및 데이터 구조 설계

- Title: `docs: 화면 및 데이터 구조 설계`
- Labels: `documentation`, `design`
- Milestone: `design`

### 내용

대시보드 화면 구조, 주요 컴포넌트, 데이터 구조, mock 데이터 사용 방식을 설계한다.

### 완료 조건

- `docs/design.md` 작성
- 대시보드 영역 정의
- 투두, 날씨, 옷차림, 버스, 외출 시간 데이터 구조 정의
- 실제 API 연동 여부와 mock 데이터 전략 결정

## Issue 3. 대시보드 UI 구현

- Title: `feat: 외출 준비 대시보드 UI 구현`
- Labels: `feature`, `ui`
- Milestone: `implementation`

### 내용

외출 준비에 필요한 정보를 한 화면에 보여주는 기본 대시보드 UI를 구현한다.

### 완료 조건

- 대시보드 기본 레이아웃 구현
- 준비물, 날씨, 옷차림, 버스, 외출 시간 영역 표시
- 작은 화면에서도 정보가 겹치지 않도록 구성

## Issue 4. 준비물 투두 기능 구현

- Title: `feat: 준비물 투두 리스트 기능 구현`
- Labels: `feature`
- Milestone: `implementation`

### 내용

외출 전 챙겨야 할 준비물을 목록으로 표시하고 완료 상태를 체크할 수 있도록 구현한다.

### 완료 조건

- 기본 준비물 목록 표시
- 항목 완료 체크 기능
- 완료 상태 시각적 구분
- 필요 시 항목 추가 및 삭제 기능 검토

## Issue 5. 날씨 및 옷차림 추천 기능 구현

- Title: `feat: 날씨 및 기온별 옷차림 추천 구현`
- Labels: `feature`
- Milestone: `implementation`

### 내용

현재 날씨와 기온을 표시하고, 기온 구간에 따라 옷차림 추천 문구를 제공한다.

### 완료 조건

- 날씨 상태와 기온 표시
- 기온별 추천 규칙 작성
- 추천 문구가 대시보드에 표시됨
- mock 데이터 또는 API 사용 방식 문서화

## Issue 6. 버스 도착 정보 표시 기능 구현

- Title: `feat: 버스 도착 정보 표시 구현`
- Labels: `feature`
- Milestone: `implementation`

### 내용

사용자가 사전에 등록한 버스의 도착 예정 정보를 대시보드에 표시한다.

### 완료 조건

- 버스 번호 또는 노선명 표시
- 정류장명 표시
- 도착까지 남은 시간 표시
- 실제 API 연동이 어려울 경우 mock 데이터로 구현

## Issue 7. 외출 시각 카운트다운 기능 구현

- Title: `feat: 외출 시각 및 남은 시간 표시 구현`
- Labels: `feature`
- Milestone: `implementation`

### 내용

사용자가 설정한 외출 시각과 현재 시각 기준 남은 시간을 표시한다.

### 완료 조건

- 외출 예정 시각 표시
- 남은 시간 계산
- 시간이 지남에 따라 표시값 갱신
- 외출 시간이 지난 경우의 표시 방식 정의

## Issue 8. 테스트 케이스 및 테스트 보고서 작성

- Title: `test: 기능별 테스트 케이스 및 보고서 작성`
- Labels: `test`, `documentation`
- Milestone: `testing`

### 내용

주요 기능별 테스트 항목을 작성하고, 구현 후 테스트 결과와 결함 수정 내용을 정리한다.

### 완료 조건

- `docs/test_report.md` 작성
- 요구사항 ID와 테스트 케이스 연결
- 수동 테스트 결과 기록
- 발견된 결함과 수정 여부 기록

## Issue 9. 프로세스 적용 교훈 정리

- Title: `docs: 프로세스 적용 lessons learned 정리`
- Labels: `documentation`, `retrospective`
- Milestone: `report`

### 내용

요구사항 분석, 설계, 구현, 테스트 및 품질 관리 단계에서 얻은 교훈과 바이브코딩의 효과를 정리한다.

### 완료 조건

- `docs/lessons_learned.md` 작성
- 프로세스 적용의 장점과 한계 정리
- 바이브코딩이 각 단계에 미친 영향 분석
- 최종 PDF 보고서에 반영할 내용 정리

## Issue 10. 최종 PDF 보고서 작성

- Title: `docs: 최종 PDF 보고서 작성`
- Labels: `documentation`, `report`
- Milestone: `report`

### 내용

소프트웨어 산출물 캡처와 프로세스 기반 논술 내용을 PDF 보고서로 정리한다.

### 완료 조건

- 완성 화면 캡처 포함
- 요구사항 분석부터 품질 관리까지의 과정 설명
- GitHub repo 주소 포함
- 바이브코딩 효과와 lessons learned 포함
