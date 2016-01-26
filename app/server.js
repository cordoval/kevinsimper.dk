import express from 'express'
import compression from 'compression'
import layout from 'jade!./layout.jade'
import blogdata from './blog/posts/_data.json'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './components/App'
import Content from './components/Content'
import HelloWorld from './components/HelloWorld'
import Blogposts from './components/Blogposts'
import About from './components/About'

var app = express();
var production = process.env.NODE_ENV === 'production'

var assets = (production) ? require(__dirname + '/../public/build/webpack.assets.json') : {}

app.use(compression())
app.use(express.static(process.cwd() + '/public', { maxAge: 86400000 }));

app.get('/', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <HelloWorld/>
        <Blogposts blogposts={blogdata}/>
      </Content>
    </App>
  )

  res.send(layout({
    content: content,
    production: production,
    assets
  }))
})

app.get('/posts/:post', (req, res) => {
  var slug = req.params.post
  var blogpost = blogdata.find(item => item.slug === slug)
  var blogcontent = require('./blog/posts/' + slug + '.md')

  let content = renderToString(
    <App>
      <Content>
        <div dangerouslySetInnerHTML={{__html: blogcontent}}></div>
      </Content>
    </App>
  )

  res.send(layout({
    content: content,
    production: production,
    assets
  }))
})

app.get('/about', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <About/>
      </Content>
    </App>
  )
  res.send(layout({
    content,
    production,
    assets
  }))
})

var port = process.env.PORT || 9000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
