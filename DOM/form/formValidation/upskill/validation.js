// Function error mess
function error(id) {
    let user = document.querySelector(id);
    var box_error = user.parentElement.querySelector(".box-error");

    box_error.classList.remove('d-none');
    user.classList.add('input-error');
}
// Function valid
function valid(id) {
    let user = document.querySelector(id);
    var box_error = user.parentElement.querySelector(".box-error");

    box_error.classList.add('d-none');
    user.classList.remove('input-error');
}


// Hàm bắt buộc người dùng phải nhập vào input
function isRequied(id) {
    let user = document.querySelector(id);
    // 2.Code xử lí trạng thái input khi người dùng blur ra ngoài
    user.onblur = function () {

        // Code xử lí trạng thái input khi người dùng k tương tác gì với thẻ input mà đã blur ra ngoài, 
        // vì nó được dùng nhiều lần cho các input có type khác nhau nên sẽ được đút vào 
        //hàm error_function():
        if (user.value == '') {
            error(id);
        }
        else {
            valid(id);
        }
    }
    // 1.Code xử lí trạng thái input khi người dùng tương tác, vẫn là gọi function như error:
    user.oninput = function () {
        error_function(id);
    }
}

// Hàm check email:
function isMail(id) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = document.querySelector(id);
    email.onblur = function () {
        return regex.test(email.value) ? valid(id) : error(id);
    }
}

// Hàm check cf pass:
function cfPass(idPass, idCfPass) {
    let pass = document.querySelector(idPass);
    let cfPass = document.querySelector(idCfPass);
    var box_error = cfPass.parentElement.querySelector(".box-error");

    let turn1 = true; // Check lần điền đầu tiên 
    pass.onblur = function () { // Pass blur
        if (turn1) {
            return valid(idCfPass); // K báo lỗi ở cfpass vs lần nhập pass đầu tiên
        }
        // Return lỗi &  disabled nút submit
        return pass.value == cfPass.value ? valid(idCfPass) & validSubmit(true) : error(idCfPass) & validSubmit(false);
    }

    cfPass.onblur = function () {
        return pass.value == cfPass.value ? valid(idCfPass) & validSubmit(true) : error(idCfPass) & validSubmit(false);
    }

    cfPass.oninput = function () {
        turn1 = false; // Xác nhận đã điền lần đầu tiên
        box_error.classList.add('d-none');
        pass.classList.remove('input-error');
    }
}


// hàm check số lượng kí tự yêu cầu (minlength Attribute):
function minlength(id, str) {
    let element = document.querySelector(id);
    let box_error = element.parentElement.querySelector(".box-error");
    let minLenghtValue = element.getAttribute("minlength");

    element.onblur = function () {
        if (element.value.length == 0) {
            error(id);
            return box_error.innerText = str;
        }

        else if (element.value.length < minLenghtValue) {
            error(id);
            return box_error.innerText = "Pls lengthen this text to " + minLenghtValue + " charaters";
        }

        else {
            valid(id);
            return box_error.innerText = "";
        }
    }

    element.oninput = function () {
        valid(id);
    }
}

// Hàm validSubmit():
function validSubmit(bool) {
    let button = document.querySelector("#submit");
    return bool == true ? button.disabled = false : button.disabled = true;
}