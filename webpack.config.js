const path = require('path');


module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'build'),//__dirname + '/build'
        filename:'build.js'
    },
    module:{
        loaders: [
            {
                test:/\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [resolve('src'), resolve('test'), resolve('node_modules/vue-awesome')]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

        ]
    },
    watch: true
}