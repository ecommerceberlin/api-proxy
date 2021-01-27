
import {addCors} from '../../../components'

async function handler(req, res) {
  // Run the middleware
  await addCors(req, res)

  // Rest of the API logic
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


