const express = require('express')
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.status(200).json({text: "Hello World!"}));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
