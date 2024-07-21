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

let productArr;
localStorage.productArr != null
  ? (productArr = JSON.parse(localStorage.productArr))
  : (productArr = []);

// save Category
const saveCategory = () => {
  let objCategory = {
    categoryName: categoryName.value,
  };
  categoryArr = [...categoryArr, objCategory];
  localStorage.setItem("categoryArr", JSON.stringify(categoryArr));
  restCate();
  showCate();
  showCateTable();
  showCountCate();
};
// Rest
const restCate = () => {
  categoryName.value = "";
};

// Show Cate
const showCate = () => {
  let item = "";
  item += `
    <option selected>Select Category...</option>`;

  categoryArr.map((i) => {
    return (item += `
      <option>${i.categoryName}</option>`);
  });
  category.innerHTML = item;
};

// Show Category Table
const showCateTable = () => {
  let item = "";
  categoryArr.map((i, index) => {
    return (item += `
        <tr>
            <td class="text-center">${index}</td>
            <td class="text-center">${i.categoryName}</td>
            <td class="text-center">
              <button class="btn btn-danger btn-sm" onclick="deleteCate(${index})">
                <i class="fas fa-trash"></i>
              </button>
            </td>
        <tr>`);
  });
  document.getElementById("cateTable").innerHTML = item;
};

// Delete Cate
const deleteCate = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      categoryArr = categoryArr.filter((_, index) => index !== id);
      localStorage.categoryArr = JSON.stringify(categoryArr);
    }
    showCate();
    showCateTable();
    showCountCate();
  });
};

// Show Count Cate
const showCountCate = () => {
  const modelTitle = document.getElementById("modelTitle");
  modelTitle.innerHTML = `Total Category: (${categoryArr.length})`;
};

// Total Count
const totalCount = () => {
  if (price.value > 0) {
    const ToTal = quantity.value * price.value - discount.value;
    total.value = ToTal;
    total.className.replace = "form-control bg-danger text-white";
    total.className = "form-control bg-success text-white";
  } else {
    total.value = 0;
    total.className.replace = "form-control bg-success text-white";
    total.className = "form-control bg-danger text-white";
  }
};

// Save Product
const saveProduct = () => {
  const objProduct = {
    category: category.value,
    productName: productName.value,
    price: price.value,
    quantity: quantity.value,
    discount: discount.value,
    total: total.value,
  };
  productArr.push(objProduct);
  localStorage.setItem("productArr", JSON.stringify(productArr));
};

$(document).ready(function () {
  showCate();
  showCateTable();
  showCountCate();
  $("#dataTable").DataTable();
});
