import React from 'react'
import { Dropdown, Radio, Label} from 'keep-react'
const Filters = () => {
  return (
    <section className='text-white bg-transparent p-4 rounded-lg flex flex-wrap justify-start items-center ml-[20%] mr-[20%] mt-10'>
        <div>
          <h3 className='text-xl mb-1 ml-5 font-poppinsBold mr-8 text-black dark:text-white'>Filtrar por:</h3>
        </div>
        <form className='flex items-center gap-5'>
          <Dropdown action={<div className='p-2 hover:bg-black transition rounded-md text-black hover:text-white dark:text-white'><p className='text-lg mr-2 font-poppinsRegular'>Tipo de paleta</p></div>} actionClassName='border-none bg-transparent p-0' className='border-none'>
          <Dropdown.List className='p-0'>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="diamante" name="tipo"/>
                <Label htmlFor="diamante" className='font-poppinsRegular'>Diamante</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="redonda" name="tipo" />
                <Label htmlFor="redonda" className=' font-poppinsRegular'>Redonda</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2">
                <Radio variant='circle' id="hibrida" name="tipo" />
                <Label htmlFor="hibrida" className='font-poppinsRegular'>Híbrida</Label>
              </fieldset>
          </Dropdown.List>
          </Dropdown>
          <Dropdown action={<div className='p-2 hover:bg-black transition rounded-md text-black hover:text-white dark:text-white'><p className='text-lg mr-2 ml-[10%] font-poppinsRegular'>Marca</p></div>} actionClassName='border-none bg-transparent p-0' className='border-none'>
          <Dropdown.List className='p-0'>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="bullpadel" name="marca" className='' />
                <Label htmlFor="bullpadel" className=' font-poppinsRegular'>BullPadel</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="adidas" name="marca" />
                <Label htmlFor="adidas" className=' font-poppinsRegular'>Adidas</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="nox" name="marca" />
                <Label htmlFor="nox" className='font-poppinsRegular'>Nox</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="softee" name="marca" className='' />
                <Label htmlFor="softee" className=' font-poppinsRegular'>Softee</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="siux" name="marca" />
                <Label htmlFor="siux" className=' font-poppinsRegular'>Siux</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="vibora" name="marca" />
                <Label htmlFor="vibora" className='font-poppinsRegular'>Vibora</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="babolat" name="marca" className='' />
                <Label htmlFor="babolat" className=' font-poppinsRegular'>Babolat</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="head" name="marca" />
                <Label htmlFor="head" className=' font-poppinsRegular'>Head</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="starvie" name="marca" />
                <Label htmlFor="starvie" className='font-poppinsRegular'>Starvie</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="hirostar" name="marca" className='' />
                <Label htmlFor="hirostar" className=' font-poppinsRegular'>Hirostar</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="royal" name="marca" />
                <Label htmlFor="royal" className=' font-poppinsRegular'>Royal</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="snawaert" name="marca" />
                <Label htmlFor="snawaert" className='font-poppinsRegular'>Snawaert</Label>
              </fieldset>
          </Dropdown.List>
          </Dropdown>
        </form>
      </section>
  )
}

export default Filters
