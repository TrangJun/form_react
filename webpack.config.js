module.exports = {
	mode: "development",
	entry: {
		app: ["./src/main.js"],
	},
	devServer: {
		contentBase: __dirname,
		port: 8080,
		host: 'localhost',
	},
	output: {
		filename: "main.bundle.js",
		path: __dirname+"/dist"
	},
	module: {
		rules: [
		{
			test:/\.(js|jsx)$/,
			use:['babel-loader']
		},
		{
			test:/\.css$/,
			loader: 'style-loader!css-loader',
		}]

	}
}
