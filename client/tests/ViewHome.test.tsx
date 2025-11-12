// @vitest-environment jsdom
import { describe, it, expect,vi } from 'vitest'
import { renderRoute } from './setup.tsx'


describe('viewing the home page', ()=>{

 vi.mock( ('../components/Home'), () => ({
  default:(() => `<div>Map</div>`)
}))

it('shows the header', async()=>{
 

const {...screen} = renderRoute('/')

const heading = await screen.findByText('Bussin')

expect(heading).toBeVisible()
})

})