// @vitest-environment jsdom
import { describe, it, expect,vi } from 'vitest'
import nock from 'nock'
import { renderRoute } from './setup.tsx'
import { within } from '@testing-library/react'


describe('viewing the board page', ()=>{
it('shows the header', async()=>{

    const scope = nock('http://localhost:3000').get('/api/v1/trips').reply(200, [
    {
        "type": "stoptrip",
        "id": "stop:7151-93995941_trip:25-02505-47100-2-6750e6e5",
        "attributes": {
            "arrival_time": "13:40:48",
            "departure_time": "13:40:48",
            "direction_id": 0,
            "drop_off_type": 0,
            "pickup_type": 0,
            "route_id": "25B-202",
            "service_date": "2025-11-18",
            "shape_id": "25-02505-a8a58e8a",
            "stop_headsign": "CITY CENTRE",
            "stop_id": "7151-93995941",
            "stop_sequence": 39,
            "trip_headsign": "Blockhouse Bay To City Centre Via Dominion Rd",
            "trip_id": "25-02505-47100-2-6750e6e5",
            "trip_start_time": "13:05:00"
        },
        "delay": 87
    }])
 

const {...screen} = renderRoute('/board')

const heading = await screen.findByText('25B')
expect(heading).toBeVisible()
expect(scope.isDone()).toBe(true)

const arrivalCard = await within(heading.parentElement!).findAllByRole('paragraph')
expect(arrivalCard).toMatchInlineSnapshot(`
  [
    <p
      class="text-blue-500"
      role="paragraph"
    >
      25B
    </p>,
    <p
      role="paragraph"
    >
      Arrival: 
      <span
        class="dark:text-green-300 text-green-600"
      >
        Now
      </span>
    </p>,
    <p
      class="lg:text-sm font-normal"
      role="paragraph"
    >
      Scheduled: 
      13:40:48
    </p>,
    <p
      class="lg:text-sm font-normal"
      role="paragraph"
    >
      Actual: 
      Invalid Date
    </p>,
    <p
      class="lg:text-sm font-normal"
      role="paragraph"
    >
      Delay: 
      87
    </p>,
  ]
`)
})

})