function Calculate() {
    let inputNum = parseInt(document.getElementById("inputNum").value);
    document.getElementById("result").value = CalculateA(inputNum, inputNum).toString();
}

function CalculateZ() {
    let inputX = parseInt(document.getElementById("inputX").value);
    let inputY = parseInt(document.getElementById("inputY").value);
    document.getElementById("outputZ").value = CalculateC(inputX, inputY).toString();
}

function CalculateA(m, n) {
    let result = 1;
    while (m > 0) {
        result *= n;
        m--;
        n--;
    }
    return result;
}

function CalculateC(m, n) {
    let Amn = CalculateA(m, n);
    let Amm = CalculateA(m, m);
    return Amn / Amm;
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    // Loop over them and prevent submission 
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})()