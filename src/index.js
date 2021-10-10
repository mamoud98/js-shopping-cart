const Product = require("./app");
//
function row(item) {
  let cards = document.querySelector("#cards");

  cards.innerHTML += `<div class="card mb-3" >
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="${item.image}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">${item.title}</h5>
                                    <p class="card-text">${item.description}</p>
                                    <div class="d-flex justify-content-between align-items-center " >
                                    <p class="card-text"><small class=" text-success fs-2 ">${item.price} $</small></p>
                                    <button type="button" onclick="add(${item.id},${item.price})" class="btn btn-outline-primary" data-id="${item.id}">Add to Card</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
}
//
Product.list().then((response) => {
  let data = response.data;

  for (let i in data) {
    row(data[i]);
  }
});
//

let arrayOfProduct = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("cart")) {
  arrayOfProduct = JSON.parse(localStorage.getItem("cart"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

function tableCard(item) {
  let table = document.querySelector("table tbody");
  table.innerHTML += `<tr>
    <th > product x${item.id}</th>
    <td>${item.price * item.count} $</td>
    <td>${item.count} </td>
    <td style="color:red; cursor: pointer;" onclick="remove(${item.id})">X</td>
</tr>`;
}
//
function TotalOfPrice() {
  var total = arrayOfProduct
    .map((data) => {
      return data.price * data.count;
    })
    .reduce((previousValue, currentValue) => {
      return previousValue + currentValue;
    }, 0);
  if (total) {
    return total;
  }
  return 0;
}

//
function totalCred() {
  let table = document.querySelector("table tbody");
  table.innerHTML += `<tr>
    <th > Total</th>
    <td>${TotalOfPrice()} $</td>
    <td></td>
    <td></td>
</tr>`;
}
//

window.remove = function (id) {
  arrayOfProduct = arrayOfProduct.filter((task) => task.id !== id);
  addDataToLocalStorageFrom(arrayOfProduct);
  addElementsToPageFrom(arrayOfProduct);
};
//
window.add = function (id, price) {
  // Task Data
  const product = {
    id,
    price,
    count: 1,
  };

  for (let i = 0; i < arrayOfProduct.length; i++) {
    if (arrayOfProduct[i].id == id) {
      incTheCounter(id);
      addElementsToPageFrom(arrayOfProduct);
      return;
    }
  }

  arrayOfProduct.push(product);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfProduct);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfProduct);
};
//

function addElementsToPageFrom(arrayOfProduct) {
  let table = document.querySelector("table tbody");
  // Empty Tasks Div
  table.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfProduct.forEach((task) => {
    tableCard(task);
  });
  totalCred();
}

function addDataToLocalStorageFrom(arrayOfProduct) {
  window.localStorage.setItem("cart", JSON.stringify(arrayOfProduct));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("cart");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}
//
function incTheCounter(taskId) {
  for (let i = 0; i < arrayOfProduct.length; i++) {
    if (arrayOfProduct[i].id == taskId) {
      arrayOfProduct[i].count += 1;
    }
  }
  addDataToLocalStorageFrom(arrayOfProduct);
}
