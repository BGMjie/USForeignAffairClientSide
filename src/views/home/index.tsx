import React, { useEffect, useState } from 'react'
import { Button, Space } from 'antd'

// import HomeBanner from '@/views/home/c-cpns/home-banner'
import { HomeWrapper } from '@/views/home/style'
import HomeMap from '@/views/home/c-cpns/home-map'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import {
  addNumberAction,
  fetchTrumpDataAction,
  fetchMergedDataAction,
  subNumberAction,
  changeDateAction
} from '@/store/modules/home'
import MyDatePicker from '@/views/home/c-cpns/home-comp/app-date/c-cpns/my-date-picker'
import IntegerStep from '@/views/home/c-cpns/home-comp/app-date/c-cpns/integer-step'
import HomeTable from '@/views/home/c-cpns/home-comp/app-table'
import dayjs, { Dayjs } from 'dayjs'

function Home() {
  const dispatch = useDispatch()
  const { dateStrings } = useSelector(
    (state) => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dateStrings: state.home.dateStrings
    }),
    shallowEqual
  )
  // console.log(dates, dateStrings)
  // 发送获取trump的异步数据
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchTrumpDataAction(dateStrings))
  }, [dateStrings])
  // const { trump_data } = useSelector(
  //   (state) => ({
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     trump_data: state.home.trump_data
  //   }),
  //   shallowEqual
  // )
  // 发送获取merged的异步数据
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(fetchMergedDataAction(dateStrings))
  }, [dateStrings])
  const { merged_data } = useSelector(
    (state) => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      merged_data: state.home.merged_data
    }),
    shallowEqual
  )
  const { count } = useSelector(
    (state) => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      count: state.home.count
    }),
    shallowEqual
  )

  // 2.使用dispatch直接派发action

  // useEffect(() => {
  //   dispatch(fetchTrumpDataAction('payload'))
  // }, [dispatch])
  const [mapStyle, setMapStyle] = useState('amap://styles/dark')
  function addNumberHandle(num, isAdd = true) {
    if (isAdd) {
      dispatch(addNumberAction(num))
    } else {
      dispatch(subNumberAction(num))
    }
  }
  function light() {
    setMapStyle('amap://styles/light')
  }

  function dark() {
    setMapStyle('amap://styles/dark')
  }

  function click(type: number) {
    //dateStrings
    if (type === 0) {
      const to_date: string = dateStrings[0]
      const from_date: string = dayjs(to_date).subtract(1, 'months').format('YYYY-MM-DD')
      dispatch(changeDateAction([from_date, to_date]))
      console.log(from_date, to_date)
    } else {
      const from_date: string = dateStrings[1]
      const to_date: string = dayjs(from_date).add(1, 'months').format('YYYY-MM-DD')
      dispatch(changeDateAction([from_date, to_date]))
      console.log(from_date, to_date)
    }
  }

  return (
    <HomeWrapper>
      {/*<HomeBanner></HomeBanner>*/}
      {/*<HomeMap className="map" style={mapStyle} trump_data={trump_data} merged_data={merged_data}></HomeMap>*/}
      <HomeMap className="map" style={mapStyle} merged_data={merged_data}></HomeMap>
      <div id="control">
        <Button
          onClick={() => {
            click(0)
          }}
        >
          上一月
        </Button>
        <Button
          onClick={() => {
            click(1)
          }}
        >
          下一月
        </Button>
        <Button onClick={dark}>变黑</Button>
        <Button onClick={light}>变白</Button>
        <Button>清除所有</Button>
      </div>
      <div className="table">
        <Space style={{ width: '66%' }} direction="vertical">
          <MyDatePicker />
          {/*<IntegerStep />*/}
          {/*<DecimalStep />*/}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          <HomeTable merged_data={merged_data} />
        </Space>
      </div>
      {/*<div className="counter">*/}
      {/*  <h2>当前计数: {count}</h2>*/}
      {/*  <button onClick={() => addNumberHandle(1)}>+1</button>*/}
      {/*  <button onClick={() => addNumberHandle(6)}>+6</button>*/}
      {/*  <button onClick={() => addNumberHandle(6, false)}>-6</button>*/}
      {/*</div>*/}
    </HomeWrapper>
  )
}

export default Home
