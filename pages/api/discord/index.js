
import {addCors, time} from '../../../components'
import fetch from 'node-fetch'
import moment from 'moment';


async function handler(req, res) {

    await addCors(req, res)

    res.setHeader("cache-control", "s-maxage=10, stale-while-revalidate")

    res.json( {} )
}

export default handler

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
}

  