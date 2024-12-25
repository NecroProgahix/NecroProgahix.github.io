// общие для всех страниц скрипты сюда

let activeSession = false;

function checkSession() {
    if (activeSession == false) {
        // добавить открытие login.html
        window.location.href = "login.html";
    }
    // иначе открыть account.html
}

function addToCart(productName, price) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} добавлен в корзину.`);
}
