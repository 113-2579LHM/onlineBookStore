$(function () {
    /*错误class  form-control is-invalid
    正确class  form-control is-valid*/
    var flagName = false;
    var flagPas = false;
    var flagPass = false;
    /*验证用户名*/
    var name, passWord, passWords;
    $("#register-username").change(function () {
        name = $("#register-username").val();
        if (name.length < 2 || name.length > 10) {
            $("#register-username").removeClass("form-control is-valid")
            $("#register-username").addClass("form-control is-invalid");
            flagName = false;
        } else {
            $("#register-username").removeClass("form-control is-invalid")
            $("#register-username").addClass("form-control is-valid");
            flagName = true;
        }
    })
    /*验证密码*/
    $("#register-password").change(function () {
        passWord = $("#register-password").val();
        if (passWord.length < 6 || passWord.length > 18) {
            $("#register-password").removeClass("form-control is-valid")
            $("#register-password").addClass("form-control is-invalid");
            flagPas = false;
        } else {
            $("#register-password").removeClass("form-control is-invalid")
            $("#register-password").addClass("form-control is-valid");
            flagPas = true;
        }
    })
    /*验证确认密码*/
    $("#register-passwords").change(function () {
        passWords = $("#register-passwords").val();
        if ((passWord != passWords) || (passWords.length < 6 || passWords.length > 18)) {
            $("#register-passwords").removeClass("form-control is-valid")
            $("#register-passwords").addClass("form-control is-invalid");
            flagPass = false;
        } else {
            $("#register-passwords").removeClass("form-control is-invalid")
            $("#register-passwords").addClass("form-control is-valid");
            flagPass = true;
        }
    })


    $("#regbtn").click(async function () {
        if (flagName && flagPas && flagPass) {
            const hashedPassword = await hashPassword(passWord);
            localStorage.setItem('user.' + name, hashedPassword);
            alert("注册成功");
            location = "index.html";
        } else {
            if (!flagName) {
                $("#register-username").addClass("form-control is-invalid");
            }
            if (!flagPas) {
                $("#register-password").addClass("form-control is-invalid");
            }
            if (!flagPass) {
                $("#register-passwords").addClass("form-control is-invalid");
            }
        }
    })
    async function hashPassword(password) {
        const msgUint8 = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
      }

})
