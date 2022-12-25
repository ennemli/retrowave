const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
console.log(`Path:==>>  ${path}`)
module.exports = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    mode: 'development',
    module: {
        
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.glsl$/,
                exclude: /node_modules/,
                use: ['raw-loader', 'glslify-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
              {
                test: /\.(ogg|mp3)$/i,
                type: 'file-loader',
              }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        static: './dist',
        watchFiles: {
            options:
            { ignored: /node_modules/
        }
          }
    },
    plugins: [
        new HTMLWebpackPlugin({
            templateContent: ({htmlWebpackPlugin})=>`
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>My Portfolio</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                </head>
                <body>
                    <div id="root"></div>
                    </body>
                </html>
            `
        
            ,
            inject: true
        })
    ]
}