import React from 'react'
import './App.css'
// import { useRoutes } from "react-router-dom";
// import routes from "@/router";
import AppHeader from 'components/app-header'
import AppFooter from 'components/app-footer'
import { useRoutes } from 'react-router-dom'
import routes from '@/router'

// eslint-disable-next-line react/display-name
function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="page">{useRoutes(routes)}</div>
      <AppFooter />
    </div>
  )
}

export default App
