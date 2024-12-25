// общие для всех страниц скрипты сюда

function checkSession() {
    if (activeSession == false) {
        // добавить открытие login.html
        window.location.href = "login.html";
    }
    // иначе открыть account.html
}