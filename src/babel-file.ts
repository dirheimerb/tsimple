import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * A function that creates a .babelrc file with specified presets.
 * @return {void}
 */
const createRC = () => {
  const createRCContent = `
  {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-typescript"
    ]
  }`;

  /**
   * The path to the .babelrc file.
   * @type {string}
   */
  const babelrc = path.resolve(__dirname, '.babelrc');
  fs.writeFileSync(babelrc, createRCContent);

  console.log(chalk.yellowBright('Babel configuration file created successfully!'));
};

export default createRC;

