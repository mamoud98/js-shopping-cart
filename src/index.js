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
var TotalOfPrice = function () {
  const dataLocal = localStorage.getItem("cart");
  const newData = JSON.parse(dataLocal);

  if (newData !== null) {
    var total = newData
      .map((data) => {
        return data.price * data.count;
      })
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      });
    return total;
  } else {
    return 0;
  }
};

console.log(TotalOfPrice());
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
Product.list().then((response) => {
  let data = response.data;

  for (let i in data) {
    row(data[i]);
  }
});
//
function listCart() {
  const dataLocal = localStorage.getItem("cart");
  const newData = JSON.parse(dataLocal);
  console.log(newData);
  if (newData !== null) {
    for (const element of newData) {
      tableCard(element);
    }
  }
  totalCred();
}
listCart();
//

window.remove = function (id) {
  const dataLocal = localStorage.getItem("cart");
  const newData = JSON.parse(dataLocal);
  const afterDelete = newData.filter((data) => {
    return data.id !== id;
  });
  let jsonStr = JSON.stringify(afterDelete);
  localStorage.setItem("cart", jsonStr);
  location.reload();
};
//
window.add = function (id, price) {
  let localData = localStorage.getItem("cart");

  var cart = {
    id,
    price,
    count: 1,
  };
  if (JSON.parse(localData) === null) {
    let array = [cart];
    let jsonStr = JSON.stringify(array);
    localStorage.setItem("cart", jsonStr);
    location.reload();
  } else {
    for (data of JSON.parse(localData)) {
      if (data.id === id) {
        var incPrice = {
          id: data.id,
          price: data.price,
          count: data.count + 1,
        };
        let newDD = JSON.parse(localData).filter((dataa) => {
          return dataa.id !== id;
        });
        console.log(newDD);
        let array = [].concat(newDD);
        array.push(incPrice);
        let jsonStr = JSON.stringify(array);
        localStorage.setItem("cart", jsonStr);
        location.reload();
        return;
      }
    }

    let array = [].concat(JSON.parse(localData));
    array.push(cart);
    let jsonStr = JSON.stringify(array);
    localStorage.setItem("cart", jsonStr);
    location.reload();
  }
};
//
