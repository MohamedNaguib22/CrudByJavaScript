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

let confirmClick = "create";
let idProduct;

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
    confirmButtonColor: "#296073",
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

// Validation Category
const validCategory = () => {
  if (categoryName.value.length === 0) {
    
      Swal.fire({
        title: "Please enter a valid category?",
        icon: "error",
        confirmButtonColor: "#296073",
      });
    return false;
  } else {
    saveCategory();
    return true;
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
  if (confirmClick === "edit") {
    productArr = productArr.map((i, index) =>
      index === idProduct ? { ...objProduct } : i
    );
    // productArr[idProduct] = objProduct
  } else {
    productArr.push(objProduct);
  }
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
  let item = "";
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
                <button class="btn buttons btn-sm" onclick="editProduct(${index})">
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
};

// Delete Products
const deleteProduct = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#296073",
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

// Edit Product

const editProduct = (id) => {
  const findIndex = productArr.find((_, index) => index === id);
  category.value = findIndex.category;
  productName.value = findIndex.productName;
  price.value = findIndex.price;
  quantity.value = findIndex.quantity;
  discount.value = findIndex.discount;
  total.value = findIndex.total;
  idProduct = id;
  confirmClick = "edit";
};

$(document).ready(function () {
  showCate();
  showCateTable();
  showCountCate();
  showCountProduct();
  showProductTable();
  $("#dataTable").DataTable();
});
