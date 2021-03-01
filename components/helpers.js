import Cors from 'cors'
import moment from 'moment-timezone'
import Redis from 'ioredis'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'


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

export class RedisHelper {

  connection = null
  key = "item"
  listkey = "itemlist"
  debug = true;

  constructor(namespace) {
    this.connection = new Redis(fixUrl(process.env.REDIS_URL));
    this.key  = namespace
    this.listkey = `${namespace}list6`;
  }

  genKey(id){
    return `${this.key}:${id}`
  }

  async setItem(id, data){
    return await this.connection.hmset( this.genKey(id), data )
  }

  async getItem(id){
    await this.connection.hgetall( this.genKey(id) )
  } 

  async addToList(arr, index="id"){
    //const keys = await this.connection.lrange(this.listkey, 0, -1) // 0, -1 => all items

    if(!isArray(arr) || isEmpty(arr)){
      return
    }

    this.connection.del(this.listkey)
    const keys = arr.map(item => this.genKey(item[index]))

    const p = this.connection.pipeline()
    arr.forEach(item => p.hset( this.genKey(item[index]), item ))
    p.lpush(this.listkey, keys)
    await p.exec();

  }
  
  async getList(ttl){
    const keys = await this.connection.lrange(this.listkey, 0, -1) // 0, -1 => all items
    const p = this.connection.pipeline()
    keys.forEach(key => p.hgetall(key))
    const res = await p.exec();
    return res.map(res => res[1])
  }

  quit(){
    this.connection.quit();
  }

}
  




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






export function getIP(req){
  return req.headers['x-forwarded-for'] || req.headers['Remote_Addr'] || '1'
}