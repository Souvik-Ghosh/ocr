const css = require('./styles/index.scss');

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#_img').attr('src', e.target.result);
      $('#_img').show();

      //
      var url = 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAbOxH-4pY6k2hqnjj-OTMNuotQxKgS95A';
      
      fetch(url, {
          method: 'POST', // or 'PUT'
          body: e.target.result, // data can be `string` or {object}!
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }

    reader.readAsDataURL(input.files[0]);
  }
}
$(document).ready(() => {
  $("#imgInp").change(function () {
    const img = readURL(this);
  });

  $('#_upload').click(function () {
    $('#imgInp').click();
  });

});
//


//