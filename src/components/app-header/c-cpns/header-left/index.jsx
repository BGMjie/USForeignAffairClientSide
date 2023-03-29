import React, { memo } from 'react'
import { LeftWrapper } from 'components/app-header/c-cpns/header-left/style'

import IconLogo from '@/assert/svg/icon_logo'

// eslint-disable-next-line react/display-name
const HeaderLeft = memo(() => {
  return (
    <LeftWrapper>
      <div className="logo">
        <IconLogo></IconLogo>
      </div>
    </LeftWrapper>
  )
})

export default HeaderLeft
