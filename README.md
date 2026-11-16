# 밥풀 프로토타입 v2

디자인 원본 이미지(1206px, @3x)를 그대로 쓰고 터치 영역과 모션만 얹은 모바일 웹 프로토타입입니다.

## 폴더
```
index.html / style.css / app.js / data.js   ← 동작 코드
manifest.webmanifest, icon-*.png              ← 홈 화면에 추가용
assets/s/      화면 이미지 (81개)
assets/ui/     탭바·팝업·칩·이모지 등 부품 (89개)
assets/reels/  릴스 위 UI 레이어 (10개)
reels/         릴스 영상 5개 (H.264로 변환)
```

## 화면 흐름
- 스플래시 → 온보딩 4장(스와이프) → 로그인 → 개인화 1~6 → 홈
- 탭바: 홈 / 레시피(릴스) / 커뮤니티 / 밥푸리 / MY
- 레시피: 릴스 위아래 스와이프(5개 무한 반복) → 이 레시피로 만들기(시트) → 레시피 상세 → 조리모드 → 요리완료
- 특정 화면 바로 열기: 주소 뒤에 `#home`, `#reels`, `#cmain`, `#amain`, `#my`, `#fr_cold` 등

## GitHub 업로드 팁
GitHub 웹 업로드는 한 번에 100개까지라서 폴더별로 나눠 올리세요.
1. 맨 위 파일 8개 + `reels` 폴더
2. `assets/s` 폴더
3. `assets/ui` 폴더 + `assets/reels` 폴더
