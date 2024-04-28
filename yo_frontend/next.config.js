const withImages = require('next-images');

module.exports = withImages({
    images: {
        dangerouslyAllowSVG: true,
        disableStaticImages: true,
        domains: [
            "abc-demo.cdn.prismic.io",
            "images.prismic.io",
        ],
    },
    webpack: (config, { isServer }) => {
        // Remove unnecessary externals or adjust as needed
        // config.externals = ['webpack', 'readable-stream', 'd3-interpolate', 'next'];

        // Check if any other webpack configurations are needed
        // Modify config as required

        return config;
    },
    // Review and adjust output configuration if needed
    // output: 'standalone'
});
