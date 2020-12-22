module.exports = {
  plugins: {
    autoprefixer: {},
    /* main.js  引入 i m p ort 'amfe-flexible' */
    'postcss-pxtorem': {
      rootValue: 192, // PC换算的基数192
      propList: ['*'],
      exclude: /styles\/1920\/*/i, //不转换styles/mobile目录
      propList: ['*']
    },
    'postcss-px2rem': {
      remUnit: 37.5, //  H5换算的基数37.5
      // selectorBlackList  : ['weui','mu'], // 忽略转换正则匹配项
      propList: ['*'],
      exclude: /styles\/750\/*/i //不转换styles/normal目录
    }
  }
}
