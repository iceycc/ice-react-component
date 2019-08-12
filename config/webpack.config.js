const path = require("path");
const rootDir = path.dirname(__dirname);

module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            'src': path.resolve(rootDir, 'src'),// 这样配置后 @ 可以指向 src 目录
            "assets": path.resolve(rootDir, 'src','assets'),
            "utils": path.resolve(rootDir, 'src','utils'),
            // utils
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            }
        ]
    },
};
