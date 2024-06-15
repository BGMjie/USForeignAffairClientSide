import React from 'react'
import { Button, DatePicker, Space } from 'antd'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { changeDateAction } from '@/store/modules/home'

const { RangePicker } = DatePicker

// const onChange = (date: Dayjs) => {
//   if (date) {
//     console.log('Date: ', date)
//   } else {
//     console.log('Clear')
//   }
// }

const MyDatePicker: React.FC = () => {
  const dispatch = useDispatch()
  const { dateStrings } = useSelector(
    (state) => ({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dateStrings: state.home.dateStrings
    }),
    shallowEqual
  )
  const dates: dayjs.Dayjs[] = [dayjs(dateStrings[0]), dayjs(dateStrings[1])]
  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      dispatch(changeDateAction(dateStrings))
      // console.log('From: ', dates[0], ', to: ', dates[1])
      // console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    } else {
      console.log('Clear')
    }
  }

  const rangePresets: {
    label: string
    value: [Dayjs, Dayjs]
  }[] = [
    { label: '201705 - 201706', value: [dayjs('2017-05-01T00:00:00.000Z'), dayjs('2017-06-01T00:00:00.000Z')] },
    { label: 'Last 7 Days', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: 'Last 14 Days', value: [dayjs().add(-14, 'd'), dayjs()] },
    { label: 'Last 30 Days', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: 'Last 90 Days', value: [dayjs().add(-90, 'd'), dayjs()] }
  ]

  return (
    <Space direction="vertical" size={12}>
      <div>请选择您要查询的日期范围</div>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*// @ts-ignore*/}
      <RangePicker value={dates} presets={rangePresets} onChange={onRangeChange} />
      {/*<span>*/}
      {/*  <Button>确认</Button>*/}
      {/*</span>*/}
    </Space>
  )
}
export default MyDatePicker
