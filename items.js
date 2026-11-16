/* 밥풀 식재료 7종 – 이름·가격·기본 바코드는 여기서 바꾸면 됩니다 */
window.ITEMS = [
 {
  "id": "buldak",
  "name": "까르보 불닭",
  "unit": "개",
  "price": 1800,
  "img": "/pos/buldak.png",
  "code": "8809990000012"
 },
 {
  "id": "samgak",
  "name": "참치마요 삼각김밥",
  "unit": "개",
  "price": 1300,
  "img": "/pos/samgak.png",
  "code": "8809990000029"
 },
 {
  "id": "icecream",
  "name": "구슬 아이스크림",
  "unit": "개",
  "price": 2500,
  "img": "/pos/icecream.png",
  "code": "8809990000036"
 },
 {
  "id": "daepa",
  "name": "대파",
  "unit": "단",
  "price": 2900,
  "img": "/pos/daepa.png",
  "code": "8809990000043"
 },
 {
  "id": "egg",
  "name": "계란",
  "unit": "개",
  "price": 4980,
  "img": "/pos/egg.png",
  "code": "8809990000050"
 },
 {
  "id": "milk",
  "name": "우유",
  "unit": "개",
  "price": 2700,
  "img": "/pos/milk.png",
  "code": "8809990000067"
 },
 {
  "id": "hetbahn",
  "name": "햇반",
  "unit": "개",
  "price": 1600,
  "img": "/pos/hetbahn.png",
  "code": "8809990000074"
 }
];
window.ITEM = Object.fromEntries(window.ITEMS.map(i => [i.id, i]));
window.qtyText = (it, n) => it.unit === '단' ? (n === 1 ? '한 단' : n + '단') : n + it.unit;
