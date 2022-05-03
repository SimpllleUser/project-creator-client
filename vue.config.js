module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http:localhost:3000',
                // target: 'https://a582-109-122-43-56.eu.ngrok.io',
                ws: true,
                changeOrigin: true,
                logLevel: 'debug',
            },
        },
    },
};