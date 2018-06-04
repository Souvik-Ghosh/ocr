const path = require("path"),
      express = require("express"),
      fileUpload = require('express-fileupload'),
      fetch = require('node-fetch'),
      fs = require('fs'),
      util = require('util');

const DIST_DIR = path.join(__dirname, "dist");
const PORT = process.env.PORT;
const app = express();

app.use(fileUpload());

const readFile = util.promisify(fs.readFile);

const api_url = "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAbOxH-4pY6k2hqnjj-OTMNuotQxKgS95A";

async function getStuff(file) {
  const encoded = await file.toString('base64');
  let request_body = {
    "requests": [
      {
        "image": {
          "content": encoded
        },
        "features": [
          {
            "type": "TEXT_DETECTION"
          }
        ],
        "imageContext": {
          "languageHints": ['bn', 'en']
        }
      }
    ]
  };

  request_body = await JSON.stringify(request_body);

  const response = await fetch(api_url, {
    method: 'POST',
    body: request_body
  });

  return await response.json();
}


//Serving the files on the dist folder
app.use(express.static(DIST_DIR));
app.use('/src', express.static(__dirname + '/src/'));
//Send index.html when the user access the web
app.get("/", function (req, res) {
  res.render(index.html);
});

app.put("/upload", function (req, res) {
  getStuff(req.files.img.data)
    .then(data => res.send({"data": data.responses[0].fullTextAnnotation.text}))
    .catch(err => res.send(err));
  // setTimeout(() => {
  //   res.send({"data": "hi"})
  // }, 5000);
});

//Start the server
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);

});