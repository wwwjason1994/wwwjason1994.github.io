//不想发生到部署地址的文件
fis.match('_*.{css,less,js}',{
  release: false
});

// 加 md5
fis.match('*.{js,css,png}', {
  useHash: true
});

fis.match('::image',{
  useHash: true
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
});

// 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

fis.match('*.js', {
  // fis-optimizer-uglify-js 插件进行压缩，已内置
  optimizer: fis.plugin('uglify-js')
});

fis.match('*.{css,less}', {
  // fis-optimizer-clean-css 插件进行压缩，已内置
  optimizer: fis.plugin('clean-css')
});

// fis.match('*.png', {
//   // fis-optimizer-png-compressor 插件进行压缩，已内置
//   optimizer: fis.plugin('png-compressor')
// });

//文件合并
fis.match('::package', {
  postpackager: fis.plugin('loader')
});

fis.match('*.less', {
  parser: fis.plugin('less-2.x'),
  rExt: '.css'
});

fis.match('*.{less,css}', {
  packTo: '/static/aio.css'
});

fis.match('/js/{main.js,juery-*.js}', {
  packTo: '/static/aio.js'
});










// 加 md5
//fis.match('/**.{js,css,less}', {
//  useHash: true
//  //release:'/$1'
//});

// 启用 fis-spriter-csssprites 插件
// fis.match('::package', {
//   spriter: fis.plugin('csssprites')
// });

// 对 CSS 进行图片合并
// fis.match('*.css', {
//   // 给匹配到的文件分配属性 `useSprite`
//   useSprite: true
// });
//
//fis.match('*.js', {
//  // fis-optimizer-uglify-js 插件进行压缩，已内置
//  optimizer: fis.plugin('uglify-js')
//});
//
//fis.match('*.{css,less}', {
//   // fis-optimizer-clean-css 插件进行压缩，已内置
//   optimizer: fis.plugin('clean-css')
//});
//
//fis.match('*.png', {
//  // fis-optimizer-png-compressor 插件进行压缩，已内置
//  optimizer: fis.plugin('png-compressor')
//});
//
//
////文件打包
//fis.match('::package', {
//  packager: fis.plugin('map', {
//    useTrack : false, // 是否输出路径信息,默认为 true
//    'css/style.css': [
//      '/css/cube.css',
//      '/**main.less'
//    ]
//  })
//});
//
//fis.match('*.less', {
//  // .less 文件后缀构建后被改成 .css 文件
//  parser: fis.plugin('less'),
//  // .less 文件后缀构建后被改成 .css 文件
//  rExt: '.css'
//});
//
//fis.match('_*.less',{
//  release: false
//});
//fis.match('_*.css',{
//  release: false
//});


// fis.media('debug').match('*.{js,css,png}', {
//   useHash: false,
//   useSprite: false,
//   optimizer: null
// })