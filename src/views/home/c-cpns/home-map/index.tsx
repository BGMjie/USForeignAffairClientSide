import React, { useEffect, useRef, useState } from 'react'
import { LarkMap, LayerPopup, PointLayer, ScaleControl, ZoomControl } from '@antv/larkmap'
import type { LarkMapProps, LarkMapRefAttributes, LayerPopupProps, PointLayerProps } from '@antv/larkmap'

import { Button } from 'antd'
import { Scene } from '@antv/l7'

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    // token: "e492e89fcba95237f2eb3813f76c18dc",
    style: 'dark',
    zoom: 3,
    center: [116.1608, 40.1119]
  },
  logoPosition: 'bottomleft'
}

const items: LayerPopupProps['items'] = [
  {
    layer: 'myPointLayer1',
    fields: [
      {
        field: 'area',
        formatField: '区域'
      },
      {
        field: '入境金额',
        formatField: 'entryAmount'
      },
      {
        field: '出境金额',
        formatField: 'outboundAmount'
      },
      {
        field: 'info',
        formatField: '信息'
      },
      {
        field: 'lng',
        formatField: '经度'
      },
      {
        field: 'lat',
        formatField: '维度'
      }
    ]
  }
]

const pointLayerProps: Omit<PointLayerProps, 'source'> = {
  shape: 'circle',
  size: 40,
  color: {
    field: 'area',
    value: ['#ffed11']
  },
  state: {
    active: {
      color: 'pink' // 设置鼠标划过点的颜色
    }
  },
  autoFit: true,
  style: {
    opacity: 0.7
  },
  animate: {
    enable: true,
    speed: 5,
    rings: 3
  },
  blend: 'normal' // 图层元素混合效果 https://antv-l7.gitee.io/zh/docs/api/base#blend
}
const HomeMap = () => {
  const mapRef = useRef<LarkMapRefAttributes>()

  function onSceneLoaded(scene: Scene) {
    scene.addImage('plane', 'https://gw.alipayobjects.com/zos/bmw-prod/0ca1668e-38c2-4010-8568-b57cb33839b9.svg')
  }

  const [dot_data, setDotData] = useState({
    data: [],
    parser: {
      type: 'json',
      x: 'lng',
      y: 'lat'
    }
  })
  useEffect(() => {
    fetch('/dot1.json')
      .then((res) => res.text())
      .then((dot) => {
        const data = eval(dot)
        setDotData({ ...dot_data, data: data })
      })
  }, [])

  function light() {
    const scene = mapRef.current.getScene()
    scene.setMapStyle('amap://styles/light')
  }

  function dark() {
    const scene = mapRef.current.getScene()
    scene.setMapStyle('amap://styles/dark')
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (
    <LarkMap {...config} ref={mapRef} style={{ height: '60vh', width: '100vh' }} onSceneLoaded={onSceneLoaded}>
      <h2 style={{ position: 'absolute', left: '10px', color: 'white' }}>外交数据展示</h2>
      <div id="control">
        <Button>上一月</Button>
        <Button>下一月</Button>
        <Button onClick={dark}>变黑</Button>
        <Button onClick={light}>变白</Button>
        <Button>清除所有</Button>
      </div>
      <PointLayer {...pointLayerProps} source={dot_data} id="myPointLayer1" />
      <LayerPopup closeButton={true} closeOnClick={true} anchor="bottom-left" trigger="hover" items={items} />
      <ScaleControl />
      <ZoomControl />
    </LarkMap>
  )
}

export default HomeMap
