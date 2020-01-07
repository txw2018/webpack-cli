const isDev = process.env.NODE_ENV !== 'production'
const plugins = [
  "@babel/plugin-transform-runtime"
]
if(!isDev){
  plugins.unshift(
    ["transform-remove-console", { "exclude": [ "error", "warn"] }]
  )
}
module.exports = {
  presets: [
    "@babel/preset-env"
  ],
  plugins:plugins
}