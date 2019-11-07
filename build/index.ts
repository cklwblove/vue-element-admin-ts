'use strict';

const {sh, cli} = require('tasksfile');
const chalk = require('chalk');
const rawArgv = process.argv.slice(2);
const args = rawArgv.join(' ');
const config = require('../vue.config.js');

// 便于捕捉 build 之后的错误，然后进行自定义处理
// 配合 jenkins 执行 job
function command() {
  sh(`vue-cli-service build ${args}`, {
    async: true,
    stdio: 'inherit'
  })
    .then((output) => {
      console.log(chalk.cyan(output || ''));
    })
    .catch((err) => {
      console.error('\n');
      console.error(chalk.magenta('编译打包出错了 ~~~~(>_<)~~~~ \n'));
      console.error(chalk.magenta('具体错误信息如下 \n'));
      console.error(chalk.red(`${err}.\n`));
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    });
}

if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
  const report = rawArgv.includes('--report');

  sh(`vue-cli-service build ${args}`, {
    async: true,
    stdio: 'inherit'
  })
    .then((output) => {
      const port = 9526;
      const publicPath = config.publicPath;

      const connect = require('connect');
      const serveStatic = require('serve-static');
      const app = connect();

      app.use(
        publicPath,
        serveStatic('./dist', {
          index: ['index.html', '/']
        })
      );

      app.listen(port, function () {
        console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`));
        if (report) {
          console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`));
        }
      });
    }).catch((err) => {
    console.error('\n');
    console.error(chalk.magenta('编译打包出错了 ~~~~(>_<)~~~~ \n'));
    console.error(chalk.magenta('具体错误信息如下 \n'));
    console.error(chalk.red(`${err}.\n`));
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  });
} else {
  command();
}

