const getData = () => {
    $.ajax({
      url: "https://jquery.warastra-adhiguna.com/api/book?nickname=" + nickname,
      type: "GET",
      dataType: "json",
      success: function (result) {
        books: result.data;
        console.log(result.message);
        bindData();
      },
      error: function (error) {
        alert("terjadi kesalahan:", error);
      },
    });
  };

  const insertData = () => {
    $.ajax({
      url:
        "https://jquery.warastra-adhiguna.com/api/book?nickname" +
        formInputId.val(),
      type: "POST",
      dataType: "json",
      data: {
        nickname,
        book_name: formInputName.val(),
        description: formInputDescription.val(),
      },
      success: function (data) {
        getData(), resetDetailPage(), showInfo(data.message, "success");
      },
      error: function (error) {
        showInfo(error.message, "danger");
      },
    });
  };

  const updateData = () => {
    $.ajax({
      url:
        "https://jquery.warastra-adhiguna.com/api/book?nickname" +
        formInputId.val(),
      type: "PUT",
      dataType: "json",
      data: {
        nickname,
        book_name: formInputName.val(),
        description: formInputDescription.val(),
      },
      success: function (data) {
        getData(), resetDetailPage(), showInfo(data.message, "success");
      },
      error: function (error) {
        showInfo(error.message, "danger");
      },
    });
  };

  const deleteData = () => {
    $.ajax({
      url: "https://jquery.warastra-adhiguna.com/api/book?nickname" + id,
      type: "DELETE",
      dataType: "json",
      data: {
        nickname,
        book_name: formInputName.val(),
        description: formInputDescription.val(),
      },
      success: function (data) {
        getData();
        resetDetailPage();
        showInfo("edit data succes", "success");
      },
      error: function (error) {
        showInfo(error.message, "danger");
      },
    });
  };