'use strict'

const css = require('./styles/index.scss');

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#_img').attr('src', e.target.result);
      $('#_img').show();
      $(".textarea").html("<div class='loader'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>");
      //$('#textBox').css({'background-image':'none', 'background':'white'});
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(() => {
  $("#imgInp").change(function () {
    readURL(this);

    const formData = new FormData();
    const fileField = document.querySelector("input[type='file']");

    formData.append('img', fileField.files[0]);

    fetch('/upload', {
      method: 'PUT',
      body: formData
    }).then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (!response.data) {
          $("#right-container").html("<div><h2>Oops! Something went wrong. :(</h2></div>")
        } else {
          $("#right-container").html("<div class='textarea'><textarea id='textBox'>" + response.data + "</textarea></div>");
        }
      });
  });

  $('#_upload').click(function () {
    $('#imgInp').click();
  });
});
//


//