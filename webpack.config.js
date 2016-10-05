module.exports = {
    entry: './src/index.js',
    output: {
        filename: './dist/index.bundle.js',
        target: 'node',
        libraryTarget: 'commonjs'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-flow-strip-types']
                }
            }
        ]
    }
};
