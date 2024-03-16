$(document).ready(() => {
  // memanggil library datatable

  let nickname = "";
  let books = {};
  $("h1").fadeIn(4000);
  $("#div-input").slideDown(1000);

  const validasi = $("#nickname").keyup((e) => {
    e.preventDefault();
    if (e.key == "Enter") {
      if (e.target.value == "") {
        swal({
          title: "Error",
          text: "Maaf Nickname Masih Kosong",
          icon: "error",
          button: "Isi Form",
        });
      } else {
        nickname = e.target.value;
        getData();
        $("#front-page").slideUp(1000);
        $("#main-page").fadeIn(1000);
      }
    }
  });

  const showPageInput = $("#add-data").click(() => {
    $("#main-page").hide(2000);
    $("#input-page").show(1000);
  });

  const inputBooks = $("#detail-form").submit((e) => {
    e.preventDefault();
    if ($("#book_name").val() == "" || $("#description").val() == "") {
      alert("Isi semua inputan");
    } else {
      if ($("#book_id").val() == "") {
        $.ajax({
          url:
            "https://jquery.warastra-adhiguna.com/api/book?nickname=" +
            nickname,
          type: "POST",
          dataType: "json",
          data: {
            nickname: nickname,
            book_name: $("#book_name").val(),
            description: $("#description").val(),
          },
          success: (data) => {
            alert(data.message);
            $("#main-page").show(1000);
            $("#input-page").hide(1000);
          },
          error: function (error) {
            alert(error.message);
          },
        });
      } else {
        $.ajax({
          url:
            "https://jquery.warastra-adhiguna.com/api/book?nickname=" +
            $("#book_id").val(),
          type: "PUT",
          dataType: "json",
          data: {
            nickname: nickname,
            book_name: $("#book_name").val(),
            description: $("#description").val(),
          },
          success: (data) => {
            alert("Update Berhasil");
            getData();
            resultTableBook();
          },
          error: function (error) {
            alert(error.message);
          },
        });
      }
    }
  });

  const resultTableBook = () => {
    books.forEach(function (book, index) {
      let table = new DataTable("#myTable");
      $("table").append(
        "<tr><td>" +
          (index + 1) +
          "</td><td>" +
          book.book_name +
          "</td><td>" +
          book.description +
          "</td><td><button id='edit_" +
          index +
          "' class='text-warning'>Edit</button><button id='delete_" +
          index +
          "' class='text-danger'>delete</button></td></tr>"
      );
    });
  };

  $("tbody").on("click", ".text-warning", function () {
    let index = $(this).attr("id").split("_")[1];
    $("#book_id").val(books[index].id);
    $("#book_name").val(books[index].book_name);
    $("#description").val(books[index].description);
  
    $("#input-page").show();
    $("#main-page").hide();
  });

  
  const deleteBook = () => {
    $("tbody").on("click", ".text-danger", function () {
      let index = $(this).attr("id").split("_")[1];
      $.ajax({
        url: "https://jquery.warastra-adhiguna.com/api/book?nickname=" + index,
        type: "DELETE",
        dataType: "json",
        data: {
          nickname: nickname,
          book_name: formInputName.val(),
          description: formInputDescription.val(),
        },
        success: (data) => {
          getData();
          resultTableBook();
          alert("berhasil dihapus");
        },
        error: (error) => {
          alert("gagal");
        },
      });
    });
  };
  
  const getData = () => {
    $.ajax({
      url: "https://jquery.warastra-adhiguna.com/api/book?nickname=" + nickname,
      type: "GET",
      dataType: "json",
      success: function (result) {
        books = result.data;
        resultTableBook();
      },
      error: function (error) {
        alert("Terjadi kesalahan: ", error.message);
      },
    });
  };
});
