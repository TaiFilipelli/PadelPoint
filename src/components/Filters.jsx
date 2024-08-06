'use client';
import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Slider, Divider } from '@nextui-org/react';

const pop = Poppins({subsets:['latin'], weight:'500'})

export const Filters = () => {

    const deleteFilters = () =>{
        localStorage.removeItem('selectedBrand');
        window.location.reload();
    }
  return (
    <section className={`w-full h-20 mb-10 border-1 border-black shadow-md shadow-slate-700 rounded-lg flex flex-row gap-10 items-center justify-between p-2 ${pop.className}`}>
      <h3 className='text-bold text-2xl ml-2'>Filtrar por:</h3>
      <Divider orientation='vertical'/>
      {/* <Dropdown>
            <DropdownTrigger>
                <Button className="ml-4 p-2 text-lg" variant="light" radius="sm">Marca</Button>
            </DropdownTrigger>
            <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {brands.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name)}>{brand.name}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown> */}
        <Slider 
            label="Rango de precio"
            color='foreground'
            step={25} 
            minValue={0} 
            maxValue={400} 
            defaultValue={[100, 200]} 
            formatOptions={{style: "currency", currency: "USD"}}
            className="max-w-md"
        />
        <Divider orientation='vertical'/>
        <div>
            <Button className='rounded-lg bg-black text-white mr-6'>Aplicar filtros</Button>
            <Button onClick={deleteFilters} className="bg-red-500 text-white p-4 my-5 w-32 h-11">Borrar filtros</Button>
        </div>
    </section>
  )
}

export default Filters
