import React, { useEffect } from 'react'
// import HomeBanner from '@/views/home/c-cpns/home-banner'
import { HomeWrapper } from '@/views/home/style'
import HomeMap from '@/views/home/c-cpns/home-map'
import AppDate from '@/views/home/c-cpns/home-comp/app-date'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { addNumberAction, fetchHomeDataAction, subNumberAction } from '@/store/modules/home'

function Home() {
  const { count } = useSelector(
    (state) => ({
      count: state.home.count
    }),
    shallowEqual
  )

  // 2.使用dispatch直接派发action
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHomeDataAction('payload'))
  }, [dispatch])

  function addNumberHandle(num, isAdd = true) {
    if (isAdd) {
      dispatch(addNumberAction(num))
    } else {
      dispatch(subNumberAction(num))
    }
  }

  console.log('App render')
  return (
    <HomeWrapper>
      {/*<HomeBanner></HomeBanner>*/}
      <HomeMap />
      <div className="date">
        <AppDate />
      </div>
      <div className="counter">
        <h2>当前计数: {count}</h2>
        <button onClick={() => addNumberHandle(1)}>+1</button>
        <button onClick={() => addNumberHandle(6)}>+6</button>
        <button onClick={() => addNumberHandle(6, false)}>-6</button>
      </div>
    </HomeWrapper>
  )
}

export default Home
