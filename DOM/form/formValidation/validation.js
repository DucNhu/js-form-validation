// Dinh nghia doi tuong
function Validator(obj) {
    // Lay ra form nguoi dung blur
    var formElement = document.querySelector(obj.form);
    
    // Hàm check lỗi
    function validate(inputElement, rule) {
        // console.log(rule)
        // Biến error được gắn giá trị của hàm isRequied()? undefined : "Enter your email, pls",
        // Sẽ dùng để check xem có xảy ra lỗi hay không, nếu underfined thì else xảy ra!!!
        let error = rule.functionCheck(inputElement.value); // Gọi function check, vj tri function: trong obj của mảng đó
        let boxError_Element = inputElement.parentElement.querySelector(".box-error"); // Lấy tất cả element có class box-error

        if (error) {
            boxError_Element.classList.remove("d-none");
            inputElement.classList.add("input-error");
        }
        else {
            boxError_Element.classList.add("d-none");
            inputElement.classList.remove("input-error");
        }
    }


    if (formElement) {
        // Nhặt ra element mà người dùng blur (chú ý key "rules" là 1 array)
        obj.rules.forEach(element => { //Element lúc này là object của element,
            //  mảng 0 của array là gọi thuộc tính isRequied ( thực chất là hàm),
            // mà hàm này nó return về 1 obj (line 37) nên tham số element trả về 1 obj (gồm những key, value trong return dòng 37).
            // gắn giá trị cho biến inputElement là element của form được blur
            let inputElement = formElement.querySelector(element.selector);
            // Nếu có element đó:
            if (inputElement) {
                // Khi blur nó, function sẽ chạy
                inputElement.onblur = function () {
                    validate(inputElement, element);
                }

                // Khi go input, textarea
                inputElement.oninput = function () {
                    let boxError_Element = inputElement.parentElement.querySelector(".box-error"); // Lấy tất cả element có class box-error

                    boxError_Element.classList.add("d-none");
                    inputElement.classList.remove("input-error");
                }
            }
        });
    }
}

// Dinh nghia is requied
Validator.isRequied = function (selector) {
    return { // return về 1 obj
        selector: selector, // return element id
        functionCheck: function (value) {
            return value.trim() ? undefined : true;
        }
    };
}

// Dinh nghia emai
Validator.isEmail = function (selector) {
    return {
        selector: selector,
        functionCheck: function(value) {
            const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return regex.test(value) ? undefined : "Enter your mail, pls";
        }
    };
}