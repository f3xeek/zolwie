const path = require('path');

module.exports = {
    entry: {index:'./dist/index.js',
            lobby:'./dist/lobby.js'
    },
    output: {
        filename: 'bundle.[name].js',
        path: path.resolve(__dirname),
    },
    mode: 'development'
};
