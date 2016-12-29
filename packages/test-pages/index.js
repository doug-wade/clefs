"use strict";

const Koa = require('koa');
const app = new Koa();

console.log('Starting Server...');

app.use(require('koa-static')('dist'));

console.log('Listening on localhost:3000');
app.listen(3000);
