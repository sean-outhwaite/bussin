import express from 'express'
import {getUpcomingTrips} from '../at-api'

const router = express.Router()

router.get('/:stopId', async (req, res) => {

  try {
    res.json(await getUpcomingTrips(req.params.stopId)
    )
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
export default router