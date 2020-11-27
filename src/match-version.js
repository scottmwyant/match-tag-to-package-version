const fs = require("fs");

module.exports = (gitRef, prefix = "") => {
  
  if (!gitRef || !gitRef.startsWith('refs/tags/')) {
    throw new Error("Current commit is not tagged in git");
  }
  
  const version = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
  const tag = gitRef.replace(/^refs\/tags\//, "");
  prefix = prefix.replace(/^refs\/tags\//,"");

  if (tag.replace(new RegExp(`^${prefix}`), '') !== version) {
    throw new Error(
      `Git tag (${tag}) does not match package.json version (${version})`
    );
  }
  else {
    return { tag, version };
  }
};
