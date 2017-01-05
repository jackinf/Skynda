const https = require('https');
const fs = require('fs');
const config = require("../config");
const server = require("../server/main");
const debug = require("debug")("app:bin:server");
const port = config.server_port;



server.listen(port);

// const options = {
//   pfx: fs.readFileSync('bin/localhost.pfx')
// };

// https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.end('hello world\n');
// }).listen(port);

debug(`Server is now running at http://localhost:${port}.`);
