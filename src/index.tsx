import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ThemeProvider } from 'styled-components'
// import "antd/dist/";
import 'normalize.css'
import 'antd/dist/reset.css'
import './assert/css/reset.less'
import './assert/css/index.less'

import store from '@/store'
import theme from '@/assert/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Suspense fallback="正在加载">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          <App />
        </HashRouter>
      </ThemeProvider>
    </Provider>
  </Suspense>
)
