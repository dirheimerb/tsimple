import { OptionValues, program, Option } from 'commander';
import { execSync } from 'child_process';
import chalk from 'chalk';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import createRC from './babel-file.js';
import createTSConfig from './tsconfig-file.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Executes a shell command synchronously.
 *
 * @param {string} command - The shell command to execute.
 * @return {void} - Does not return a value.
 */
const executeShellCommand = (command: string) => {
  try {
    execSync(command, { stdio: 'inherit', shell: '/bin/bash' });
  } catch (error) {
    console.error(chalk.red(`Error executing command "${command}": ${error}`));
  }
};


/**
 * Loads a script from the specified path.
 *
 * @param {string} scriptPath - The path of the script to load.
 * @return {string} The content of the loaded script.
 */
export const loadScript = (scriptPath: string): string => {
  const resolvedPath = path.resolve(__dirname, scriptPath);
  if (fs.existsSync(resolvedPath)) {
    return fs.readFileSync(resolvedPath, 'utf8');
  }
  throw new Error(`File not found: ${resolvedPath}`);
};



/**
 * Executes a shell command synchronously.
 *
 * @param {string} scriptContent - The shell command to execute.
 * @return {void} - Does not return a value.
 */
const executeShell = (scriptContent: string) => {
  try {
    execSync(scriptContent, { stdio: 'inherit', shell: '/bin/bash' });
  } catch (error) {
    console.error(chalk.red(`Error executing shell commands: ${error}`));
  }
};

// Define CLI commands using Commander
program
  .version('1.0.0')
  .description('Custom TypeScript Bundler CLI')
  .option('-b, --build', 'Run the TypeScript build process')
  .option('-d, --dependencies', 'Install dependencies')
  .addOption(
    new Option('-w, --workspace', 'Install dependencies in a workspace').default(false)
  )
  .option('-t, --tsconfig', 'Generate tsconfig.json file')
  .option('-c, --clean', 'Clean the project directory')
  .option('-o, --types-only', 'Generate types only')
  .option('-r, --rc', 'Generate .babelrc file')
  .addHelpText(
    'afterAll',
    chalk.cyanBright("Run -d first or use 'pnpm install -D @babel/core @babel/cli @babel/preset-typescript @babel/preset-env typescript ts-node @types/node tsx\r\n After dependencies are installed run -r to generate .babelrc file and finally run -t to generate tsconfig.json file")
  );

  program.parse(process.argv);

/**
 * Get the options from the command line
 */
const options: OptionValues = program.opts();

if (options.build) {
  console.log(chalk.magentaBright('Running TypeScript build...'));
  const pnpmBuild = 'babel src --out-dir dist --extensions \".ts,.tsx\" --source-maps inline && tsc';
  executeShell(pnpmBuild);
}

if (options.dependencies) {
  console.log(chalk.cyanBright('Installing dependencies...'));
  /**
   * The command to install dependencies in a non-workspace
   */
  const pnpmCommand = 'pnpm install -D @babel/core @babel/cli @babel/preset-typescript @babel/preset-env typescript ts-node @types/node tsx';  /**
   * The command to install dependencies in a workspace
   */
  const addWorkspace = pnpmCommand + ' --workspace-root';

  if (options.workspace) {
    executeShellCommand(addWorkspace);
  } else {
    executeShellCommand(pnpmCommand);
  }
}

if (options.tsconfig) {
  console.log(chalk.blueBright('Generating tsconfig.json file...'));
  createTSConfig();
}

if (options.types_only) {
  console.log(chalk.greenBright('Generating types only...'));
  const pnpmTypesOnly = 'turbo run tsc --declaration --emitDeclarationOnly';
  executeShell(pnpmTypesOnly);
}

if (options.clean) {
  console.log(chalk.gray('Cleaning project directory...'));
  setTimeout(() => {
  const pnpmClean = 'turbo run clean && rm -rf dist && .babelrc && tsconfig.json';
  executeShell(pnpmClean);
  }, 1000);
}

if (options.rc) {
  console.log(chalk.bgYellowBright('Generating .babelrc file...'));
  createRC();
}

if (Object.keys(options).length === 0) {
  console.log(chalk.red('No command provided. Use -h or --help for command list.'));
}
