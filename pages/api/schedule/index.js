
import {addCors, cache} from '../../../components'
import moment from 'moment-timezone'

const url = 'https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl/presenters';

async function handler(req, res) {

    const time = moment().tz("Europe/Warsaw").format("HH:mm");
    
    await addCors(req, res)
    const json = await cache(req, res, url);
    const {data} = json;
    const filtered = data.filter(item => item.presentation_time)

    //get current time!

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

  