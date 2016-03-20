const staticServer = require('node-static');

var fileServe = new staticServer.Server('./dist');

require('http')
  .createServer((request, response) => {
    request.addListener('end', () => {
      fileServe.serve(request, response);
    }).resume();
  }).listen(process.env.npm_package_config_port);
