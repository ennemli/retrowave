module.exports={
    webpack: {
      configure: (webpackConfig, { env, paths }) => {
        webpackConfig.module.rules[1].oneOf=[{
          test: /\.glsl$/,
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          use: ['raw-loader', 'glslify-loader'],
      },{test: /\.(ogg|mp3|wav|mpe?g)$/i,
      loader: 'file-loader',},
      ...webpackConfig.module.rules[1].oneOf]
     
        return webpackConfig;
      },
    },
  };