const merge = require("webpack-merge");
const commConfig = require("./config/webpack.common.js");
const developmentConfig = require("./config/webpack.dev.js");
const productionConfig = require("./config/webpack.prod.js");

module.exports = env => {
    if(env.NODE_ENV === "production"){
        return merge(commConfig,productionConfig);
    }
    return merge(commConfig,developmentConfig);
}