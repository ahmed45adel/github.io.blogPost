let key = localStorage.getItem('id');
//console.log(key)
let url = "https://jsonplaceholder.typicode.com/posts";
$(document).ready(function () {
    $.ajax(`${url}/${key}`, {
        type: "GET",
        success: function (res) {
            //console.log(res)
            $(".title").val((JSON.stringify(res.title)))
            $(".post").val((JSON.stringify(res.body)))
        },
        error: function () {
            console.log("error");
        },
    });
})

/* update */
$('input:submit').on("click", function (e) {
    e.preventDefault();
    if ($(".title").val() && $(".post").val()) {
        $.ajax(`${url}/${key}`, {
            type: "PUT",
            data: {
                title: $(".title").val(),
                body: $(".post").val(),
            },
            success: function () {
                window.location.href = `index.html`;
                console.log("updated")
            },
            error: function () {
                console.log("error");
            },
        });
    } else {
        alert("enter valid data");
    }
})