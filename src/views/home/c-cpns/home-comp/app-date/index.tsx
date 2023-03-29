import React from 'react'
import { Space } from 'antd'
import IntegerStep from '@/views/home/c-cpns/home-comp/app-date/c-cpns/integer-step'
// import DecimalStep from '@/views/home/c-cpns/home-comp/app-date/c-cpns/decimal-step'
import MyDatePicker from '@/views/home/c-cpns/home-comp/app-date/c-cpns/my-date-picker'
import HomeTable from '@/views/home/c-cpns/home-comp/app-table'
const AppDate: React.FC = () => (
  <Space style={{ width: '100%' }} direction="vertical">
    <MyDatePicker />
    <IntegerStep />
    {/*<DecimalStep />*/}
    <HomeTable />
  </Space>
)
export default AppDate
