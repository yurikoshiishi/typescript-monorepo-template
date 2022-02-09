/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")(["shared"]);

const config = {
  reactStrictMode: true,
};

module.exports = withTM(config);
