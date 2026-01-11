# 미니게임 천국 Blueprint

## 목적
정적 HTML/JS로 구성된 멀티페이지 미니게임 허브를 제공한다. 사용자는 메인에서 게임을 선택해 플레이하고, 테마/언어/효과음을 공통으로 관리한다.

## 범위
- 메인 허브 및 개별 게임 페이지
- 다국어(i18n) 전환
- 라이트/다크 테마
- 효과음 및 볼륨 조절
- 로컬스토리지 기반 설정/기록 저장

## 페이지/게임 구성
- `index.html` : 메인 허브
- `rps.html` / `rps.js` : 가위바위보
- `omok.html` / `omok.js` : 오목
- `lotto.html` / `lotto.js` : 로또 추첨기
- `menu.html` : 오늘 뭐 먹지
- `minesweeper.html` / `minesweeper.js` : 지뢰찾기
- `about.html`, `contact.html`, `privacy.html`, `terms.html` : 안내 페이지

## 공용 모듈
- `shared.js`
  - 다국어 사전 및 번역 적용
  - 테마 전환
  - 효과음 컨트롤 및 오디오 엔진
- `style.css`
  - 전 페이지 공통 스타일
  - 테마 변수 정의

## 데이터/상태
- `localStorage`
  - 언어(`lang`)
  - 테마(`theme`)
  - 효과음 on/off(`sfx_on`)
  - 효과음 볼륨(`sfx_vol`)
  - 각 게임별 기록/설정

## 배포
- 정적 호스팅에 바로 배포 가능
- `public/` 폴더는 배포용 정적 자산 복제본

## 품질 기준
- 모바일/데스크톱 반응형
- 언어 변경 시 즉시 반영 및 깜빡임 최소화
- 게임 로직은 단일 페이지 내에서 독립적으로 동작
- 지뢰찾기는 지뢰가 없는 안전지대를 모두 열면 승리
