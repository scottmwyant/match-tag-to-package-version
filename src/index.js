const matchVersion = require("./match-version");

try {
  matchVersion(process.env.GITHUB_REF, process.env.TAG_PREFIX);
  console.info(`Git tag (${tag}) matches package.json version (${version})`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
