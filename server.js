import formidable from 'formidable'
import express from 'express'
import util from 'util'

const app = express()

app.get('/', (req, res) => {
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<h2>Submit a file to view its filesize.</h2>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
})

app.post('/upload', (req, res) => {
  var form = new formidable.IncomingForm();
  form.uploadDir = "./dir"
  form.parse(req, function(err, fields, files) {
    res.send({size: files.upload.size})
    res.end();
  });
})

const server = app.listen(process.env.port || 3000, () => {
  const port = server.address().port
  console.log(`running on localhost ${port}`);
})
