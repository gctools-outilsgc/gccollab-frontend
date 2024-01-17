const { exec } = require('child_process');
const fs = require('fs');

// These need to be manually updated if we are adding/removing workflow files.
const workflowFilePaths = [
    '.github/workflows/dependency-graph.yml',
    '.github/workflows/deploy-dev.yml',
    '.github/workflows/deploy-pr.yml',
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

            let workflowFileContent = fs.readFileSync(workflowFilePaths[i], 'utf8');
            workflowFileContent = workflowFileContent.replace(/NODE_VERSION: ['"]\d+\.\d+\.\d+['"]/, `NODE_VERSION: '${nodeVersion}'`);
            fs.writeFileSync(workflowFilePaths[i], workflowFileContent);
        
            console.log(`${workflowFilePaths[i]} updated to use Node.js version ${nodeVersion}`);
        }
    }
});
