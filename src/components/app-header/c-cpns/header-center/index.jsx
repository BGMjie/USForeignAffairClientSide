import React, { memo } from 'react'
import { CenterWrapper } from 'components/app-header/c-cpns/header-center/style'
import IconSearchBar from '@/assert/svg/icon-search-bar'

// eslint-disable-next-line react/display-name
const HeaderCenter = memo(() => {
  return (
    <CenterWrapper>
      <div className="search-bar">
        <div className="text">搜索</div>
        <div className="icon">
          <IconSearchBar></IconSearchBar>
        </div>
      </div>
    </CenterWrapper>
  )
})

export default HeaderCenter
