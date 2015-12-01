var express = require('express');
var harp = require('harp');
var app = express();

var index = require('jade!./index.jade')
var post = require('jade!./post.jade')

var blogposts = require('./blog/posts/_data.json')

var production = process.env.NODE_ENV === 'production'

app.use(express.static(process.cwd() + '/public'));

import React from 'react'
import { renderToString } from 'react-dom/server'
import Sidebar from './components/Sidebar'
var sidebar = renderToString(<Sidebar/>)

app.get('/', (req, res) => {
  res.send(index({
    posts: blogposts,
    production: production,
    sidebar: sidebar
  }))
})

app.get('/posts/:post', (req, res) => {
  var slug = req.params.post
  var blogpost = blogposts.find(item => item.slug === slug)
  var content = require('./blog/posts/' + slug + '.md')
  res.send(post({
    content: content,
    production: production,
    sidebar: sidebar
  }))
})

var port = process.env.PORT || 9000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
