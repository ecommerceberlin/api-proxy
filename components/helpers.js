import Cors from 'cors'
import moment from 'moment-timezone'
import Redis from 'ioredis'


// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})


// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }


export async function addCors(req, res){
  return await runMiddleware(req, res, cors)
}


export function time(tz = "Europe/Warsaw"){
  return moment().tz(tz).format("HH:mm:ss");
}



function fixUrl(url) {
  if (!url) {
    return ''
  }
  if (url.startsWith('redis://') && !url.startsWith('redis://:')) {
    return url.replace('redis://', 'redis://:')
  }
  if (url.startsWith('rediss://') && !url.startsWith('rediss://:')) {
    return url.replace('rediss://', 'rediss://:')
  }
  return url
}

export function getRedis() {
  return new Redis(fixUrl(process.env.REDIS_URL))
}


export function getIP(req){
  return req.headers['x-forwarded-for'] || req.headers['Remote_Addr'] || '1'
}