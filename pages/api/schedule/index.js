
import {addCors, cache, time} from '../../../components'

const url = 'https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl/presenters';

async function handler(req, res) {

    await addCors(req, res)
    const json = await cache(req, res, url);
    const {data} = json;
    const _time = time();

    const filtered = data.filter(item => item.presentation_time <= _time )

    //get current time!

    res.setHeader("cache-control", "s-maxage=30, stale-while-revalidate")

    res.json( filtered )
}

export default handler

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
}

  