import { exec } from 'child_process';
import * as util from 'util';

const excutor = util.promisify(exec);
export default async () => {
  const { stdout, stderr } = await excutor('npm run DownMigration');
  console.log(stdout);
  if (stderr) {
    console.log(stderr);
    process.exit(1);
  }
};
