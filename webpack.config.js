module.exports = {
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: `./src/index.js`,

  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "development",

  // ローカル開発用環境を立ち上げる
  // 実行時にブラウザが自動的に localhost を開く
  devServer: {
    contentBase: "./dist",
    open: true,
  },

  //というかCDN分けるとwebpackのうまみ無くなるのでは？？？
  // //reqire('three')で呼び出されるモジュールがグローバル変数のTHREEになる
  // externals: {
  //   three:'THREE'
  // },

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js",
  },
};
