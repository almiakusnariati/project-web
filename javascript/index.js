
let openShopping = document.querySelector('.shopping'); // Merupakan elemen yang ketika diklik akan mengaktifkan fitur "shopping" dengan menambahkan kelas "active" ke elemen body.
let closeShopping = document.querySelector('.closeShopping');//  Merupakan elemen yang ketika diklik akan menonaktifkan fitur "shopping" dengan menghapus kelas "active" dari elemen body.
let list = document.querySelector('.list'); // Merupakan elemen yang akan menampung daftar produk yang dapat dibeli.
let listCard = document.querySelector('.listCard'); // Merupakan elemen yang akan menampung daftar produk yang sudah ditambahkan ke dalam keranjang belanja.
let body = document.querySelector('body'); // Merupakan elemen body dari halaman web.
let total = document.querySelector('.total'); // Merupakan elemen yang menampilkan total harga semua produk dalam keranjang belanja.
let quantity = document.querySelector('.quantity'); // Merupakan elemen yang menampilkan jumlah total produk dalam keranjang belanja.

openShopping.addEventListener('click', ()=>{ // Menambahkan event listener untuk mengaktifkan fitur "shopping" ketika tombol openShopping diklik. Saat tombol diklik, kelas "active" akan ditambahkan ke elemen body, sehingga fitur "shopping" menjadi aktif.
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{ //  Menambahkan event listener untuk menonaktifkan fitur "shopping" ketika tombol closeShopping diklik. Saat tombol diklik, kelas "active" akan dihapus dari elemen body, sehingga fitur "shopping" ditutup.
    body.classList.remove('active');
})


let products;

let listCards  = [];
function createProductElement(value, key) { //  Membuat elemen HTML yang merepresentasikan suatu produk berdasarkan data value dan key yang diterima. 
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
  
    let imgElement = document.createElement('img'); 
    imgElement.src = value.image;
    newDiv.appendChild(imgElement);
  
    let titleElement = document.createElement('div'); 
    titleElement.classList.add('title');
    titleElement.textContent = value.title;
    newDiv.appendChild(titleElement);
  
    let priceElement = document.createElement('div'); 
    priceElement.classList.add('price');
    priceElement.textContent ="$"+ value.price.toLocaleString(); 
    newDiv.appendChild(priceElement);
  
    let buttonElement = document.createElement('button'); 
    buttonElement.textContent = 'Add to card';
    buttonElement.onclick = function() {
      addToCard(key);
    };
    newDiv.appendChild(buttonElement); 
  
    return newDiv; 
  }
  
  function initApp() {
    fetch("https://fakestoreapi.com/products") // untuk mendapatkan data produk dari API
  .then((res) => res.json())
  .then((data) => {
    products = data;    
    products.forEach((value, key) => {
      let productElement = createProductElement(value, key); //
      list.appendChild(productElement);
    });
  })
    // Assuming 'products' is already defined
   
  }
  
initApp(); //


function addToCard(key){ // Menambahkan produk ke dalam keranjang belanja dengan menyimpan data produk ke dalam array listCards.
    if(listCards[key] == null){
        // salin daftar formulir produk ke kartu daftar
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}

function createCardElement(value, key) { 
    let newDiv = document.createElement('li');
  
    let imgDiv = document.createElement('div');
    let imgElement = document.createElement('img');
    imgElement.src = value.image;
    imgDiv.appendChild(imgElement);
    newDiv.appendChild(imgDiv);
  
    let nameDiv = document.createElement('div');
    nameDiv.textContent = value.title;
    newDiv.appendChild(nameDiv);
  
    let priceDiv = document.createElement('div');
    priceDiv.textContent = '$'+value.price.toLocaleString();
    newDiv.appendChild(priceDiv);
  
    let quantityDiv = document.createElement('div');
    let minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.onclick = function () {
      changeQuantity(key, value.quantity - 1);
    };
    quantityDiv.appendChild(minusButton);
  
    let countDiv = document.createElement('div');
    countDiv.classList.add('count');
    countDiv.textContent = value.quantity;
    quantityDiv.appendChild(countDiv);
  
    let plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.onclick = function () {
      changeQuantity(key, value.quantity + 1);
    };
    quantityDiv.appendChild(plusButton);
    newDiv.appendChild(quantityDiv);
    return newDiv;
  }
  function reloadCard() {
    while (listCard.firstChild) {
      listCard.removeChild(listCard.firstChild);
    }
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
      if (value != null) {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        let cardElement = createCardElement(value, key);
        listCard.appendChild(cardElement);
      }
    });
    total.textContent ='$'+ totalPrice.toLocaleString();
    quantity.textContent = count;
  }
  function changeQuantity(key, quantity) {
    if (quantity === 0) {
      delete listCards[key];
    } else {
      listCards[key].quantity = quantity;
      listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}