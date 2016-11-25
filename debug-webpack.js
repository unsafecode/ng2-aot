const webpack = require("webpack");
const webpackProd = require("./webpack.config");
/*
    Uses CopyWebpackPlugin to update all .html files provided
    from the NowBanking.Static folder.

    Should be run BEFORE start a build:prod
 */
const compiler = webpack(webpackProd);

compiler.run((err) => {
    if (err) {
        console.error(err);
        exit(1);
    }
});