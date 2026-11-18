/* 밥풀 식재료 8종 – 이름·가격·기본 바코드는 여기서 바꾸면 됩니다 */
window.ITEMS = [
 {
  "id": "buldak",
  "name": "까르보불닭",
  "unit": "개",
  "price": 1800,
  "img": "/pos/buldak.png",
  "code": "8809990000012"
 },
 {
  "id": "mu",
  "name": "무",
  "unit": "개",
  "price": 2500,
  "img": "/pos/mu.png",
  "code": "8809990000081"
 },
 {
  "id": "daepa",
  "name": "파",
  "unit": "단",
  "price": 2900,
  "img": "/pos/daepa.png",
  "code": "8809990000043"
 },
 {
  "id": "icecream",
  "name": "구슬아이스크림",
  "unit": "개",
  "price": 2500,
  "img": "/pos/icecream.png",
  "code": "8809990000036"
 },
 {
  "id": "samgak",
  "name": "삼각김밥",
  "unit": "개",
  "price": 1300,
  "img": "/pos/samgak.png",
  "code": "8809990000029"
 },
 {
  "id": "banana",
  "name": "바나나",
  "unit": "송이",
  "price": 3900,
  "img": "/pos/banana.png",
  "code": "8809990000098"
 },
 {
  "id": "apple",
  "name": "사과",
  "unit": "개",
  "price": 2200,
  "img": "/pos/apple.png",
  "code": "8809990000104"
 },
 {
  "id": "egg",
  "name": "계란",
  "unit": "개",
  "price": 4980,
  "img": "/pos/egg.png",
  "code": "8809990000050"
 }
];
window.ITEM = Object.fromEntries(window.ITEMS.map(i => [i.id, i]));
window.qtyText = (it, n) => it.unit === '단' ? (n === 1 ? '한 단' : n + '단') : n + it.unit;
