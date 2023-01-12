/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const sentryWebpackPluginOptions = {
  silent: true,
};


const moduleExports = {
  reactStrictMode: true,
  images: {
    domains: ['files.stripe.com'],
  },
  sentry: {
    hideSourceMaps: true,
  },
};


module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
