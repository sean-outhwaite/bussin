import express from 'express'
import { getBusLocationsForStop } from '../at-api'

const router = express.Router()

router.get('/:stopId', async (req, res) => {
  try {
    res.json(await getBusLocationsForStop(req.params.stopId))
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
