$(document).ready(() => {
  // memanggil library datatable

  let nickname = "";
  let books = {};
  $("h1").fadeIn(4000);
  $("#div-input").slideDown(1000);

  $(".text-warning").click(() => {
    $("#input-page").hide();
    $("#main-page").show();
  });

  const validasi = $("#nickname").keyup((e) => {
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
      swal({
        title: "Error",
        text: "Input  Masih Kosong",
        icon: "error",
        button: "Isi Form",
      });
    } else {
      if ($("#book_id").val() == "" + index == 0 ) {
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
            swal({
              title: "Succes",
              text: data.message,
              icon: "success",
              button: "Isi Form",
            });
            $("#main-page").show(1000);
            $("#input-page").hide(1000);
            getData();
            refreshTable();
            $("#book_id").val("");
            $("#book_name").val("");
            $("#description").val("");
          },
          error: function (error) {
            swal({
              title: "Error",
              text: error.message,
              icon: "error",
              button: "Isi Form",
            });
          },
        });
      } else {
        $.ajax({
          url:
            "https://jquery.warastra-adhiguna.com/api/book/" +
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
            $("#main-page").show();
            $("#input-page").hide();
            getData();
            refreshTable();
          },
          error: (error) => {
            alert(error.message);
          },
        });
      }
    }
  });

  const resultTableBook = () => {
    books.forEach(function (book, index) {
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

  $("tbody").on("click", ".text-danger", function () {
    let index = $(this).attr("id").split("_")[1];
    let id = books[index].id;
    $.ajax({
      url: "https://jquery.warastra-adhiguna.com/api/book/" + id,
      type: "DELETE",
      dataType: "json",
      data: {
        nickname: nickname,
        book_name: $("#book_name").val(),
        description: $("#description").val(),
      },
      success: (data) => {
        alert("berhasil dihapus");
        getData();
        refreshTable();
      },
      error: (error) => {
        swal({
          title: "Error",
          text: "Hapus data gagal",
          icon: "error",
          button: "Ok",
        });
      },
    });
  });

  const refreshTable = () => {
    $("tbody").empty();
    books.forEach(function (book, index) {
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
  const getData = () => {
    $.ajax({
      url: "https://jquery.warastra-adhiguna.com/api/book?nickname=" + nickname,
      type: "GET",
      dataType: "json",
      success: function (result) {
        books = result.data;
        resultTableBook();
        refreshTable();
      },
      error: function (error) {
        alert("Terjadi kesalahan: ", error.message);
      },
    });
  };
});
