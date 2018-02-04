const serve = require('serve');
const path = require('path');

const path_to_html = path.join(__dirname, 'build')
console.log(path_to_html)
serve(path_to_html, {
  port: 3000,
  ignore: ['node_modules']
});
