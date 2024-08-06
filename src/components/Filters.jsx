'use client';
import { useState, useEffect } from 'react';
import { Poppins } from 'next/font/google'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Slider, Divider, Input } from '@nextui-org/react';

const pop = Poppins({subsets:['latin'], weight:'500'})

export const Filters = () => {
    const [searchedName, setSearchedName] = useState('');
    const [priceRange, setPriceRange] = useState([0,400])

    const deleteFilters = () =>{
        localStorage.removeItem('selectedBrand');
        localStorage.removeItem('name');
        window.location.reload();
    }
    const applyFilters = () =>{
        localStorage.setItem('name',searchedName);
        localStorage.setItem('minPrice', priceRange[0]);
        localStorage.setItem('maxPrice', priceRange[1]);
        window.location.reload();
    }
    const handleInputChange = (event) => {
        setSearchedName(event.target.value);
    }
    const handleValueRangeChange = (value) => {
        setPriceRange(value);
    }

  return (
    <section className={`w-full h-20 mb-10 border-1 border-black shadow-sm shadow-slate-700 rounded-lg flex flex-row gap-10 items-center justify-center p-2 ${pop.className}`}>
      <h3 className='text-bold text-2xl ml-2'>Filtrar por:</h3>
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
            defaultValue={[0,100]} 
            formatOptions={{style: "currency", currency: "USD"}}
            className="max-w-md"
            onChange={handleValueRangeChange}
        />
        <Divider orientation='vertical'/>
        <Input type='text' labelPlacement='outside' label='Buscar producto por nombre' placeholder='Buscar...' className='w-1/6 mb-1' isClearable value={searchedName} onChange={handleInputChange}/>
        <Divider orientation='vertical'/>
        <Button onClick={applyFilters} className='rounded-lg bg-black text-white mr-4'>Aplicar filtros</Button>
        <Button onClick={deleteFilters} className="bg-red-500 text-white rounded-lg">Borrar filtros</Button>
    </section>
  )
}

export default Filters
