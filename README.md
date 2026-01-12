# Mini Game Heaven

브라우저에서 바로 즐길 수 있는 멀티페이지 미니게임 모음입니다. 별도 서버 없이 정적 호스팅에 바로 올려 사용합니다.

## 게임 목록
- 가위바위보 (rps)
- 오목 (omok)
- 로또 추첨기 (lotto)
- 오늘 뭐 먹지 (menu)
- 지뢰찾기 (minesweeper)

## 주요 기능
- 다국어(한국어/영어/일본어) 전환
- 라이트/다크 테마
- 효과음 및 볼륨 조절
- 로컬스토리지 기반 설정/기록 유지

## 파일 구조
- `index.html` : 메인 페이지
- `rps.html`, `rps.js`
- `omok.html`, `omok.js`
- `lotto.html`, `lotto.js`
- `menu.html`
- `minesweeper.html`, `minesweeper.js`
- `style.css` : 공용 스타일
- `shared.js` : i18n/테마/사운드 공용 로직
- `image/` : 메뉴 추천 이미지

## 실행 방법
1) 이 폴더를 그대로 두고 `index.html`을 브라우저에서 열기
2) 크롬/엣지 권장

> 일부 브라우저는 로컬 파일에서 오디오가 첫 클릭 전까지 재생이 제한될 수 있습니다.

## 배포
정적 호스팅(예: GitHub Pages, Cloudflare Pages 등)에 루트 파일을 그대로 올리면 동작합니다.

## 라이선스
별도 표기가 없다면 저장소 소유자 정책을 따릅니다.
