const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const makeConfig = require('./webpack.makeConfig.js');

const getModulePath = moduleName => path.dirname(require.resolve(`${moduleName}/package.json`));

module.exports = defaultConfig =>
    makeConfig(
        defaultConfig,
        {
            name: 'renderer',
            useReact: true,
            disableDefaultRulesForExtensions: ['js', 'jsx', 'css', 'svg', 'png', 'wav', 'gif', 'jpg', 'ttf'],
            babelPaths: [
                path.resolve(__dirname, 'src', 'renderer'),
                /node_modules[\\/]+scratch-[^\\/]+[\\/]+src/,
                /node_modules[\\/]+pify/,
                /node_modules[\\/]+@vernier[\\/]+godirect/
            ],
            plugins: [
                new CopyWebpackPlugin([
                    {
                        from: path.join(getModulePath('scratch-arduino-blocks'), 'media'),
                        to: 'static/blocks-media/default'
                    },
                    {
                        from: path.join(getModulePath('scratch-arduino-blocks'), 'media'),
                        to: 'static/blocks-media/high-contrast'
                    },
                    {
                        // from: path.join(getModulePath('scratch-gui'),
                        from: path.join(getModulePath('scratch-arduino-gui'),
                            'src', 'lib', 'themes', 'high-contrast', 'blocks-media'),
                        to: 'static/blocks-media/high-contrast',
                        force: true
                    },
                    {
                        from: 'extension-worker.{js,js.map}',
                        context: path.join(getModulePath('scratch-arduino-vm'), 'dist', 'web')
                    },
                    {
                        from: path.join(getModulePath('scratch-arduino-gui'), 'src', 'lib', 'libraries', '*.json'),
                        to: 'static/libraries',
                        flatten: true
                    }
                ])
            ]
        }
    );
