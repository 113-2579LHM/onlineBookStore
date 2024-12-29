$(document).ready(function () {

    checkLoginStatus();

    'use strict';

    $('.form-validate').each(function () {
        $(this).validate({
            errorElement: "div",
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            ignore: ':hidden:not(.summernote, .checkbox-template, .form-control-custom),.note-editable.card-block',
            errorPlacement: function (error, element) {
                // Add the `invalid-feedback` class to the error element
                error.addClass("invalid-feedback");
                console.log(element);
                if (element.prop("type") === "checkbox") {
                    error.insertAfter(element.siblings("label"));
                }
                else {
                    error.insertAfter(element);
                }
            }
        });

    });

    // ------------------------------------------------------- //
    // Material Inputs
    // ------------------------------------------------------ //

    var materialInputs = $('input.input-material');

    // activate labels for prefilled values
    materialInputs.filter(function () { return $(this).val() !== ""; }).siblings('.label-material').addClass('active');

    // move label on focus
    materialInputs.on('focus', function () {
        $(this).siblings('.label-material').addClass('active');
    });

    // remove/keep label on blur
    materialInputs.on('blur', function () {
        $(this).siblings('.label-material').removeClass('active');

        if ($(this).val() !== '') {
            $(this).siblings('.label-material').addClass('active');
        } else {
            $(this).siblings('.label-material').removeClass('active');
        }
    });


    $(function () {
        /*登录*/
        $("#login").click(async function () {
            console.log("login");
            var userName = $("#login-username").val();
            var passWord = $("#login-password").val();

            const hashedPassword = await hashPassword(passWord);

            /*获取当前输入的账号密码*/
            const storedPassword = localStorage.getItem('user.' + userName);
            if (storedPassword && storedPassword === hashedPassword) {
                alert("登录成功");
                location = "/";
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("currentUser", userName);
            } else {
                alert("用户名或密码错误");
                $("#login-username").addClass("form-control is-invalid");
                $("#login-password").addClass("form-control is-invalid");
            }
        })

        async function hashPassword(password) {
            const msgUint8 = new TextEncoder().encode(password);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        }
    });
});

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const currentUser = localStorage.getItem("currentUser");

    if (isLoggedIn === "true" && currentUser) {
        alert(`欢迎回来, ${currentUser}!`);
        location = "/";
    } else {
        console.log("未登录");
    }
}