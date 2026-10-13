import express from 'express'
import { getStops } from '../at-api'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.json(await getStops())
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

export default router
