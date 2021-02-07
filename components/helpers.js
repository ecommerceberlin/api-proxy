import Cors from 'cors'
import moment from 'moment-timezone'

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