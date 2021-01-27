
import {addCors, cache} from '../../../components'

async function handler(req, res) {
  // Run the middleware
  await addCors(req, res)

  // const json = await cache(req, res, url);
  // const {data} = json;


  res.setHeader("cache-control", "s-maxage=30, stale-while-revalidate")

  res.json({ message: 'Hello Everyone!' })
}

export default handler



export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}


