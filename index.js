const serve = require('serve');

serve(__dirname, {
  port: 3000,
  ignore: ['node_modules']
});
