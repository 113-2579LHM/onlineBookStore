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
        document.getElementById("user-name").innerHTML = "欢迎，" + localStorage.getItem("currentUser");

        document.getElementById("user-icon").src = "/img/user2.gif";
        document.getElementById("user-icon").style = "width: 65px;";

        document.getElementById("user-icon-href").href = "/personalCenter/";

        document.getElementById("login-btn-a").href = "#";
        document.getElementById("login-btn-a").onclick = logOut;

        document.getElementById("login-btn").innerHTML = "退出登录";
        
        ;
    } else {
        // location = "/login.html";
    }
}

function logOut() {
    localStorage.setItem("isLoggedIn", "false");
    location.reload();
}