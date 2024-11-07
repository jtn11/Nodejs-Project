// middleware.js
const express = require('express');

const setupMiddleware = (app) => {
  app.set('view engine', 'ejs');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

module.exports = setupMiddleware;
