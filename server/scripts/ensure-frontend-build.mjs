import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const frontendDir = resolve(__dirname, '../../frontend');
const frontendNodeModules = resolve(frontendDir, 'node_modules');
const frontendIndex = resolve(frontendDir, 'dist/index.html');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const forceBuild = process.argv.includes('--force') || process.env.FORCE_FRONTEND_BUILD === 'true';

function runNpm(args) {
  execFileSync(npm, args, {
    cwd: frontendDir,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  });
}

if (!existsSync(frontendNodeModules)) {
  runNpm(['install']);
}

if (forceBuild || !existsSync(frontendIndex)) {
  runNpm(['run', 'build']);
} else {
  console.log('Frontend build already exists. Skipping build.');
}
