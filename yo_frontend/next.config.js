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
        config.externals = ['webpack', 'readable-stream', 'd3-interpolate', 'next'];
        return config;
    },
    output: 'standalone'
});