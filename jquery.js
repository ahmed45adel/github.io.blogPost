
let url = "https://jsonplaceholder.typicode.com/posts";
// display data
$.ajax(url, {
    type: "GET",
    success: function (response) {
        $.each(response, function (index, ele) {
            var templateHTML = ""
            templateHTML = `
                <li  keyid='${ele.id}' >
                <h3>${ele.title}</h3>
                <p>${ele.body}</p>
                <button class="edit" keyid='${ele.id}'  >Edit</button>
                <button class="delete" keyid='${ele.id}' >Delete</button>
                </li>
                `
            $("#dataList").append(templateHTML)

        })
    },
    error: function (error) {
        console.log(error)
    },
});

/* edit button and redirect to form page */

$('#dataList').on('click', '.edit', function () {
    // get id of clicked button
    let keyid = $(this).attr('keyid'); // get button id
    // console.log(keyid)
    $.ajax({
        url: `${url}/${keyid}`,
        type: "GET",
        context: $('.edit'), // scope
        success: (response) => {
            console.log("sent id:", keyid)
            localStorage.setItem("id", keyid);
            window.location.href = 'editPost.html'; // redirect instead of <a> tag
        },
        error: function (xhr) {
            console.log("error")
        }
    });

})

/* delete */

$('#dataList').on('click', '.delete', function () {
    // get id of clicked button
    let keyid = $(this).attr('keyid');
    confirm("are you sure?") ?
        // console.log(keyid)
        $.ajax({
            url: `${url}/${keyid}`,
            type: "DELETE",
            context: $('.delete'), // scope
            success: (response) => {
                console.log("deleted id:", keyid)
                $(`li[keyid=${keyid}]`).remove()
            },
            error: function (xhr) {
                console.log("error")
            }
        })
        :
        console.log("chicken")
})


