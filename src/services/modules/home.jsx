import hyRequest from '@/services/request'

export function getHomeData() {
  return hyRequest.get({
    url: '/home/data'
  })
}
export function getLyricData() {
  hyRequest
    .request({
      url: '/lyric?id=500665346'
    })
    .then((res) => {
      console.log('res:', res)
    })
}

export function getLyricData2() {
  hyRequest
    .get({
      url: '/lyric',
      params: {
        id: 500665346
      }
    })
    .then((res) => {
      console.log('res:', res)
    })
}
