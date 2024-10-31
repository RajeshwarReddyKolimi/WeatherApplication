const { exec } = require("child_process");
const path = require("path");

const repoPath = path.resolve(__dirname, "../");

function autoCommit() {
  exec(`git -C ${repoPath} add .`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error adding files: ${error.message}`);
      return;
    }
    console.log(`Add output: ${stdout}`);

    const commitMessage = `Auto-commit: ${new Date().toLocaleString()}`;
    exec(
      `git -C ${repoPath} commit -m "${commitMessage}"`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error committing: ${error.message}`);
          return;
        }
        console.log(`Commit output: ${stdout}`);

        exec(
          `git -C ${repoPath} push origin master`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`Error pushing: ${error.message}`);
              return;
            }
            console.log(`Push output: ${stdout}`);
          }
        );
      }
    );
  });
}
module.exports = autoCommit;
