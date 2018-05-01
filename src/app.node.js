const path = require('path');
const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./App').default;
const assets = require('./assets.json').main;

const cssAssets = assets.filter(a => a.indexOf('.css') > -1)
const jsAssets = assets.filter(a => a.indexOf('.js') > -1)

const fileAssets = express.static(path.join(__dirname, '../build/public'))


const app = express();

app.use(fileAssets)

app.get('*', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <title>Document</title>
      <link rel="manifest" href="static/manifest.json">
      <link rel="shortcut icon" href="static/favicon.ico">
      ${cssAssets.map(src => `<link rel="stylesheet" href="${src}" />`).join('')}
    </head>
    <body>
      <div id="root">${ReactDOMServer.renderToString(<App />)}</div>
      ${jsAssets.map(src => `<script src="${src}"></script>`).join('')}
    </body>
    </html>
  `);
});

if (process.env.NODE_ENV === 'production') {
  app.listen(process.env.PORT || 8080);
} else {
  module.exports.default = app;
}