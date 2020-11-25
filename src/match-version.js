const fs = require("fs");

module.exports = (gitRef, prefix = "") => {
  
  if (!gitRef || !gitRef.startsWith('refs/tags/')) {
    throw new Error("Current commit is not tagged in git");
  }
  
  const version = JSON.parse(fs.readFileSync("package.json", "utf8")).version;
  const ref = prefix.startsWith('refs/tags/') ? '' : 'refs/tags/'
  const tag = gitRef.replace(new RegExp(`${ref}${prefix}`),"");

  if (tag !== version) {
    throw new Error(
      `Git tag (${tag}) does not match package.json version (${version})`
    );
  }
  else {
    return { tag, version };
  }
};
