const path = require("path"),
      express = require("express");

const DIST_DIR = path.join(__dirname, "dist"),
      PORT = 3000 || process.env.PORT,
      app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));
app.use('/src', express.static(__dirname + '/src/'));
//Send index.html when the user access the web
app.get("/", function (req, res) {
  res.send('hello');
});

app.post("/upload", function (req, res) {
  res.sendStatus(304);
});

//Start the server
app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
  
});