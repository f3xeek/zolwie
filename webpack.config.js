const path = require('path');

module.exports = {
    entry: {
        index: './dist/index.js',
        lobby: './dist/lobby.js',
        game: './dist/game.js',
        test: "./dist/test.js"
    },
    output: {
        filename: 'bundle.[name].js',
        path: path.resolve(__dirname),
    },
    mode: 'development'
};
