$(document).ready(() => {
    let nickname = "";
    let books = {};
    let editingIndex = -1;

    $("h1").fadeIn(1000);
    $("#div-input").slideDown(1000);

    //keyup enter name
    $('#nickname').keyup(function (e) {
        if (e.key == "Enter") {
            if (e.target.value == "") {
                $('#nickname').addClass("text-danger");
            } else {
                nickname = e.target.value;
                getData();
                $('#front-page').slideUp(1000);
                $('#main-page').fadeIn(1000);
            }
        }
    });

    $('#add-data').click(function () {
        $('#main-page').hide();
        $('#detail-page').show();
        clearDetailForm();
    });

    $('#detail-form').submit(function (e) {
        e.preventDefault(); // supaya saat submit tidak pindah page
        if ($('#book_name').val() == "" || $('#description').val() == "") {
            alert("Isi semua inputan");
            //buat warna merah donk
        } else {
            if (editingIndex === -1) {
                // Add data
                $.ajax({
                    url: "https://jquery.warastra-adhiguna.com/api/book?nickname=" + nickname,
                    type: "POST",
                    dataType: "json",
                    data: {
                        nickname: nickname,
                        book_name: $('#book_name').val(),
                        description: $('#description').val(),
                    },
                    success: function (data) {
                        alert(data.message);
                        $('#main-page').show();
                        $('#detail-page').hide();
                        getData();
                        clearDetailForm();
                    },
                    error: function (error) {
                        alert(error.message);
                    },
                });
            } else {
                // Edit data
                $.ajax({
                    url: "https://jquery.warastra-adhiguna.com/api/book/" + $('#book_id').val() + "?nickname=" + nickname,
                    type: "PUT",
                    dataType: "json",
                    data: {
                        nickname: nickname,
                        book_name: $('#book_name').val(),
                        description: $('#description').val(),
                    },
                    success: function (data) {
                        alert(data.message);
                        $('#main-page').show();
                        $('#detail-page').hide();
                        getData();
                        clearDetailForm();
                        editingIndex = -1; // Reset editing index
                    },
                    error: function (error) {
                        alert(error.message);
                    },
                });
            }
        }
    });

    $("tbody").on("click", ".text-warning", function () {
        let index = $(this).attr("id").split("_")[1];
        $('#book_id').val(books[index].id);
        $('#book_name').val(books[index].book_name);
        $('#description').val(books[index].description);
        $('#main-page').hide();
        $('#detail-page').show();
        editingIndex = index; // Set editing index
    });

    $("tbody").on("click", ".text-danger", function () {
        let index = $(this).attr("id").split("_")[1];
        let bookId = books[index].id;
            $.ajax({
                url: "https://jquery.warastra-adhiguna.com/api/book/" + bookId,
                type: "DELETE",
                dataType: "json",
                data: {
                    nickname: nickname,
                    book_name: books[index].book_name,
                    description: books[index].description,
                },
                success: function (data) {
                    alert(data.message);
                    getData();
                },
                error: function (error) {
                    alert(error.message);
                },
            });
    });

    function getData() {
        $.ajax({
            url: "https://jquery.warastra-adhiguna.com/api/book?nickname=" + nickname,
            type: "GET",
            dataType: "json",
            success: function (result) {
                books = result.data;
                refreshTable();
            },
            error: function (error) {
                alert("Terjadi kesalahan: ", error.message);
            },
        });
    }

    function refreshTable() {
        $("tbody").empty();
        books.forEach(function (book, index) {
            $("tbody").append("<tr><td>" + (index + 1) + "</td><td>" + book.book_name + "</td><td>" + book.description + "</td><td><button id='edit_" + index + "' class='text-warning'>Edit</button><button id='delete_" + index + "' class='text-danger'>Delete</button></td></tr>");
        });
    }

    function clearDetailForm() {
        $('#book_id').val('');
        $('#book_name').val('');
        $('#description').val('');
    }
});
