'use client';
import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import { getTypes } from 'src/data/data';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Slider, Divider, Input } from '@nextui-org/react';

const pop = Poppins({subsets:['latin'], weight:'500'})

export const Filters = () => {
    const [searchedName, setSearchedName] = useState('');
    const [priceRange, setPriceRange] = useState([0,400]);
    const [types, setTypes] = useState([])
    const [selectedType, setSelectedType] = useState('');

    const deleteFilters = () =>{
        localStorage.removeItem('selectedBrand');
        localStorage.removeItem('name');
        localStorage.removeItem('minPrice');
        localStorage.removeItem('maxPrice');
        localStorage.removeItem('type');
        window.location.reload();
    }
    const applyFilters = () =>{
        localStorage.setItem('name',searchedName);
        localStorage.setItem('minPrice', priceRange[0]);
        localStorage.setItem('maxPrice', priceRange[1]);
        localStorage.setItem('type',selectedType);
        window.location.reload();
    }
    const fetchTypes = async() =>{
        const data = await getTypes();
        setTypes(data);
    }
    const handleNameChange = (event) => {
        setSearchedName(event.target.value);
    }
    const handleValueRangeChange = (value) => {
        setPriceRange(value);
    }
    const handleTypeSelect = (value) => {
        setSelectedType(value);
    }

    useEffect(()=>{
        fetchTypes();
    }, []);

  return (
    <section className={`w-full h-20 mb-10 border-1 border-black shadow-sm shadow-slate-700 rounded-lg flex flex-row gap-10 items-center justify-center p-2 ${pop.className}`}>
      <h3 className='text-bold text-2xl ml-2'>Filtrar por:</h3>
      <Dropdown>
            <DropdownTrigger>
                <Button className="ml-4 p-6 text-xl bg-default-200" variant="light" radius="sm">Tipos</Button>
            </DropdownTrigger>
            <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {types.map(type => (
                  <DropdownItem key={type.id} onClick={() => handleTypeSelect(type.name)}>{type.name}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
        <Divider orientation='vertical'/>
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
        <Input type='text' labelPlacement='outside' label='Buscar producto por nombre' placeholder='Buscar...' className='w-1/6 mb-1' isClearable value={searchedName} onChange={handleNameChange}/>
        <Divider orientation='vertical'/>
        <Button onClick={applyFilters} className='rounded-lg bg-black text-white mr-4'>Aplicar filtros</Button>
        <Button onClick={deleteFilters} className="bg-red-500 text-white rounded-lg">Borrar filtros</Button>
    </section>
  )
}

export default Filters
