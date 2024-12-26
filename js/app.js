// общие для всех страниц скрипты сюда

let activeSession = localStorage.getItem("activeSession");

function checkSession(callback) {
    if (activeSession == false) {
        // добавить открытие login.html
        console.log(callback);
        window.location.href = "login.html";
        if (callback == true) { return true ; } //
    }
    // иначе открыть account.html
}

function cartRedirect() {
    if (activeSession == false) {
        window.location.href = "login.html";
    }
    else { window.location.href = "cart.html";
        activeSession = true;
    }
}

function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${name} добавлен в корзину.`);
    
}

const dbName = 'ProductsDB'; // тяжёлая игрушка
const dbVersion = 1;

function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, dbVersion);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('products')) {
                const store = db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
                store.createIndex('name', 'name', { unique: false });
                store.createIndex('price', 'price', { unique: false });
                store.createIndex('image', 'image', { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// для первоначального добавления
async function addProducts(db) {
    const products = [
        { name: "Iphone 14", price: "599", image: "img/200px-IPhone_14.webp" },
        { name: "MacBook Air", price: "1199", image: "img/300px-MacBook_Air_(15-inch,_M3,_2024).webp" },
        { name: "Ipad Air 4", price: "599", image: "img/300px-IPad_Air_(5th_generation).webp" },
        { name: "AirPods Pro 2", price: "249", image: "img/300px-AirPods_Pro_(2nd_generation).webp" },
        { name: "XPS 13", price: "999", image: "img/notebook-xps-13-9345-t-gray-gallery-2.avif" }
    ];

    const transaction = db.transaction('products', 'readwrite');
    const store = transaction.objectStore('products');

    const existingProducts = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    products.forEach(product => {
        if (!existingProducts.some(existing => existing.name === product.name)) {
            store.add(product);
        }
    });
}
