const THEME_KEY = "theme";
const SFX_ON_KEY = "mini_sfx_on_v1";
const SFX_VOL_KEY = "mini_sfx_vol_v1";
const LANG_KEY = "lang";

const I18N = {
  ko: {
    "site.name": "미니게임 천국",
    "label.current": "현재:",
    "label.language": "언어",
    "label.volume": "볼륨",
    "lang.ko": "한국어",
    "lang.en": "English",
    "title.sfx": "효과음 ON/OFF",
    "title.volume": "효과음 볼륨",
    "button.darkMode": "🌙 다크모드",
    "button.lightMode": "☀️ 화이트모드",
    "nav.home": "홈",
    "nav.about": "사이트 소개",
    "nav.contact": "문의",
    "nav.privacy": "개인정보처리방침",
    "nav.terms": "이용약관",
    "nav.backHome": "← 메인으로",
    "footer.copyright": "© Mini Game Heaven",

    "title.index": "미니게임 천국 | 메인",
    "title.rps": "미니게임 천국 | 가위바위보",
    "title.omok": "미니게임 천국 | 오목",
    "title.lotto": "미니게임 천국 | 로또",
    "title.menu": "미니게임 천국 | 오늘 뭐 먹지",
    "title.about": "미니게임 천국 | 사이트 소개",
    "title.contact": "미니게임 천국 | 문의",
    "title.privacy": "미니게임 천국 | 개인정보처리방침",
    "title.terms": "미니게임 천국 | 이용약관",
    "aria.main": "메인",
    "aria.site": "사이트 안내",
    "aria.rps": "가위바위보",
    "aria.rpsGuide": "가위바위보 가이드",
    "aria.omok": "오목 난이도",
    "aria.omokGuide": "오목 가이드",
    "aria.lotto": "로또 추첨기",
    "aria.lottoCurrent": "현재 추천 번호",
    "aria.lottoHistory": "생성 기록",
    "aria.lottoGuide": "로또 가이드",
    "aria.menuGuide": "메뉴 추천 가이드",
    "aria.about": "사이트 소개",
    "aria.contact": "문의",
    "aria.privacy": "개인정보처리방침",
    "aria.terms": "이용약관",
    "meta.index": "가위바위보, 오목, 로또 추첨기, 오늘 뭐 먹지까지 한 곳에서 즐기는 미니게임 사이트입니다.",
    "meta.rps": "가위바위보 미니게임과 규칙, 전략 팁, 전적 기록을 제공하는 페이지입니다.",
    "meta.omok": "오목 미니게임 플레이와 승리 조건, 기본 전술을 안내하는 페이지입니다.",
    "meta.lotto": "로또 번호 추첨기와 사용 방법, 확률 안내를 제공하는 페이지입니다.",
    "meta.menu": "점심·저녁 메뉴를 랜덤으로 추천하는 오늘 뭐 먹지 미니게임입니다.",
    "meta.about": "미니게임 천국의 목적, 콘텐츠 원칙, 업데이트 계획을 소개합니다.",
    "meta.contact": "미니게임 천국 문의와 피드백 안내 페이지입니다.",
    "meta.privacy": "미니게임 천국 개인정보처리방침과 광고, 쿠키 사용 안내입니다.",
    "meta.terms": "미니게임 천국 이용약관과 서비스 이용 기준을 안내합니다.",

    "route.main": "메인",
    "route.rps": "가위바위보",
    "route.omok": "오목",
    "route.lotto": "로또",
    "route.menu": "오늘 뭐 먹지",
    "route.about": "사이트 소개",
    "route.contact": "문의",
    "route.privacy": "개인정보처리방침",
    "route.terms": "이용약관",

    "index.select.title": "게임 선택",
    "index.select.desc": "원하는 미니게임을 골라 플레이하세요.",
    "index.button.rps": "✌️ 가위바위보",
    "index.button.omok": "⚫ 오목",
    "index.button.lotto": "🎲 로또 추첨기",
    "index.button.menu": "🍽️ 오늘 뭐 먹지",
    "index.notice": "각 게임은 별도 페이지에서 실행됩니다.",
    "index.desc.title": "게임 설명",
    "index.desc.desc": "각 게임의 기본 규칙과 승리 조건을 확인하세요.",
    "index.game.rps.title": "가위바위보",
    "index.game.rps.desc": "가위·바위·보 중 하나를 선택해 상대와 승부를 겨루는 게임입니다. 같은 선택이면 무승부, 상대의 선택을 이기면 승리합니다.",
    "index.game.omok.title": "오목",
    "index.game.omok.desc": "바둑판 위에 돌을 번갈아 놓아 가로·세로·대각선으로 다섯 개의 돌을 먼저 연결하면 승리하는 게임입니다.",
    "index.game.lotto.title": "로또 추첨기",
    "index.game.lotto.desc": "1부터 45까지의 숫자 중 중복 없이 6개의 번호를 무작위로 추첨하는 방식의 번호 추천 게임입니다.",
    "index.game.menu.title": "오늘 뭐 먹지",
    "index.game.menu.desc": "버튼을 누르면 점심·저녁 식사 메뉴를 무작위로 추천해주는 간단한 게임입니다.",
    "index.site.title": "사이트 안내",
    "index.site.desc": "콘텐츠 품질과 사용자 경험을 최우선으로 운영합니다.",
    "index.site.principles.title": "콘텐츠 원칙",
    "index.site.principles.li1": "직접 제작한 미니게임과 설명을 제공합니다.",
    "index.site.principles.li2": "각 페이지에 규칙, 팁, FAQ를 제공해 이해를 돕습니다.",
    "index.site.principles.li3": "광고는 사용자 경험을 해치지 않는 위치에만 배치합니다.",
    "index.site.tech.title": "기술 및 접근성",
    "index.site.tech.li1": "PC/모바일에서 동일하게 동작하도록 반응형으로 구성했습니다.",
    "index.site.tech.li2": "로컬 환경에서도 실행 가능하며 개인정보 수집은 최소화합니다.",

    "rps.title": "가위바위보",
    "rps.desc": "가위, 바위, 보 중 하나를 선택해 상대와 승부를 겨루는 게임입니다. 같은 선택이면 무승부, 상대의 선택을 이기면 승리합니다.",
    "rps.reset": "기록 초기화",
    "rps.my": "내 선택",
    "rps.cpu": "상대",
    "rps.result.prompt": "선택해 주세요.",
    "rps.win": "승",
    "rps.draw": "무",
    "rps.lose": "패",
    "rps.choice.scissors": "가위",
    "rps.choice.rock": "바위",
    "rps.choice.paper": "보",
    "rps.button.scissors": "가위 ✌️",
    "rps.button.rock": "바위 ✊",
    "rps.button.paper": "보 🖐️",
    "rps.result.wait": "상대 선택 중…",
    "rps.result.win": "승리!",
    "rps.result.draw": "무승부!",
    "rps.result.lose": "패배!",
    "rps.log.win": "승",
    "rps.log.draw": "무",
    "rps.log.lose": "패",
    "rps.log.me": "나",
    "rps.log.cpu": "상대",
    "rps.tip.html": "팁: <span class=\"kbd\">R</span> 기록 초기화 / <span class=\"kbd\">ESC</span> 메인",
    "rps.history.title": "승부 기록",
    "rps.history.empty": "아직 기록이 없어요.",
    "rps.history.hint": "기록은 로컬스토리지에 저장됩니다.",
    "rps.guide.title": "게임 가이드",
    "rps.guide.desc": "기본 규칙, 승리 조건, 실전 팁을 한눈에 확인하세요.",
    "rps.guide.rules.title": "규칙 요약",
    "rps.guide.rules.li1": "가위는 보를 이기고, 보는 바위를 이기며, 바위는 가위를 이깁니다.",
    "rps.guide.rules.li2": "같은 선택이면 무승부가 됩니다.",
    "rps.guide.rules.li3": "전적은 브라우저 로컬스토리지에 저장됩니다.",
    "rps.guide.tips.title": "전략 팁",
    "rps.guide.tips.li1": "연속 패배 후에는 패턴을 끊는 선택을 시도해 보세요.",
    "rps.guide.tips.li2": "기록을 확인하며 선호 패턴을 분석해 볼 수 있습니다.",

    "omok.title": "오목",
    "omok.desc": "바둑판 위에 돌을 번갈아 놓아 가로·세로·대각선으로 다섯 개의 돌을 먼저 연결하면 승리하는 게임입니다.",
    "omok.level": "난이도:",
    "omok.level.easy": "쉬움",
    "omok.level.normal": "보통",
    "omok.level.hard": "어려움",
    "omok.canvas.label": "오목판",
    "omok.hint.html": "• 난이도는 즉시 적용됩니다(다음 AI 착수부터).<br>• <span class=\"kbd\">ESC</span> 메인",
    "omok.turn.user": "내 차례(흑)",
    "omok.turn.ai": "AI 차례(백)",
    "omok.history.empty": "아직 착수 없음",
    "omok.player.black": "흑(나)",
    "omok.player.white": "백(AI)",
    "omok.win.user": "내가 승리!",
    "omok.win.ai": "AI 승리!",
    "omok.undo": "되돌리기",
    "omok.newGame": "새 게임",
    "omok.moves.title": "착수 기록",
    "omok.shortcuts.html": "• 난이도는 즉시 적용됩니다(다음 AI 착수부터).<br>• <span class=\"kbd\">U</span>: 되돌리기 / <span class=\"kbd\">N</span>: 새 게임 / <span class=\"kbd\">ESC</span>: 메인",
    "omok.status.over": "게임 종료",
    "omok.status.draw": "무승부",
    "omok.status.forbidden": "금수입니다 ({reason})",
    "omok.reason.outside": "범위 밖",
    "omok.reason.occupied": "이미 돌이 있음",
    "omok.reason.overline": "장목(6목 이상)",
    "omok.reason.doubleFour": "44(사사)",
    "omok.reason.doubleThree": "33(삼삼)",
    "omok.guide.title": "게임 가이드",
    "omok.guide.desc": "기본 규칙과 전술 포인트를 정리했습니다.",
    "omok.guide.rules.title": "규칙 요약",
    "omok.guide.rules.li1": "가로·세로·대각선으로 돌 5개를 먼저 연결하면 승리합니다.",
    "omok.guide.rules.li2": "턴마다 한 개의 돌을 놓을 수 있습니다.",
    "omok.guide.rules.li3": "판 중앙을 선점하면 다양한 전개를 만들 수 있습니다.",
    "omok.guide.tips.title": "전술 팁",
    "omok.guide.tips.li1": "양쪽이 막히지 않은 3·4목을 만드는 것이 핵심입니다.",
    "omok.guide.tips.li2": "상대의 열린 4목은 즉시 차단하세요.",
    "omok.guide.tips.li3": "공격과 수비를 번갈아 균형 있게 운영하는 것이 중요합니다.",

    "lotto.title": "로또 번호 추첨기",
    "lotto.desc": "1부터 45까지의 숫자 중 중복 없이 6개의 번호를 무작위로 추첨하는 게임입니다.",
    "lotto.desc.sub": "추첨 버튼을 누르면 여러 세트의 로또 번호가 자동으로 생성됩니다.",
    "lotto.btn.pick": "🎲 번호 추첨하기",
    "lotto.btn.copy": "📋 현재 결과 복사",
    "lotto.btn.reset": "현재 화면 초기화",
    "lotto.btn.copyHistory": "📋 기록 전체 복사",
    "lotto.btn.clearHistory": "🧹 기록 전체 삭제",
    "lotto.meta.empty": "아직 생성되지 않았습니다.",
    "lotto.toast.drawing": "추첨 중… 🔄",
    "lotto.badge.drawing": "추첨 중",
    "lotto.badge.wait": "대기",
    "lotto.badge.done": "완료",
    "lotto.meta.time": "생성 시간: {time}",
    "lotto.toast.copied": "생성 기록 전체가 복사되었습니다.",
    "lotto.toast.cleared": "생성 기록이 모두 삭제되었습니다.",
    "lotto.toast.done": "완료! 🎉",
    "lotto.toast.error": "오류가 발생했어요. 다시 시도해주세요.",
    "lotto.toast.copyCurrent": "현재 결과 5세트가 복사되었습니다.",
    "lotto.toast.copyFail": "복사 실패. 브라우저 권한 설정을 확인하거나 수동으로 복사해주세요.",
    "lotto.toast.deletedOne": "기록 1개를 삭제했습니다.",
    "lotto.toast.copiedOne": "선택한 기록이 복사되었습니다.",
    "lotto.btn.copyItem": "📋 이 기록 복사",
    "lotto.btn.deleteItem": "🗑️ 삭제",
    "lotto.confirm.clear": "생성 기록을 전부 삭제할까요? (되돌릴 수 없음)",
    "lotto.history.title": "생성 기록",
    "lotto.hint.html": "• 기록은 브라우저 로컬스토리지에 저장됩니다.<br/>• “기록 전체 삭제”는 되돌릴 수 없습니다.<br/>• <span class=\"kbd\">ESC</span> 메인",
    "lotto.guide.title": "게임 가이드",
    "lotto.guide.desc": "추첨 방식과 사용 팁을 정리했습니다.",
    "lotto.guide.rules.title": "추첨 방식",
    "lotto.guide.rules.li1": "1~45 사이의 숫자에서 중복 없이 6개를 무작위로 선택합니다.",
    "lotto.guide.rules.li2": "추첨 결과는 참고용이며 당첨을 보장하지 않습니다.",
    "lotto.guide.rules.li3": "기록은 로컬스토리지에 저장됩니다.",
    "lotto.guide.tips.title": "사용 팁",
    "lotto.guide.tips.li1": "여러 조합을 비교해 다양성을 높여보세요.",
    "lotto.guide.tips.li2": "동일 숫자 패턴의 반복 사용은 피하는 것이 좋습니다.",

    "menu.title": "오늘 뭐 먹지",
    "menu.sub": "점심·저녁 메뉴를 랜덤으로 추천합니다.",
    "menu.button.pick": "🍽️ 메뉴 추천",
    "menu.result.prompt": "버튼을 눌러주세요",
    "menu.result.choosing": "고르는 중…",
    "menu.hero.title": "메뉴 추천 게임",
    "menu.hero.desc": "버튼을 누르면 오늘 먹을 메뉴를 하나 추천해드립니다.",
    "menu.guide.title": "추천 가이드",
    "menu.guide.desc": "추천 방식과 활용 팁을 확인하세요.",
    "menu.guide.rules.title": "추천 방식",
    "menu.guide.rules.li1": "메뉴 목록에서 무작위로 하나를 선택합니다.",
    "menu.guide.tips.title": "활용 팁",
    "menu.guide.tips.li1": "팀 점심 회의 전에 버튼을 눌러 빠르게 결정할 수 있습니다.",
    "menu.guide.tips.li2": "여러 번 추천을 눌러 후보를 3~5개로 좁혀 보세요.",

    "about.title": "미니게임 천국이란?",
    "about.desc": "가볍게 즐길 수 있는 미니게임을 한 곳에 모아 제공하는 웹사이트입니다.",
    "about.goal.title": "콘텐츠 목적",
    "about.goal.li1": "간단하고 직관적인 게임을 누구나 즐길 수 있도록 제공합니다.",
    "about.goal.li2": "각 게임에 규칙, 팁, 가이드를 추가해 이해를 돕습니다.",
    "about.goal.li3": "광고는 사용자 경험을 해치지 않도록 최소화합니다.",
    "about.policy.title": "운영 원칙",
    "about.policy.li1": "직접 제작한 콘텐츠를 바탕으로 사이트를 운영합니다.",
    "about.policy.li2": "오류 수정과 기능 개선을 꾸준히 반영합니다.",
    "about.policy.li3": "사용자의 피드백을 바탕으로 게임을 확장합니다.",

    "privacy.title": "개인정보처리방침",
    "privacy.desc": "본 사이트는 최소한의 정보만 사용하며, 투명하게 안내합니다.",
    "privacy.collect.title": "수집하는 정보",
    "privacy.collect.li1": "회원가입이나 로그인 기능이 없어 개인정보를 직접 수집하지 않습니다.",
    "privacy.collect.li2": "게임 기록/설정은 브라우저 로컬스토리지에 저장됩니다.",
    "privacy.ads.title": "광고 및 쿠키",
    "privacy.ads.li1": "본 사이트는 Google AdSense를 사용하며 쿠키가 활용될 수 있습니다.",
    "privacy.ads.li2": "사용자는 브라우저 설정에서 쿠키를 관리하거나 차단할 수 있습니다.",
    "privacy.ads.li3": "Google의 광고 기술은 개인 맞춤형 광고에 사용될 수 있습니다.",
    "privacy.contact.title": "문의",
    "privacy.contact.li1": "문의: shuma0115@gmail.com",

    "terms.title": "이용약관",
    "terms.desc": "서비스 이용 시 지켜야 할 기본 기준을 안내합니다.",
    "terms.service.title": "서비스 제공",
    "terms.service.li1": "본 사이트는 무료로 미니게임을 제공합니다.",
    "terms.service.li2": "서비스 품질 개선을 위해 예고 없이 업데이트될 수 있습니다.",
    "terms.limit.title": "이용 제한",
    "terms.limit.li1": "사이트 기능을 악의적으로 방해하는 행위를 금지합니다.",
    "terms.limit.li2": "저작권 보호를 위해 콘텐츠의 무단 복제/배포를 금지합니다.",
    "terms.disclaimer.title": "면책",
    "terms.disclaimer.li1": "게임 결과는 오락용이며, 특정 결과를 보장하지 않습니다.",
    "terms.disclaimer.li2": "외부 링크 또는 광고를 통한 손해에 대해 책임지지 않습니다.",

    "contact.title": "문의하기",
    "contact.desc": "오류 제보, 개선 요청, 제휴 문의를 환영합니다.",
    "contact.info.title": "연락처",
    "contact.info.li1": "이메일: shuma0115@gmail.com",
    "contact.info.li2": "가능하면 사용 중인 브라우저와 페이지명을 함께 알려주세요.",
    "contact.response.title": "응답 안내",
    "contact.response.li1": "평일 기준 1~3일 내 답변을 목표로 합니다.",
    "contact.response.li2": "접수된 피드백은 순차적으로 반영됩니다."
  },
  en: {
    "site.name": "Mini Game Heaven",
    "label.current": "Current:",
    "label.language": "Language",
    "label.volume": "Volume",
    "lang.ko": "Korean",
    "lang.en": "English",
    "title.sfx": "Sound effects on/off",
    "title.volume": "Sound effects volume",
    "button.darkMode": "🌙 Dark mode",
    "button.lightMode": "☀️ Light mode",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.privacy": "Privacy Policy",
    "nav.terms": "Terms",
    "nav.backHome": "← Back to Home",
    "footer.copyright": "© Mini Game Heaven",

    "title.index": "Mini Game Heaven | Home",
    "title.rps": "Mini Game Heaven | Rock Paper Scissors",
    "title.omok": "Mini Game Heaven | Omok",
    "title.lotto": "Mini Game Heaven | Lotto",
    "title.menu": "Mini Game Heaven | What Should I Eat?",
    "title.about": "Mini Game Heaven | About",
    "title.contact": "Mini Game Heaven | Contact",
    "title.privacy": "Mini Game Heaven | Privacy Policy",
    "title.terms": "Mini Game Heaven | Terms",
    "aria.main": "Home",
    "aria.site": "Site info",
    "aria.rps": "Rock Paper Scissors",
    "aria.rpsGuide": "RPS guide",
    "aria.omok": "Omok difficulty",
    "aria.omokGuide": "Omok guide",
    "aria.lotto": "Lotto draw",
    "aria.lottoCurrent": "Current number sets",
    "aria.lottoHistory": "Draw history",
    "aria.lottoGuide": "Lotto guide",
    "aria.menuGuide": "Menu guide",
    "aria.about": "About",
    "aria.contact": "Contact",
    "aria.privacy": "Privacy policy",
    "aria.terms": "Terms",
    "meta.index": "Play rock paper scissors, omok, lotto draw, and menu picker in one place.",
    "meta.rps": "Rock paper scissors game with rules, tips, and match records.",
    "meta.omok": "Omok mini game with win conditions and basic tactics.",
    "meta.lotto": "Lotto number draw with usage guidance and probability notes.",
    "meta.menu": "Random lunch and dinner menu picker mini game.",
    "meta.about": "Learn about Mini Game Heaven, its goals, and content principles.",
    "meta.contact": "Contact and feedback information for Mini Game Heaven.",
    "meta.privacy": "Privacy policy, ads, and cookie usage for Mini Game Heaven.",
    "meta.terms": "Terms of service and usage guidelines for Mini Game Heaven.",

    "route.main": "Home",
    "route.rps": "Rock Paper Scissors",
    "route.omok": "Omok",
    "route.lotto": "Lotto",
    "route.menu": "What Should I Eat?",
    "route.about": "About",
    "route.contact": "Contact",
    "route.privacy": "Privacy Policy",
    "route.terms": "Terms",

    "index.select.title": "Choose a Game",
    "index.select.desc": "Pick a mini game and start playing.",
    "index.button.rps": "✌️ Rock Paper Scissors",
    "index.button.omok": "⚫ Omok",
    "index.button.lotto": "🎲 Lotto Draw",
    "index.button.menu": "🍽️ What Should I Eat?",
    "index.notice": "Each game runs on its own page.",
    "index.desc.title": "Game Overview",
    "index.desc.desc": "Check the basic rules and win conditions for each game.",
    "index.game.rps.title": "Rock Paper Scissors",
    "index.game.rps.desc": "Choose rock, paper, or scissors and compete. Same choice is a draw. Beat the opponent to win.",
    "index.game.omok.title": "Omok",
    "index.game.omok.desc": "Place stones and connect five in a row horizontally, vertically, or diagonally to win.",
    "index.game.lotto.title": "Lotto Draw",
    "index.game.lotto.desc": "Randomly draws 6 unique numbers from 1 to 45 as a recommendation.",
    "index.game.menu.title": "What Should I Eat?",
    "index.game.menu.desc": "Get a random lunch or dinner suggestion with one click.",
    "index.site.title": "Site Info",
    "index.site.desc": "We prioritize content quality and user experience.",
    "index.site.principles.title": "Content Principles",
    "index.site.principles.li1": "We provide original mini games and explanations.",
    "index.site.principles.li2": "Each page includes rules, tips, and guidance for clarity.",
    "index.site.principles.li3": "Ads are placed carefully to avoid hurting the experience.",
    "index.site.tech.title": "Tech & Accessibility",
    "index.site.tech.li1": "Responsive layout for desktop and mobile.",
    "index.site.tech.li2": "Runs locally with minimal data collection.",

    "rps.title": "Rock Paper Scissors",
    "rps.desc": "Choose rock, paper, or scissors to play. Same choice is a draw; beat your opponent to win.",
    "rps.reset": "Reset Record",
    "rps.my": "You",
    "rps.cpu": "Opponent",
    "rps.result.prompt": "Make a choice.",
    "rps.win": "W",
    "rps.draw": "D",
    "rps.lose": "L",
    "rps.choice.scissors": "Scissors",
    "rps.choice.rock": "Rock",
    "rps.choice.paper": "Paper",
    "rps.button.scissors": "Scissors ✌️",
    "rps.button.rock": "Rock ✊",
    "rps.button.paper": "Paper 🖐️",
    "rps.result.wait": "Opponent is choosing…",
    "rps.result.win": "You win!",
    "rps.result.draw": "Draw!",
    "rps.result.lose": "You lose!",
    "rps.log.win": "W",
    "rps.log.draw": "D",
    "rps.log.lose": "L",
    "rps.log.me": "You",
    "rps.log.cpu": "CPU",
    "rps.tip.html": "Tip: <span class=\"kbd\">R</span> reset / <span class=\"kbd\">ESC</span> home",
    "rps.history.title": "Match History",
    "rps.history.empty": "No history yet.",
    "rps.history.hint": "History is stored in localStorage.",
    "rps.guide.title": "Game Guide",
    "rps.guide.desc": "Quick rules, win conditions, and tips at a glance.",
    "rps.guide.rules.title": "Rules",
    "rps.guide.rules.li1": "Rock beats scissors, scissors beats paper, paper beats rock.",
    "rps.guide.rules.li2": "Same choice results in a draw.",
    "rps.guide.rules.li3": "Records are stored in localStorage.",
    "rps.guide.tips.title": "Tips",
    "rps.guide.tips.li1": "After losses, break your own pattern to reset momentum.",
    "rps.guide.tips.li2": "Review history to spot tendencies.",

    "omok.title": "Omok",
    "omok.desc": "Connect five stones in a row horizontally, vertically, or diagonally to win.",
    "omok.level": "Difficulty:",
    "omok.level.easy": "Easy",
    "omok.level.normal": "Normal",
    "omok.level.hard": "Hard",
    "omok.canvas.label": "Omok board",
    "omok.hint.html": "• Difficulty applies immediately (next AI move).<br>• <span class=\"kbd\">ESC</span> home",
    "omok.turn.user": "Your turn (Black)",
    "omok.turn.ai": "AI turn (White)",
    "omok.history.empty": "No moves yet",
    "omok.player.black": "Black (You)",
    "omok.player.white": "White (AI)",
    "omok.win.user": "You win!",
    "omok.win.ai": "AI wins!",
    "omok.undo": "Undo",
    "omok.newGame": "New game",
    "omok.moves.title": "Move History",
    "omok.shortcuts.html": "• Difficulty applies immediately (next AI move).<br>• <span class=\"kbd\">U</span>: undo / <span class=\"kbd\">N</span>: new game / <span class=\"kbd\">ESC</span>: home",
    "omok.status.over": "Game over",
    "omok.status.draw": "Draw",
    "omok.status.forbidden": "Forbidden move ({reason})",
    "omok.reason.outside": "Out of range",
    "omok.reason.occupied": "Cell already occupied",
    "omok.reason.overline": "Overline (6 or more)",
    "omok.reason.doubleFour": "Double four",
    "omok.reason.doubleThree": "Double three",
    "omok.guide.title": "Game Guide",
    "omok.guide.desc": "Rules and tactical points at a glance.",
    "omok.guide.rules.title": "Rules",
    "omok.guide.rules.li1": "Connect five stones in a row to win.",
    "omok.guide.rules.li2": "You can place one stone per turn.",
    "omok.guide.rules.li3": "Control the center to open options.",
    "omok.guide.tips.title": "Tips",
    "omok.guide.tips.li1": "Create open threes and fours to pressure.",
    "omok.guide.tips.li2": "Block the opponent's open four immediately.",
    "omok.guide.tips.li3": "Balance offense and defense.",

    "lotto.title": "Lotto Draw",
    "lotto.desc": "Randomly draws 6 unique numbers from 1 to 45.",
    "lotto.desc.sub": "Press the draw button to generate multiple sets.",
    "lotto.btn.pick": "🎲 Draw Numbers",
    "lotto.btn.copy": "📋 Copy Current",
    "lotto.btn.reset": "Reset Current",
    "lotto.btn.copyHistory": "📋 Copy All History",
    "lotto.btn.clearHistory": "🧹 Clear History",
    "lotto.meta.empty": "No results yet.",
    "lotto.toast.drawing": "Drawing… 🔄",
    "lotto.badge.drawing": "Drawing",
    "lotto.badge.wait": "Waiting",
    "lotto.badge.done": "Done",
    "lotto.meta.time": "Generated at: {time}",
    "lotto.toast.copied": "All history copied.",
    "lotto.toast.cleared": "History cleared.",
    "lotto.toast.done": "Done! 🎉",
    "lotto.toast.error": "An error occurred. Please try again.",
    "lotto.toast.copyCurrent": "Current 5 sets copied.",
    "lotto.toast.copyFail": "Copy failed. Check browser permissions or copy manually.",
    "lotto.toast.deletedOne": "Deleted one record.",
    "lotto.toast.copiedOne": "Selected record copied.",
    "lotto.btn.copyItem": "📋 Copy this record",
    "lotto.btn.deleteItem": "🗑️ Delete",
    "lotto.confirm.clear": "Clear all history? This cannot be undone.",
    "lotto.history.title": "History",
    "lotto.hint.html": "• History is stored in localStorage.<br/>• “Clear History” cannot be undone.<br/>• <span class=\"kbd\">ESC</span> home",
    "lotto.guide.title": "Game Guide",
    "lotto.guide.desc": "How it works and tips.",
    "lotto.guide.rules.title": "How it works",
    "lotto.guide.rules.li1": "Randomly picks 6 unique numbers from 1–45.",
    "lotto.guide.rules.li2": "Results are for reference and do not guarantee winnings.",
    "lotto.guide.rules.li3": "History is stored in localStorage.",
    "lotto.guide.tips.title": "Tips",
    "lotto.guide.tips.li1": "Compare multiple sets for variety.",
    "lotto.guide.tips.li2": "Avoid repeating the same number patterns.",

    "menu.title": "What Should I Eat?",
    "menu.sub": "Get a random lunch or dinner pick.",
    "menu.button.pick": "🍽️ Pick a Menu",
    "menu.result.prompt": "Press the button",
    "menu.result.choosing": "Choosing…",
    "menu.hero.title": "Menu Picker",
    "menu.hero.desc": "Press the button to get a menu suggestion for today.",
    "menu.guide.title": "Suggestion Guide",
    "menu.guide.desc": "How it works and tips.",
    "menu.guide.rules.title": "How it works",
    "menu.guide.rules.li1": "Randomly selects one item from the list.",
    "menu.guide.tips.title": "Tips",
    "menu.guide.tips.li1": "Use before team lunch to decide quickly.",
    "menu.guide.tips.li2": "Pick 3–5 options and choose together.",

    "about.title": "What is Mini Game Heaven?",
    "about.desc": "A place to enjoy simple mini games in one spot.",
    "about.goal.title": "Content Goal",
    "about.goal.li1": "Provide simple, intuitive games for everyone.",
    "about.goal.li2": "Include rules, tips, and guides for clarity.",
    "about.goal.li3": "Minimize ads to protect experience.",
    "about.policy.title": "Operating Principles",
    "about.policy.li1": "Run the site with original content.",
    "about.policy.li2": "Continuously fix bugs and improve features.",
    "about.policy.li3": "Expand games based on feedback.",

    "privacy.title": "Privacy Policy",
    "privacy.desc": "We use minimal data and communicate transparently.",
    "privacy.collect.title": "Data We Collect",
    "privacy.collect.li1": "No accounts; we do not collect personal data directly.",
    "privacy.collect.li2": "Game records/settings are stored in localStorage.",
    "privacy.ads.title": "Ads & Cookies",
    "privacy.ads.li1": "This site uses Google AdSense, which may use cookies.",
    "privacy.ads.li2": "You can manage or block cookies in your browser settings.",
    "privacy.ads.li3": "Google ads may be personalized based on your activity.",
    "privacy.contact.title": "Contact",
    "privacy.contact.li1": "Contact: shuma0115@gmail.com",

    "terms.title": "Terms of Service",
    "terms.desc": "Basic rules for using the service.",
    "terms.service.title": "Service",
    "terms.service.li1": "We provide mini games for free.",
    "terms.service.li2": "Updates may occur without prior notice.",
    "terms.limit.title": "Restrictions",
    "terms.limit.li1": "Do not disrupt site functions maliciously.",
    "terms.limit.li2": "Do not copy or distribute content without permission.",
    "terms.disclaimer.title": "Disclaimer",
    "terms.disclaimer.li1": "Game outcomes are for entertainment only.",
    "terms.disclaimer.li2": "We are not liable for damages from external links or ads.",

    "contact.title": "Contact Us",
    "contact.desc": "We welcome bug reports, improvement requests, and partnerships.",
    "contact.info.title": "Contact Info",
    "contact.info.li1": "Email: shuma0115@gmail.com",
    "contact.info.li2": "Please include your browser and page name.",
    "contact.response.title": "Response Time",
    "contact.response.li1": "We aim to respond within 1–3 business days.",
    "contact.response.li2": "Feedback is reviewed and applied in order."
  }
};

let CURRENT_LANG = localStorage.getItem(LANG_KEY) || "ko";

const htmlEl = document.documentElement;

let audioCtx = null;
function getAudioCtx(){
  if(!audioCtx){
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if(!Ctx) return null;
    audioCtx = new Ctx();
  }
  return audioCtx;
}
async function ensureAudio(){
  const ctx = getAudioCtx();
  if(!ctx) return null;
  if(ctx.state === "suspended"){
    try{ await ctx.resume(); }catch{}
  }
  return ctx;
}

let SFX_ENABLED = (localStorage.getItem(SFX_ON_KEY) ?? "1") === "1";
let SFX_VOL = Number(localStorage.getItem(SFX_VOL_KEY) ?? "70"); // 0~100

function vol(x){
  if(!SFX_ENABLED) return 0;
  const v = Math.max(0, Math.min(1, SFX_VOL/100));
  return x * v;
}

function t(key, vars){
  const dict = I18N[CURRENT_LANG] || I18N.ko;
  let str = dict[key] ?? key;
  if(vars){
    Object.entries(vars).forEach(([k,v]) => {
      str = str.replaceAll(`{${k}}`, String(v));
    });
  }
  return str;
}

function applyLanguage(lang){
  CURRENT_LANG = I18N[lang] ? lang : "ko";
  localStorage.setItem(LANG_KEY, CURRENT_LANG);
  htmlEl.setAttribute("data-lang", CURRENT_LANG);
  htmlEl.setAttribute("lang", CURRENT_LANG);
  const dict = I18N[CURRENT_LANG] || I18N.ko;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if(dict[key]) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.dataset.i18nHtml;
    if(dict[key]) el.innerHTML = dict[key];
  });
  document.querySelectorAll("[data-i18n-title]").forEach(el => {
    const key = el.dataset.i18nTitle;
    if(dict[key]) el.setAttribute("title", dict[key]);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach(el => {
    const key = el.dataset.i18nAria;
    if(dict[key]) el.setAttribute("aria-label", dict[key]);
  });
  document.querySelectorAll("meta[name=\"description\"][data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if(dict[key]) el.setAttribute("content", dict[key]);
  });

  const titleEl = document.querySelector("title[data-i18n]");
  if(titleEl){
    const key = titleEl.dataset.i18n;
    if(dict[key]) titleEl.textContent = dict[key];
  }

  const theme = htmlEl.getAttribute("data-theme") || "dark";
  const label = theme === "dark" ? t("button.lightMode") : t("button.darkMode");
  document.querySelectorAll("[data-theme-toggle]").forEach(btn => btn.textContent = label);

  window.dispatchEvent(new CustomEvent("langchange", { detail: CURRENT_LANG }));
}

function applyTheme(theme){
  htmlEl.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  const label = theme === "dark" ? t("button.lightMode") : t("button.darkMode");
  document.querySelectorAll("[data-theme-toggle]").forEach(btn => btn.textContent = label);
}
function toggleTheme(){
  const current = htmlEl.getAttribute("data-theme") || "dark";
  applyTheme(current === "dark" ? "light" : "dark");
}

function initHeader(routeKey){
  const routeNameEl = document.getElementById("routeName");
  if(routeNameEl && routeKey){
    routeNameEl.setAttribute("data-i18n", routeKey);
    routeNameEl.textContent = t(routeKey);
  }

  const themeBtn = document.getElementById("themeToggle");
  if(themeBtn){
    themeBtn.setAttribute("data-theme-toggle","1");
    themeBtn.addEventListener("click", toggleTheme);
  }
  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(savedTheme);

  const langSelect = document.getElementById("langSelect");
  if(langSelect){
    langSelect.value = CURRENT_LANG;
    langSelect.addEventListener("change", () => {
      applyLanguage(langSelect.value);
    });
  }

  const sfxToggleEl = document.getElementById("sfxToggle");
  const sfxVolEl = document.getElementById("sfxVol");

  if(sfxToggleEl){
    sfxToggleEl.checked = SFX_ENABLED;
    sfxToggleEl.addEventListener("change", () => {
      SFX_ENABLED = sfxToggleEl.checked;
      localStorage.setItem(SFX_ON_KEY, SFX_ENABLED ? "1" : "0");
    });
  }
  if(sfxVolEl){
    sfxVolEl.value = String(SFX_VOL);
    sfxVolEl.addEventListener("input", () => {
      SFX_VOL = Number(sfxVolEl.value);
      localStorage.setItem(SFX_VOL_KEY, String(SFX_VOL));
    });
  }

  applyLanguage(CURRENT_LANG);
}

window.t = t;
window.applyLanguage = applyLanguage;

function sfxRpsStart(){
  const ctx = getAudioCtx(); if(!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(()=>{});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.20), t);
  master.connect(ctx.destination);

  const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate*0.18), ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i] = (Math.random()*2-1) * (1 - i/d.length);

  const noise = ctx.createBufferSource(); noise.buffer = noiseBuf;
  const hp = ctx.createBiquadFilter(); hp.type="highpass"; hp.frequency.setValueAtTime(600, t);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol(0.18), t+0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t+0.18);

  noise.connect(hp); hp.connect(g); g.connect(master);
  noise.start(t); noise.stop(t+0.19);
  master.gain.linearRampToValueAtTime(0.0001, t+0.22);
}
function sfxRpsTick(){
  const ctx = getAudioCtx(); if(!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(()=>{});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.09), t);
  master.connect(ctx.destination);

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "square";
  o.frequency.setValueAtTime(520 + Math.random()*120, t);

  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol(0.14), t+0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, t+0.04);

  o.connect(g); g.connect(master);
  o.start(t); o.stop(t+0.05);
  master.gain.linearRampToValueAtTime(0.0001, t+0.06);
}

function sfxWinFanfare(){
  const ctx = getAudioCtx(); if(!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(()=>{});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.20), t);
  master.connect(ctx.destination);

  function tone(freq, start, dur, type="sine", amp=0.14){
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol(amp), start+0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start+dur);
    o.connect(g); g.connect(master);
    o.start(start); o.stop(start+dur+0.03);
  }
  tone(523.25, t, 0.18, "square", 0.10);
  tone(659.25, t+0.08, 0.20, "square", 0.10);
  tone(783.99, t+0.16, 0.25, "square", 0.10);
  tone(1046.5, t+0.24, 0.30, "triangle", 0.09);

  const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate*0.35), ctx.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for(let i=0;i<d.length;i++) d[i] = (Math.random()*2-1) * (1 - i/d.length);
  const noise = ctx.createBufferSource(); noise.buffer = noiseBuf;
  const bp = ctx.createBiquadFilter(); bp.type="bandpass"; bp.frequency.setValueAtTime(2500, t); bp.Q.setValueAtTime(1.1, t);
  const ng = ctx.createGain(); ng.gain.setValueAtTime(0.0001, t); ng.gain.exponentialRampToValueAtTime(vol(0.10), t+0.02); ng.gain.exponentialRampToValueAtTime(0.0001, t+0.35);
  noise.connect(bp); bp.connect(ng); ng.connect(master);
  noise.start(t); noise.stop(t+0.36);

  master.gain.linearRampToValueAtTime(0.0001, t+0.7);
}

function sfxLoseSad(){
  const ctx = getAudioCtx(); if(!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(()=>{});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.22), t);
  master.connect(ctx.destination);

  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(380, t);
  o.frequency.exponentialRampToValueAtTime(180, t+0.45);

  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol(0.18), t+0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t+0.50);

  const lp = ctx.createBiquadFilter();
  lp.type="lowpass";
  lp.frequency.setValueAtTime(900, t);
  lp.frequency.exponentialRampToValueAtTime(420, t+0.45);

  o.connect(lp); lp.connect(g); g.connect(master);
  o.start(t); o.stop(t+0.52);
  master.gain.linearRampToValueAtTime(0.0001, t+0.6);
}

function sfxStonePlace(){
  const ctx = getAudioCtx(); if(!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(()=>{});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.40), t);
  master.connect(ctx.destination);

  const o1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  o1.type="sine";
  o1.frequency.setValueAtTime(190, t);
  o1.frequency.exponentialRampToValueAtTime(95, t+0.09);
  g1.gain.setValueAtTime(0.0001, t);
  g1.gain.exponentialRampToValueAtTime(vol(0.28), t+0.008);
  g1.gain.exponentialRampToValueAtTime(0.0001, t+0.16);
  o1.connect(g1); g1.connect(master);
  o1.start(t); o1.stop(t+0.18);

  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type="square";
  o2.frequency.setValueAtTime(1400 + Math.random()*260, t);
  g2.gain.setValueAtTime(0.0001, t);
  g2.gain.exponentialRampToValueAtTime(vol(0.14), t+0.002);
  g2.gain.exponentialRampToValueAtTime(0.0001, t+0.045);
  o2.connect(g2); g2.connect(master);
  o2.start(t); o2.stop(t+0.06);

  master.gain.linearRampToValueAtTime(0.0001, t+0.22);
}

function startRollingSound(durationSec = 5.0, volumeBase = 0.32) {
  const ctx = getAudioCtx();
  if (!ctx) return null;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  const t0 = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(volumeBase), t0);
  master.connect(ctx.destination);

  const rumble = ctx.createOscillator();
  const rumbleGain = ctx.createGain();
  rumble.type = "sine";
  rumble.frequency.setValueAtTime(55, t0);
  rumble.frequency.linearRampToValueAtTime(62, t0 + durationSec);

  rumbleGain.gain.setValueAtTime(0.0, t0);
  rumbleGain.gain.linearRampToValueAtTime(vol(0.22), t0 + 0.15);
  rumbleGain.gain.linearRampToValueAtTime(vol(0.12), t0 + durationSec);
  rumbleGain.gain.linearRampToValueAtTime(0.0001, t0 + durationSec + 0.12);

  rumble.connect(rumbleGain);
  rumbleGain.connect(master);

  const noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * durationSec), ctx.sampleRate);
  const data = noiseBuf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuf;

  const band = ctx.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.setValueAtTime(1200, t0);
  band.Q.setValueAtTime(0.7, t0);

  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(2.2, t0);
  lfoGain.gain.setValueAtTime(320, t0);

  lfo.connect(lfoGain);
  lfoGain.connect(band.frequency);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0, t0);
  noiseGain.gain.linearRampToValueAtTime(vol(0.20), t0 + 0.2);
  noiseGain.gain.linearRampToValueAtTime(vol(0.14), t0 + durationSec);
  noiseGain.gain.linearRampToValueAtTime(0.0001, t0 + durationSec + 0.12);

  noise.connect(band);
  band.connect(noiseGain);
  noiseGain.connect(master);

  const clickGain = ctx.createGain();
  clickGain.gain.setValueAtTime(vol(0.55), t0);
  clickGain.connect(master);

  const clickInterval = setInterval(() => {
    if(!SFX_ENABLED) return;
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(220 + Math.random() * 180, now);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(vol(0.12), now + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    o.connect(g);
    g.connect(clickGain);
    o.start(now);
    o.stop(now + 0.04);
  }, 70 + Math.floor(Math.random() * 60));

  rumble.start(t0);
  noise.start(t0);
  lfo.start(t0);

  const stopAt = t0 + durationSec;
  rumble.stop(stopAt + 0.2);
  noise.stop(stopAt + 0.2);
  lfo.stop(stopAt + 0.2);

  const stopTimer = setTimeout(() => {
    clearInterval(clickInterval);
    clearTimeout(stopTimer);
  }, Math.ceil((durationSec + 0.3) * 1000));

  return {
    stop: () => {
      try { clearInterval(clickInterval); } catch {}
      try { master.gain.cancelScheduledValues(ctx.currentTime); } catch {}
      try { master.gain.setValueAtTime(master.gain.value, ctx.currentTime); } catch {}
      try { master.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.08); } catch {}
    }
  };
}

function playTick() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.38), t);
  master.connect(ctx.destination);

  const o1 = ctx.createOscillator();
  const g1 = ctx.createGain();
  o1.type = "square";
  o1.frequency.setValueAtTime(760, t);

  g1.gain.setValueAtTime(0.0001, t);
  g1.gain.exponentialRampToValueAtTime(vol(0.22), t + 0.003);
  g1.gain.exponentialRampToValueAtTime(0.0001, t + 0.055);

  o1.connect(g1);
  g1.connect(master);

  const o2 = ctx.createOscillator();
  const g2 = ctx.createGain();
  o2.type = "triangle";
  o2.frequency.setValueAtTime(1500, t);

  g2.gain.setValueAtTime(0.0001, t);
  g2.gain.exponentialRampToValueAtTime(vol(0.10), t + 0.002);
  g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);

  o2.connect(g2);
  g2.connect(master);

  o1.start(t); o2.start(t);
  o1.stop(t + 0.07);
  o2.stop(t + 0.05);

  master.gain.linearRampToValueAtTime(0.0001, t + 0.09);
}

function playFinishChime() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  const t = ctx.currentTime;

  const master = ctx.createGain();
  master.gain.setValueAtTime(vol(0.22), t);
  master.connect(ctx.destination);

  function ding(freq, start, dur) {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(vol(0.18), start + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g); g.connect(master);
    o.start(start);
    o.stop(start + dur + 0.02);
  }

  ding(1046.5, t, 0.22);
  ding(1318.5, t + 0.08, 0.22);
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function cryptoRandomId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return "id_" + Math.random().toString(16).slice(2) + "_" + Date.now(); // 확실한게 아니야
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    window.location.href = "index.html";
  }
});
