# TSimple - Custom TypeScript Bundler CLI

A simple and efficient CLI tool for managing TypeScript projects with powerful build, configuration, and dependency installation capabilities.

## Features

- **Build Process:** Compile TypeScript projects using Babel and the TypeScript Compiler.
- **Dependency Management:** Install required dependencies via `pnpm` with workspace support.
- **Configuration Generation:** Automatically generate `.babelrc` and `tsconfig.json` files.
- **Type Generation:** Optionally generate TypeScript types only.

## Installation

To install the `tsimple` CLI tool, follow these steps:

1. Clone or download the repository.
2. Install the dependencies:

   ```bash
   pnpm install -D tsimple
   ```

   ```bash
   yarn install -D tsimple
   ```

   ```bash
   npm install -D tsimple
   ```

3. Link the CLI globally to make it available system-wide:

   ```bash
   npm link
   ```

## Usage

### Commands and Options

| Command | Description |
| :------ | :---------- |
| `-b --build` | Run the TypeScript build process.                           |
| `-d --dependencies` | Install required dependencies.                       |
| `-w --workspace` | Install dependencies in a workspace (default:`false`).  |
| `-t --tsconfig` | Generate a`tsconfig.json` file.                          |
| `-c --clean` | Clean the project directory.                                |
| `-o --types-only` | Generate TypeScript types only.                        |
| `-r --rc` | Generate a`.babelrc` file.                                     |
| `-V --version` | Output the version number.                                |
| `-h --help` | Display help for all commands.                               |

-----

### Example Workflow

1. **Install Dependencies:**
   Run `tsimple -d` to install the required dependencies. Alternatively, you can run the following command manually:

   ```bash
   pnpm install -D @babel/core @babel/cli @babel/preset-env @babel/preset-typescript typescript ts-node @types/node tsx
   ```

   If you are using workspaces, you can add the `-w` option to install dependencies with workspace support.

2. **Generate `.babelrc` and `tsconfig.json`:**
   - To generate a `.babelrc` file:

     ```bash
     tsimple -r
     ```

   - To generate a `tsconfig.json` file:

     ```bash
     tsimple -t
     ```

3. **Build Project:**
   Run `tsimple -b` to build the project with the TypeScript Compiler and Babel.

4. **Generate Types Only:**
   If you want to generate only TypeScript types, use the `-o` option:

   ```bash
   tsimple -o
   ```

5. **Clean Project Directory:**
   Run `tsimple -c` to clean up the output directory.

### Contribution

Feel free to contribute to this project by submitting issues or feature requests. Pull requests are welcome!

### License

This project is licensed under the [MIT License](LICENSE)