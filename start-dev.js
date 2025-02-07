const { spawn } = require('child_process');
const path = require('path');

// Function to start a process
function startProcess(name, command, args, cwd) {
  const process = spawn(command, args, {
    cwd: path.join(__dirname, cwd),
    shell: true,
    stdio: 'pipe',
  });

  process.stdout.on('data', (data) => {
    console.log(`[${name}] ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.error(`[${name}] ${data}`);
  });

  process.on('close', (code) => {
    console.log(`[${name}] process exited with code ${code}`);
  });

  return process;
}

// Start backend
const backend = startProcess('backend', 'npm', ['run', 'dev'], 'backend');

// Start frontend
const frontend = startProcess('frontend', 'npm', ['start'], 'frontend');

// Handle process termination
process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit(0);
});
