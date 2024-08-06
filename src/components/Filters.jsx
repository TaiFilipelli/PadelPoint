'use client';
import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Slider } from '@nextui-org/react';

const pop = Poppins({subsets:['latin'], weight:'500'})

export const Filters = () => {
  return (
    <section className={`w-full h-20 mb-10 border-1 border-black shadow-md shadow-slate-700 rounded-lg flex flex-row gap-10 items-center ${pop.className}`}>
      <h3 className='text-bold text-2xl ml-4'>Filtrar por:</h3>
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
        <Button className='rounded-lg bg-black text-white'>Aplicar filtros</Button>
    </section>
  )
}

export default Filters
