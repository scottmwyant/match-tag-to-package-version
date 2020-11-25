const fs = require("fs");

module.exports = (gitRef, prefix = "") => {
  const rawPackageJson = fs.readFileSync("package.json", "utf8");
  const packageJson = JSON.parse(rawPackageJson);

  if (!gitRef || !gitRef.startsWith('refs/tags/')) {
    throw new Error("Current commit is not tagged in git");
  }

  const ref = prefix.startsWith('refs/tags/') ? '' : 'refs/tags/'
  const regex = new RegExp(`${ref}${prefix}`);
  const tag = gitRef.replace(regex,"");

  if (tag !== packageJson.version) {
    throw new Error(
      `Git tag (${tag}) does not match package.json version (${packageJson.version})`
    );
  }

  console.info(
    `Git tag (${tag}) matches package.json version (${packageJson.version})`
  );
};
