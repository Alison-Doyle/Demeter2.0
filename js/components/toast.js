export function DisplayToast(message, type) {
    // Choose toast color
    let toastColor = "";
    if (type === 'e') {
        toastColor = "#AF3508";
    }
    else {
        toastColor ="#4A686D";
    }

    Toastify({
        text: message,
        duration: 1500,
        newWindow: true,
        close: false,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: toastColor,
        },
        onClick: function () { } // Callback after click
    }).showToast();
}