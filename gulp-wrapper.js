// Load the fix first
require('./gulp-fix.js');

// Then run gulp
const spawn = require('child_process').spawn;
const args = process.argv.slice(2);

// Use npx to run gulp (works cross-platform)
const gulpProcess = spawn('npx', ['gulp', ...args], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

gulpProcess.on('close', (code) => {
  process.exit(code);
});

