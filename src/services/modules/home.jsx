import hyRequest from '@/services/request'

export function getTrumpData(payload) {
  // console.log('到达getTrumpData函数')
  // console.log('payload:' + payload[0])

  return hyRequest.get({
    url: '/v1_0/trump',
    params: {
      from_date: payload[0],
      to_date: payload[1]
    }
  })
}

export function getMergedData(payload) {
  // console.log('到达getTrumpData函数')
  // console.log('payload:' + payload[0])

  return hyRequest.get({
    url: '/v1_0/merged',
    params: {
      from_date: payload[0],
      to_date: payload[1]
    }
  })
}
