// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/app'
import Navigation from '../components/misc/navbar/navbar'
import { BrowserRouter } from 'react-router-dom'
import './app.scss';



document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      < Navigation />
      <App/>
    </BrowserRouter>,
    document.body.appendChild(document.createElement('div')),
  )
})
