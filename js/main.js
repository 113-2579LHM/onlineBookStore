$(document).ready(function () {

    fetch('/navigation/navigation.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            return fetch('/navigation/footer.html');
        })
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            // 检查用户是否已登录
            checkLoginStatus();
        })
        .catch(error => console.error('导航栏加载异常:', error));
});

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("currentUser");

    if (isLoggedIn === "true" && currentUser) {
        ;
    } else {
        location = "/login.html";
    }
}