const ingredients = [
  'Картошка',
  'Грибы',
  'Чеснок',
  'Помидоры',
  'Зелень',
  'Приправы',
];

const ingredientsSelector = document.querySelector('#ingredients');
let ingredientsContainer = [];
for(const ingred of ingredients){
  let item = document.createElement("li");
  item.textContent = ingred;
  ingredientsContainer.push(item);
}

ingredientsSelector.append(...ingredientsContainer);