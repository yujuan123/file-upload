const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.static('./public'));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage});

app.post('/profile', upload.single('avatar'), function(req, res, next) {

  res.send({
    err: null,
    filePath: 'uploads/' + path.basename(req.file.path)
  });
});


app.listen(3000, function () {
  console.log("app is listening");
});