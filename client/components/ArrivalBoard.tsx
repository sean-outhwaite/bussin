import { json } from 'node:stream/consumers'
import { useTimes } from '../hooks.tsx'


const ArrivalBoard = ()=> {
  const {data, isError, isPending, error} = useTimes()

  if (isPending) return <img src='/giphy.gif' alt='moving bus'/>

  if (isError) {
    console.log(error)
    return <p>There was an error</p>
  }
  console.log(JSON.parse(data.data).response.entity)
  return (

    <>
    <p>{JSON.stringify(data)}</p>
    </>
  )
}

export default ArrivalBoard