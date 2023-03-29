import React, { useState } from 'react'
import { Col, InputNumber, Row, Slider } from 'antd'

const IntegerStep: React.FC = () => {
  const [inputValue, setInputValue] = useState(1)

  const onChange = (newValue: number) => {
    setInputValue(newValue)
  }

  return (
    <Row>
      <Col span={12}>
        <Slider min={1} max={100} onChange={onChange} value={typeof inputValue === 'number' ? inputValue : 0} />
      </Col>
      <Col span={4}>
        <InputNumber min={1} max={100} style={{ margin: '0 16px' }} value={inputValue} onChange={onChange} />
      </Col>
      <Col span={12}>
        <Slider range={{ draggableTrack: true }} defaultValue={[20, 50]} />
      </Col>
    </Row>
  )
}
export default IntegerStep
