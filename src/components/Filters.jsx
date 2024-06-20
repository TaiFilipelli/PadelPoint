import React, { useEffect, useState } from 'react'
import { Dropdown, Radio, Label} from 'keep-react'
const Filters = () => {
    const [selectedTipo, setSelectedTipo] = useState('');
    const [selectedMarca, setSelectedMarca] = useState('');

    useEffect(()=>{
        const savedTipo = localStorage.getItem('selectedTipo');
        const savedMarca = localStorage.getItem('selectedMarca');

        if(savedTipo) setSelectedTipo(savedTipo);
        if(savedMarca) setSelectedMarca(savedMarca);
    },[]);
    useEffect(() => {
        localStorage.setItem('selectedTipo', selectedTipo);
      }, [selectedTipo]);

    useEffect(()=>{
        localStorage.setItem('selectedMarca',selectedMarca);
    },[selectedMarca]);

    const handleTipoChange = (e) =>{
        setSelectedTipo(e.target.id);
    };
    const handleMarcaChange = (e) =>{
        setSelectedMarca(e.target.id);
    };
  return (
    <section className='text-white bg-transparent p-4 rounded-lg flex flex-wrap justify-start items-center ml-[20%] mr-[20%] mt-10'>
        <div>
          <h3 className='text-xl mb-1 ml-5 font-poppinsBold mr-8 text-black dark:text-white'>Filtrar por:</h3>
        </div>
        <form className='flex items-center gap-5'>
          <Dropdown action={<div className='p-2 hover:bg-black transition rounded-md text-black hover:text-white dark:text-white'><p className='text-lg mr-2 font-poppinsRegular'>Tipo de paleta</p></div>} actionClassName='border-none bg-transparent p-0' className='border-none'>
          <Dropdown.List className='p-0'>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="diamante" name="tipo" checked={selectedTipo === 'diamante'} onChange={handleTipoChange}/>
                <Label htmlFor="diamante" className='font-poppinsRegular'>Diamante</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="redonda" name="tipo" checked={selectedTipo === 'redonda'} onChange={handleTipoChange}/>
                <Label htmlFor="redonda" className=' font-poppinsRegular'>Redonda</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2">
                <Radio variant='circle' id="hibrida" name="tipo"checked={selectedTipo === 'hibrida'} onChange={handleTipoChange} />
                <Label htmlFor="hibrida" className='font-poppinsRegular'>Híbrida</Label>
              </fieldset>
          </Dropdown.List>
          </Dropdown>
          <Dropdown action={<div className='p-2 hover:bg-black transition rounded-md text-black hover:text-white dark:text-white'><p className='text-lg mr-2 ml-[10%] font-poppinsRegular'>Marca</p></div>} actionClassName='border-none bg-transparent p-0' className='border-none'>
          <Dropdown.List className='p-0'>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="bullpadel" name="marca" checked={selectedMarca === 'bullpadel'} onChange={handleMarcaChange} />
                <Label htmlFor="bullpadel" className=' font-poppinsRegular'>BullPadel</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="adidas" name="marca" checked={selectedMarca === 'adidas'} onChange={handleMarcaChange} />
                <Label htmlFor="adidas" className=' font-poppinsRegular'>Adidas</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="nox" name="marca" checked={selectedMarca === 'nox'} onChange={handleMarcaChange} />
                <Label htmlFor="nox" className='font-poppinsRegular'>Nox</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="softee" name="marca" checked={selectedMarca === 'softee'} onChange={handleMarcaChange}  />
                <Label htmlFor="softee" className=' font-poppinsRegular'>Softee</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="siux" name="marca" checked={selectedMarca === 'siux'} onChange={handleMarcaChange} />
                <Label htmlFor="siux" className=' font-poppinsRegular'>Siux</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="vibora" name="marca" checked={selectedMarca === 'vibora'} onChange={handleMarcaChange} />
                <Label htmlFor="vibora" className='font-poppinsRegular'>Vibora</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="babolat" name="marca" checked={selectedMarca === 'babolat'} onChange={handleMarcaChange} />
                <Label htmlFor="babolat" className=' font-poppinsRegular'>Babolat</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="head" name="marca" checked={selectedMarca === 'head'} onChange={handleMarcaChange} />
                <Label htmlFor="head" className=' font-poppinsRegular'>Head</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="starvie" name="marca" checked={selectedMarca === 'starvie'} onChange={handleMarcaChange}  />
                <Label htmlFor="starvie" className='font-poppinsRegular'>Starvie</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="hirostar" name="marca" checked={selectedMarca === 'hirostar'} onChange={handleMarcaChange} />
                <Label htmlFor="hirostar" className=' font-poppinsRegular'>Hirostar</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="royal" name="marca" checked={selectedMarca === 'royal'} onChange={handleMarcaChange} />
                <Label htmlFor="royal" className=' font-poppinsRegular'>Royal</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="snawaert" name="marca" checked={selectedMarca === 'snawaert'} onChange={handleMarcaChange} />
                <Label htmlFor="snawaert" className='font-poppinsRegular'>Snawaert</Label>
              </fieldset>
          </Dropdown.List>
          </Dropdown>
        </form>
      </section>
  )
}

export default Filters
