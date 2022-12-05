// const add = (a, b = undefined) => {
//   if (b) {
//     return a + b;
//   } else {
//     return a;
//   }
// };

// console.log(add(1));
// console.log(add(5, 2));

const productsList = [
  { nom: "produit 1", prix: 100 },
  { nom: "produit 2", prix: 200 },
  { nom: "produit 3", prix: 300 },
  { nom: "produit 4", prix: 400 },
];

const calculPrice = (array) => {
  let value = 0;
  array.forEach((e) => {
    value = value + e.prix;
  });
  return value;
};

console.log(calculPrice(productsList));
