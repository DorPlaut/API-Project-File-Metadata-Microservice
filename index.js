var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// my selution
// handle post file data
const handlePostFile = async (req, res) => {
  const { originalname, mimetype, size } = req.file;
  res.status(202).json({
    name: originalname,
    type: mimetype,
    size: size,
  });
};

// post request and handle errors
app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  try {
    await handlePostFile(req, res);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

const port = process.env.PORT;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
