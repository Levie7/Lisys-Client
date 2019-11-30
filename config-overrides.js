const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryDirectory: 'es',
    }),
    addLessLoader({
        javascriptEnabled: true,
    })
);
