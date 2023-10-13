// include necessary libraries
const express = require('express');
const app = express();
const { parseInput } = require('./src/hexUtils');
const { decodeProto } = require('./src/protobufDecoder');

app.get('/', function (req, res) {
  // same logic as your React app
  const newHex = decodeURI(req.params.hex);

  // Parsing and decoding
  const buffer = parseInput(newHex);

  const result = buffer ? decodeProto(buffer) : null;

  res.json({ result: result });
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});