'use client';
import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import { getTypes, getBrands } from '../data/storeData';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Slider, Divider, Input } from '@nextui-org/react';
import {trackSearch} from '../../utils/pixel';

const pop = Poppins({subsets:['latin'], weight:'500'})

export const Filters = () => {
    const [searchedName, setSearchedName] = useState('');
    const [priceRange, setPriceRange] = useState([0,1000000]);
    const [types, setTypes] = useState([])
    const [brands, setBrands] = useState([])
    const [selectedType, setSelectedType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');

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
        localStorage.setItem('selectedBrand',selectedBrand);
        window.location.reload();
    }
    const fetchData = async() =>{
        const typesP = await getTypes();
        const brandsP = await getBrands();
        setBrands(brandsP.recourse);
        setTypes(typesP.recourse);
    }
    const handleNameChange = (event) => {
        setSearchedName(event.target.value);
        trackSearch(event.target.value);
    }
    const handleValueRangeChange = (value) => {
        setPriceRange(value);
    }
    const handleTypeSelect = (value) => {
        setSelectedType(value);
    }
    const handleBrandSelect = (value) => {
        setSelectedBrand(value);
    }

    useEffect(()=>{
        fetchData();
    }, []);

  return (
    <section className={`w-full h-24 max-[1464px]: mb-10 bg-white text-black border-1 border-black shadow-sm shadow-slate-700 rounded-lg flex flex-row 
    max-[1000px]:flex-col max-[1000px]:items-center max-[1000px]:h-full gap-10 max-[1100px]:gap-2 items-center justify-center p-2 ${pop.className}`}>
      <h3 className='text-bold text-2xl ml-2'>Filtrar por:</h3>
      <Dropdown>
            <DropdownTrigger>
                <Button className="p-6 text-xl bg-default-200 w-1/5 max-[880px]:w-1/3 max-[600px]:w-2/3" variant="light" radius="sm"> {selectedType? selectedType : 'Tipos'}</Button> 
            </DropdownTrigger>
            <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {types.map(type => (
                  <DropdownItem key={type.id} onClick={() => handleTypeSelect(type.name)} className='text-black'>{type.name}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
        <Divider orientation='vertical'/>
        <Dropdown className='w-full'>
            <DropdownTrigger>
                <Button className="p-6 text-xl bg-default-200 w-1/5 max-[880px]:w-1/3 max-[600px]:w-2/3" variant="light" radius="sm">Precios</Button>
            </DropdownTrigger>
            <DropdownMenu className="p-2 rounded-lg" >
               <DropdownItem className='text-black' isReadOnly>
                <Slider
                    label='ARS'
                    color='foreground'
                    step={25} 
                    minValue={0} 
                    maxValue={500000} 
                    defaultValue={[0,500000]} 
                    formatOptions={{style: "currency", currency: "ARS"}}
                    className="max-w-full"
                    onChange={handleValueRangeChange}
                />
               </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Divider orientation='vertical'/>
        <Dropdown className='w-full'>
            <DropdownTrigger>
                <Button className="p-6 text-xl max-[1200px]:text-lg bg-default-200 w-1/5 max-[880px]:w-1/3 max-[600px]:w-2/3" variant="light" radius="sm">Modelo</Button>
            </DropdownTrigger>
            <DropdownMenu className="p-2 rounded-lg">
               <DropdownItem className='text-black' isReadOnly>
                <Input type='text' labelPlacement='outside' label='Buscar producto por nombre' 
                    placeholder='Buscar...' className='w-full mb-1' isClearable value={searchedName} onChange={handleNameChange}/>
               </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <Divider orientation='vertical'/>
        <Dropdown className='w-full'>
            <DropdownTrigger>
                <Button className="p-6 text-xl bg-default-200 w-1/5 max-[880px]:w-1/3 max-[600px]:w-2/3" variant="light" radius="sm">Marcas</Button>
            </DropdownTrigger>
            <DropdownMenu className="p-2 rounded-lg" >
            {brands.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name)} className='text-black'>{brand.name}</DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
        <Divider orientation='vertical'/>
        <div className='flex flex-row items-center justify-center w-1/4 gap-4 max-[910px]:w-1/2 max-[500px]:w-full max-[310px]:gap-1'>
        <Button onClick={applyFilters} 
            className='bg-black text-white text-medium max-[1000px]:text-sm w-1/2 rounded-lg'>Aplicar filtros</Button>
        <Button onClick={deleteFilters} 
            className="bg-red-500 text-white text-medium max-[1000px]:text-sm w-1/2 rounded-lg">Borrar filtros</Button>
        </div>
    </section>
  )
}

export default Filters
