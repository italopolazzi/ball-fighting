// // vue.config.js
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                implementation: require('sass'), // This line must in sass option
            },
        },
    }
}