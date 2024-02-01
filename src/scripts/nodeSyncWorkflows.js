const { exec } = require('child_process');
const fs = require('fs');

// These need to be manually updated if we are adding/removing workflow files.
const workflowFilePaths = [
  '.github/workflows/dependency-graph.yml',
  '.github/workflows/deploy-dev.yml',
  '.github/workflows/deploy-pr.yml',
  '.github/workflows/lint.yml',
  '.github/workflows/code-format.yml',
];

// The node.js version for the azure web apps being deployed
const bicepFilePaths = [
  '.bicep/pr-instance.bicep'
];

exec('npm run ng v', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  const nodeVersionMatch = stdout.match(/Node:\s+(\d+\.\d+\.\d+)/);
  const nodeVersion = nodeVersionMatch ? nodeVersionMatch[1] : null;

  if (nodeVersion) {
    for (let i = 0; i < workflowFilePaths.length; i++) {
      let fileContents = fs.readFileSync(workflowFilePaths[i], 'utf8');
      fileContents = fileContents.replace(/NODE_VERSION: ['"]\d+\.\d+\.\d+['"]/, `NODE_VERSION: '${nodeVersion}'`);
      fs.writeFileSync(workflowFilePaths[i], fileContents);

      console.log(`${workflowFilePaths[i]} updated to use Node.js version ${nodeVersion}`);
    }

    for (let i = 0; i < bicepFilePaths.length; i++) {
      let fileContents = fs.readFileSync(bicepFilePaths[i], 'utf8');
      fileContents = fileContents.replace(/param nodeVersion string = ['"]\d+\.\d+\.\d+['"]/, `param nodeVersion string = '${nodeVersion}'`);
      fs.writeFileSync(bicepFilePaths[i], fileContents);

      console.log(`${bicepFilePaths[i]} updated to use Node.js version ${nodeVersion}`);
    }
  }
});
