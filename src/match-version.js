const fs = require("fs");
const core = require ("@actions/core");

module.exports = (gitRef, prefix = '') => {
  
  if (gitRef == undefined || gitRef.substring(0,10) != 'refs/tags/') {
    throw new Error("Current commit is not tagged in git");
  }
  
  const version = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
  const gitTag = gitRef.substring('refs/tags/'.length);
  const gitTagWithoutPrefix = gitTag.substring(prefix.length);
  
  if (version == gitTag || version == gitTagWithoutPrefix) {
    core.setOutput("packageVersion", version);
    core.setOutput("tagVersion", gitTagWithoutPrefix);
    core.setOutput("tag", gitTag);
    console.info(
      `Git tag (${gitTag}) matches package.json version (${version})`
    );
  }
  else {
    throw new Error(
      `Git tag (${tagVersion}) does not match package.json version (${packageVersion})`
    );
  }

};
