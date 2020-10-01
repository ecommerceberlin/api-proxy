
import Cors from 'cors'
import {runMiddleware} from '../../../components'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})


async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' })
}

export default handler

/**
 * 

res.status(code) - A function to set the status code. code must be a valid HTTP status code
res.json(json) - Sends a JSON response. json must be a valid JSON object
res.send(body) - Sends the HTTP response. body can be a string, an object or a Buffer
res.redirect([status,] path) - Redirects to a specified path or URL. status must be a valid HTTP status code. If not specified, status defaults to "307" "Found".


 */