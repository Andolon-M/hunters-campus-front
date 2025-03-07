const webpack = require('webpack');
const path = require('path');

module.exports = {

    chainWebpack: (config) => {
        // Configuración para manejar archivos SVG con vue-svg-loader
        config.module.rule('svg').use('file-loader').loader('vue-svg-loader');

        // Copia los archivos de public/img a dist/img
        config.plugin('copy').tap((args) => {
            args[0].push({
                from: 'public/img', // Copia los archivos de public/img
                to: 'img',         // a dist/img
                toType: 'dir',
            });
            return args;
        });


        // Optimiza los chunks para el middleware
        config.optimization.splitChunks({
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;

                    },

                  middleware: {
                    test: /[\\/]middleware[\\/]/,
                    name: 'middleware',
                    chunks: 'all',

                    enforce: true,
                },
            },
        });

    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                _: 'lodash',
                echarts: 'echarts',
            }),
        ],
        resolve: {
            extensions: ['.js', '.json', '.vue'],
            alias: {
                '@': path.resolve(__dirname, 'src'), // Alias agregado para src
                '~': path.join(__dirname, './src'),
                '@sass': path.join(__dirname, './src/sass'),
            },
        },
    },
    productionSourceMap: false,
    publicPath: '/',
    outputDir: 'dist',

    assetsDir: '', // se vacio este assetsDir
    pwa: {
        name: 'Hunters',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        workboxOptions: {
            skipWaiting: true,
            cleanupOutdatedCaches: true,
            exclude: [
                /\.map$/
                //Se elimino aqui el uso de manifest.js aqui
            ]
        },
        manifestOptions: {
            name: 'Hunters',
            display: 'standalone',
            start_url: '/'
        }
    }
}

