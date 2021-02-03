
import {addCors, time} from '../../../components'
import fetch from 'node-fetch'
import moment from 'moment';

const url = 'https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl/presenters';

async function handler(req, res) {

    await addCors(req, res)
    const {data} = await fetch(url).then(response => response.json());
    const _time = time();

    const filtered = data.filter(item => {

      if(!item.video || item.video.indexOf("http") ===-1) return false
      
      if(!item.presentation_time || !item.video_length_minutes) return false

      if(item.presentation_time > _time) return false

      const presentation_end_time = moment(item.presentation_time, "HH:mm").add(item.video_length_minutes, "m").format("HH:mm")

      if(presentation_end_time < _time) return false
  
      return true;

    } )

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

  