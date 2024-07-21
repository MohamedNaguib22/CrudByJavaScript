// Selector By IDS
const categoryName = document.getElementById("categoryName");
const category = document.getElementById("category");
const productName = document.getElementById("productName");
const quantity = document.getElementById("quantity");
const price = document.getElementById("price");
const discount = document.getElementById("discount");
const total = document.getElementById("total");

let categoryArr;
localStorage.categoryArr != null
  ? (categoryArr = JSON.parse(localStorage.categoryArr))
  : (categoryArr = []);

// save Category
// const saveCategory = () => {
//   let objCategory = {
//     categoryName: categoryName.value,
//   };
//   categoryArr.push(objCategory);
//   localStorage.setItem("categoryArr", JSON.stringify(categoryArr));
//   restCate();
//   showCate();
//   showCateTable();
// };

// // Rest
// const restCate = () => {
//   categoryName.value = "";
// };

// // Show Cate
// const showCate = () => {
//   let item = "";
//   item += `
//     <option selected>Select Category...</option>`;

//   categoryArr.map((i) => {
//     return (item += `
//       <option>${i.categoryName}</option>`);
//   });
//   category.innerHTML = item;
// };

// // Show Category Table
// const showCateTable = () => {
//   let item = "";
//   categoryArr.map((i, index) => {
//     return (item += `
//         <tr>
//             <td class="text-center">${index}</td>
//             <td class="text-center">${i.categoryName}</td>
//             <td class="text-center">
//               <button class="btn btn-danger btn-sm">
//                 <i class="fas fa-trash"></i>
//               </button>
//             </td>
//         <tr>`);
//   });
//   document.getElementById("cateTable").innerHTML = item;
// };

// Delete Cate 

$(document).ready(function () {
  showCate();
  showCateTable();
  $("#dataTable").DataTable();
});
