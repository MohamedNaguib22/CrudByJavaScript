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
            <td class="text-center">${index + 1}</td>
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
    category: category.options[category.selectedIndex].text,
    productName: productName.value,
    price: price.value,
    quantity: quantity.value,
    discount: discount.value,
    total: total.value,
  };
  productArr.push(objProduct);
  localStorage.setItem("productArr", JSON.stringify(productArr));
  restProduct();
  showCountProduct();
  showProductTable();
};

// Rest Product input
const restProduct = () => {
  category.selectedIndex = 0;
  productName.value = "";
  price.value = 0;
  quantity.value = 0;
  discount.value = 0;
  total.value = 0;
};

// showCountProduct
const showCountProduct = () => {
  const modelTitle = document.getElementById("title");
  modelTitle.innerHTML = `CRUD Operation: Total Product (${productArr.length})`;
};
// show product table
const showProductTable = () => {
  if (productArr.length === 0) {
    // Display "No product" message
    document.getElementById(
      "productTable"
    ).innerHTML = `<tr><td class="text-center" colspan="9">No product Found..........</td></tr>`;
  } else {
    item = "";
    productArr.map((i, index) => {
      return (item += `
        <tr>
              <td>${index + 1}</td>
              <td>${i.category}</td>
              <td>${i.productName}</td>
              <td>${i.quantity}</td>
              <td>${i.price}</td>
              <td>${i.discount}</td>
              <td>${i.total}</td>
              <td>
                <button class="btn buttons btn-sm">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            
      `);
    });
    document.getElementById("productTable").innerHTML = item;
  }
};

// Delete Products
const deleteProduct = (id) => {
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
      productArr.splice(id, 1);
      localStorage.productArr = JSON.stringify(productArr);
    }
    showProductTable();
    showCountProduct();
  });
};

$(document).ready(function () {
  showCate();
  showCateTable();
  showCountCate();
  showCountProduct();
  showProductTable();
  $("#dataTable").DataTable();
});
