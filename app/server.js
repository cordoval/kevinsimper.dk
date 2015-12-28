import express from 'express'
import compression from 'compression'
import layout from 'jade!./layout.jade'
import blogdata from './blog/posts/_data.json'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './components/App'
import Content from './components/Content'
import Presentations from './components/Presentations'
import Blogposts from './components/Blogposts'

var app = express();
var production = process.env.NODE_ENV === 'production'

app.use(compression())
app.use(express.static(process.cwd() + '/public', { maxAge: 86400000 }));

app.get('/', (req, res) => {
  let content = renderToString(
    <App>
      <Content>
        <Presentations/>
        <Blogposts blogposts={blogdata}/>
      </Content>
    </App>
  )

  res.send(layout({
    content: content,
    production: production
  }))
})

app.get('/posts/:post', (req, res) => {
  var slug = req.params.post
  var blogpost = blogposts.find(item => item.slug === slug)
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
    production: production
  }))
})

var port = process.env.PORT || 9000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});
