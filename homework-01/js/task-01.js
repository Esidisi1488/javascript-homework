const categories = document.querySelector('#categories');
const categoriesNumber = categories.children.length;
console.log("В списке", categoriesNumber, "категории");

const categoriesChildren = categories.children;
// for(let i =0;i < categoriesChildren.length; i+=1){
//     console.log("Категория:", categoriesChildren[i].firstElementChild.innerHTML);
//     const categoriesChildrenNum = categoriesChildren[i].lastElementChild;
//     console.log("Количество элементов:", categoriesChildrenNum.children.length);
// };

for(const catChild of categoriesChildren){
    console.log("Категория:", catChild.firstElementChild.textContent);
    const categoriesChildrenNum = catChild.lastElementChild;
    console.log("Количество элементов:", categoriesChildrenNum.children.length);
}