module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production' ? '/vue3-week7-dashboard/' : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: '李曉寧水彩畫家',
    },
  },
};
