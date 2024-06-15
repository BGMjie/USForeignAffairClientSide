import React, { useEffect, useRef, useState } from 'react'
import {
  LarkMap,
  LayerPopup,
  PointLayer,
  ScaleControl,
  ZoomControl,
  LineLayer,
  PolygonLayerProps,
  PolygonLayer
} from '@antv/larkmap'
import type {
  LarkMapProps,
  LarkMapRefAttributes,
  LayerPopupProps,
  PointLayerProps,
  LineLayerProps
} from '@antv/larkmap'
import { HomeMapWrapper } from '@/views/home/c-cpns/home-map/style'
import { Scene } from '@antv/l7'

const config: LarkMapProps = {
  mapType: 'Gaode',
  mapOptions: {
    token: 'e492e89fcba95237f2eb3813f76c18dc',
    zoom: 1,
    center: [-100.728276, 38.685516],
    style: 'dark',
    pitch: 0
  },
  logoPosition: 'bottomleft'
}
const items: LayerPopupProps['items'] = [
  {
    layer: 'myPointLayer',
    fields: [
      {
        field: 'name',
        formatField: '区域'
      },
      {
        field: 'lng',
        formatField: '经度'
      },
      {
        field: 'lat',
        formatField: '纬度'
      }
    ]
  }
]
const pointLayerProps: Omit<PointLayerProps, 'source'> = {
  shape: 'circle',
  size: 25,
  color: {
    field: 'name',
    value: ['#ffed11']
  },
  state: {
    active: {
      color: 'pink' // 设置鼠标划过点的颜色
    }
  },
  autoFit: false,
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
const lineLayerProps: Omit<LineLayerProps, 'source'> = {
  name: 'myLine',
  shape: 'arc',
  state: {
    active: true
  },
  color: '#ffed11',
  size: 3,
  blend: 'normal',
  autoFit: true,
  style: {
    opacity: 0.4
  }
}

const worldLineLayerProps: Omit<LineLayerProps, 'source'> = {
  name: 'worldLine',
  color: '#41fc9d',
  size: 0.5,
  style: {
    opacity: 0.4
  },
  state: {
    active: true
  }
}

const flyLineLayerProps: Omit<LineLayerProps, 'source'> = {
  color: '#ff6b34',
  texture: 'plane',
  animate: { duration: 1, interval: 0.2, trailLength: 0.05 },
  shape: 'arc',
  state: {
    active: true
  },
  size: 15,
  blend: 'normal',
  style: {
    textureBlend: 'replace',
    lineTexture: true, // 开启线的贴图功能
    iconStep: 10 // 设置贴图纹理的间距
  },
  zIndex: 3
}

const pickupPointLayerOptions: Omit<PointLayerProps, 'source'> = {
  shape: 'circle',
  state: {
    active: true
  },
  size: 2,
  color: '#2773bd',
  blend: 'normal',
  zIndex: 2
}

const unPickupPointLayerStyle: Omit<PointLayerProps, 'source'> = {
  shape: 'circle',
  state: {
    active: true
  },
  size: 3,
  color: '#22409a',
  blend: 'additive',
  zIndex: 2
}

const polygonLayerOptions: Omit<PolygonLayerProps, 'source'> = {
  autoFit: false,
  shape: 'fill',
  color: 'blue',
  style: {
    opacity: 1
  },
  visible: true,
  state: {
    select: { color: 'red' }
  }
}
const HomeMap = (props) => {
  const mapRef = useRef<LarkMapRefAttributes>()
  const bubbleLayerRef = useRef()
  useEffect(() => {
    const scene = mapRef?.current?.getScene()
    // eslint-disable-next-line react/prop-types
    scene?.setMapStyle(props.style)
  })

  function onSceneLoaded(scene: Scene) {
    scene.addImage('plane', 'https://gw.alipayobjects.com/zos/bmw-prod/0ca1668e-38c2-4010-8568-b57cb33839b9.svg')
  }

  const [pointSource, setPointSource] = useState({
    data: [],
    parser: {
      type: 'json',
      x: 'lng',
      y: 'lat'
    }
  })
  const [lineSource, setLineSource] = useState({
    data: [],
    parser: { type: 'json', x: 'x', y: 'y', x1: 'x1', y1: 'y1' }
  })

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const gis_data = props?.merged_data?.data?.gis_data
    const data_line = gis_data?.map((item) => {
      return { x: -100.7282763, y: 38.6855143, x1: item.lng, y1: item.lat }
    })
    // console.log(data)
    // console.log(data_line)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    setPointSource((prevState) => ({ ...prevState, data: gis_data }))
    setLineSource({ ...lineSource, data: data_line })
    // eslint-disable-next-line react/prop-types
  }, [props?.merged_data?.data])

  const [worldLineSource, setWorldLineSource] = useState<LineLayerProps['source']>({
    data: {}
    // parser: { type: 'geojson' }
  })
  useEffect(() => {
    fetch('/world.json')
      .then((res) => res.json())
      .then(function (world) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        console.log(world)
        setWorldLineSource({ ...worldLineSource, data: world })
      })
  }, [])

  const [lineData, setLineData] = useState<LineLayerProps['source']>({
    data: '',
    parser: {
      type: 'csv',
      y: 'pickup_latitude',
      x: 'pickup_longitude',
      y1: 'dropoff_latitude',
      x1: 'dropoff_longitude'
    }
  })
  const [pickupPointData, setPickupPointData] = useState<LineLayerProps['source']>({
    data: '',
    parser: {
      type: 'csv',
      y: 'pickup_latitude',
      x: 'pickup_longitude'
    }
  })
  const [unPickupPointData, setUnPickupPointData] = useState<LineLayerProps['source']>({
    data: '',
    parser: {
      type: 'csv',
      y: 'dropoff_latitude',
      x: 'dropoff_longitude'
    }
  })
  const [polygon_options, setPolygonOptions] = useState(polygonLayerOptions)
  const [country_polygon_source, setCountryPolygonSource] = useState<PolygonLayerProps['source']>({
    data: { type: 'FeatureCollection', features: [] }
    // parser: { type: 'geojson' }
  })
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const data_obj: JSON = props?.merged_data?.data
    if (data_obj) {
      const country_polygon_source = JSON.parse(JSON.stringify(data_obj['geojson']))
      console.log(111, country_polygon_source)
      setCountryPolygonSource((prevState) => ({ ...prevState, data: country_polygon_source }))
    }
    // fetch('https://gw.alipayobjects.com/os/antfincdn/Y8eGLb9j9v/hangzhou-district.json')
    //   .then((response) => response.json())
    //   .then((data: any) => {
    //     setCountryPolygonSource((prevState) => ({ ...prevState, data }))
    //   })
    // eslint-disable-next-line react/prop-types
  }, [props?.merged_data?.data])
  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/4d3e5c6e-d3d6-410e-92bc-2e3fe6745a24.csv')
      .then((res) => res.text())
      .then((data) => {
        setLineData({ ...lineData, data: data })
        setPickupPointData({ ...pickupPointData, data: data })
        setUnPickupPointData({ ...unPickupPointData, data: data })
      })
  }, [])
  return (
    <HomeMapWrapper>
      <div id="map">
        <LarkMap {...config} ref={mapRef} style={{ height: '60vh', width: '100vh' }} onSceneLoaded={onSceneLoaded}>
          <h2 style={{ position: 'absolute', left: '10px', color: 'white' }}>外交数据展示</h2>
          <PolygonLayer {...polygon_options} source={country_polygon_source} />
          <LineLayer {...lineLayerProps} source={lineSource} id="myLineLayer" />
          <LineLayer {...worldLineLayerProps} source={worldLineSource} id="myWorldLineLayer" />
          <LineLayer {...flyLineLayerProps} source={lineSource} id="myFlyLineLayer" />
          <PointLayer {...pointLayerProps} ref={bubbleLayerRef} source={pointSource} id="myPointLayer" />
          <LayerPopup closeButton={true} closeOnClick={true} anchor="bottom-left" trigger="hover" items={items} />
          {/* eslint-disable-next-line react/jsx-no-undef */}
          {/*<LineLayer pointSource={lineData} {...lineLayerOptions} />*/}
          {/*<PointLayer pointSource={pickupPointData} {...pickupPointLayerOptions} />*/}
          {/*<PointLayer pointSource={unPickupPointData} {...unPickupPointLayerStyle} />*/}
          <ScaleControl />
          <ZoomControl />
        </LarkMap>
      </div>
    </HomeMapWrapper>
  )
}

export default HomeMap
