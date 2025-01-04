'use client';
import { useCallback, useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import { getTypes, getBrands } from '../data/storeData';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Slider, Divider, Input } from '@nextui-org/react';
import { trackSearch } from '../../utils/pixel';
import { debounce } from '../../utils/debounce';

const pop = Poppins({ subsets: ['latin'], weight: '500' });

export const Filters = ({ filters, onFilterChange }) => {
    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const typesData = await getTypes();
            const brandsData = await getBrands();
            setTypes(typesData.recourse);
            setBrands(brandsData.recourse);
        };
        fetchData();
    }, []);

    const handleNameChange = (event) => {
        const value = event.target.value;
        onFilterChange({ name: value });
        trackSearch(value);
    };

    const handlePriceRangeChange = useCallback(
        debounce((value) => {
            onFilterChange({ minPrice: value[0], maxPrice: value[1] });
        }, 500),
        []
    );

    const handleTypeSelect = (value) => {
        onFilterChange({ type: value });
    };

    const handleBrandSelect = (value) => {
        onFilterChange({ brand: value });
    };

    const clearFilters = () => {
        onFilterChange({
            brand: '',
            name: '',
            minPrice: 1,
            maxPrice: 1000000,
            type: '',
        });
    };

    return (
        <section
            className={`w-full h-24 max-[1464px]:mb-10 bg-white text-black border-1 border-black shadow-sm shadow-slate-700 rounded-lg flex flex-row 
            max-[1000px]:flex-col max-[1000px]:items-center max-[1000px]:h-full gap-10 max-[1100px]:gap-2 items-center justify-center p-2 ${pop.className}`}
        >
            <h3 className="text-bold text-2xl ml-2">Filtrar por:</h3>

            <Dropdown>
                <DropdownTrigger>
                    <Button className="p-6 text-xl bg-default-200 w-1/5 max-[880px]:w-1/3 max-[600px]:w-2/3" variant="light" radius="sm">
                        {filters.type || 'Tipos'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu className="p-0 w-full">
                    {types.map((type) => (
                        <DropdownItem key={type.id} onClick={() => handleTypeSelect(type.name)} className="text-black">
                            {type.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>

            <Divider orientation="vertical" />

            <Dropdown className="w-full">
                <DropdownTrigger>
                    <Button className="p-6 text-xl bg-default-200 w-1/5 max-[880px]:w-1/3 max-[600px]:w-2/3" variant="light" radius="sm">
                        Precios
                    </Button>
                </DropdownTrigger>
                <DropdownMenu className="p-2 rounded-lg">
                    <DropdownItem className="text-black" isReadOnly>
                        <Slider
                        label="$"
                        color="foreground"
                        step={25}
                        minValue={1}
                        maxValue={1000000}
                        value={[
                            filters.minPrice ?? 1,
                            filters.maxPrice ?? 1000000,
                        ]}
                        formatOptions={{ style: 'currency', currency: 'ARS' }}
                        className="max-w-full"
                        onChange={handlePriceRangeChange}
                        />
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Divider orientation="vertical" />

            <Dropdown className="w-full">
                <DropdownTrigger>
                    <Button className="p-6 text-xl max-[1200px]:text-lg bg-default-200 w-1/5 max-[880px]:w-1/3 max-[600px]:w-2/3" variant="light" radius="sm">
                        Modelo
                    </Button>
                </DropdownTrigger>
                <DropdownMenu className="p-2 rounded-lg">
                    <DropdownItem className="text-black" isReadOnly>
                        <Input
                            type="text"
                            labelPlacement="outside"
                            label="Buscar producto por nombre"
                            placeholder="Buscar..."
                            className="w-full mb-1"
                            isClearable
                            value={filters.name}
                            onChange={handleNameChange}/>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <Divider orientation="vertical" />

            <Dropdown className="w-full">
                <DropdownTrigger>
                    <Button className="p-6 text-xl bg-default-200 w-1/5 max-[880px]:w-1/3 max-[600px]:w-2/3" variant="light" radius="sm">
                        {filters.brand || 'Marcas'}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu className="p-2 rounded-lg">
                    {brands.map((brand) => (
                        <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name)} className="text-black">
                            {brand.name}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
            <Divider orientation="vertical" />
            <div className="flex flex-row items-center justify-center w-1/4 gap-4 max-[910px]:w-1/2 max-[500px]:w-full max-[310px]:gap-1">
                <Button onClick={clearFilters} className="bg-red-500 text-white text-lg max-[1000px]:text-sm w-full p-6 rounded-lg">
                    Borrar filtros
                </Button>
            </div>
        </section>
    );
};

export default Filters;
