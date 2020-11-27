const matchVersion = require("./match-version");
const core = require("@actions/core");

try {
  const prefix = process.env.INPUT_TAG_PREFIX ? process.env.INPUT_TAG_PREFIX : process.env.TAG_PREFIX;
  const {tag, version} = matchVersion(process.env.GITHUB_REF, prefix);
  console.info(`Git tag (${tag}) matches package.json version (${version})`);
  core.setOutput("tag", tag);
  core.setOutput("version", version);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
