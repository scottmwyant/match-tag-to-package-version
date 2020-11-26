const matchVersion = require("./match-version");
const core = require("@actions/core");

try {
  const {tag, version} = matchVersion(process.env.GITHUB_REF, process.env.TAG_PREFIX);
  console.info(`Git tag (${tag}) matches package.json version (${version})`);
  core.setOutput("tag", tag);
  core.setOutput("version", version);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
