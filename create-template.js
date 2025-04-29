#!/usr/bin/env node

const { existsSync } = require('fs');
const { resolve } = require('path');
const { exec } = require('child_process');
const fs = require('fs');

const templateRepo = 'https://git.alt-tools.tech/mehdi-larek/nest-template';
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please specify a project name');
  process.exit(1);
}

const targetDir = resolve(process.cwd(), projectName);

if (existsSync(targetDir)) {
  console.error('Directory already exists');
  process.exit(1);
}

exec(`git clone --depth 1 --branch main ${templateRepo} ${projectName}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${stderr}`);
    process.exit(1);
  }

  console.log(stdout);
  console.log(`Project created successfully in ${projectName}`);

  exec(`rm -rf ${projectName}/.git`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error: ${stderr}`);
      process.exit(1);
    }

    const packageJsonPath = resolve(targetDir, 'package.json');
    fs.readFile(packageJsonPath, 'utf-8', (err, data) => {
      if (err) {
        console.error('Error reading package.json:', err);
        process.exit(1);
      }

      const packageJson = JSON.parse(data);

      packageJson.name = projectName;
      packageJson.version = '1.0.0';
      delete packageJson.bin;

      fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf-8', (err) => {
        if (err) {
          console.error('Error writing package.json:', err);
          process.exit(1);
        }
        
        exec(`cd ${projectName} && npm install`, (err, stdout, stderr) => {
          if (err) {
            console.error(`Error: ${stderr}`);
            process.exit(1);
          }

          console.log(stdout);
          console.log('Dependencies installed successfully');
         
        });
      });
    });
  });
});


