
import {addCors, cache} from '../../../components'
import fetch from 'node-fetch'

async function handler(req, res) {
  // Run the middleware
  await addCors(req, res)

  const {query: {url}} = req

  //we cache only known sources....
  if(url.indexOf("https://api.eventjuicer.com/") === -1 && url.indexOf("https://localise.biz") === -1){
    res.status(500);
    res.end("Bad request")
    return
  }

  const data = await fetch(url).then(res => res.json());

  res.setHeader("cache-control", "s-maxage=10, stale-while-revalidate")
  res.json(data)
}

export default handler


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}


