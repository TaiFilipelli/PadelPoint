import React, { useEffect, useState } from 'react';
import { Dropdown, Radio, Label, Slider, Button } from 'keep-react';

const Filters = ({ onFilter }) => {
    const [selectedTipo, setSelectedTipo] = useState('');
    const [selectedMarca, setSelectedMarca] = useState('');
    const [value, setValue] = useState([100, 500]);

    useEffect(() => {
        const savedMarca = localStorage.getItem('selectedMarca');

        if (savedMarca) setSelectedMarca(savedMarca);
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedMarca', selectedMarca);
    }, [selectedMarca]);

    const handleMarcaChange = (e) => {
        setSelectedMarca(e.target.id);
    };

    const handleDeleteFilters = () => {
        localStorage.removeItem('selectedMarca');
        setSelectedMarca('');
        setValue([100, 500]);
        onFilter({ marca: '', precio: [100, 500] });
    };

    const handleFilterClick = () => {
        onFilter({marca: selectedMarca, precio: value });
    };

    return (
        <section className='text-white bg-transparent p-4 rounded-lg flex flex-wrap justify-start items-center ml-[15%] mr-[15%] mt-10'>
            <div>
                <h3 className='text-xl ml-5 font-poppinsBold mr-8 text-black dark:text-white'>Filtrar por:</h3>
            </div>
            <form className='flex items-center gap-5 z-10'>
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
                <Radio variant='circle' id="siux" name="marca" checked={selectedMarca === 'siux'} onChange={handleMarcaChange} />
                <Label htmlFor="siux" className=' font-poppinsRegular'>Siux</Label>
              </fieldset>
              <fieldset className="flex items-center gap-2 mb-2">
                <Radio variant='circle' id="babolat" name="marca" checked={selectedMarca === 'babolat'} onChange={handleMarcaChange} />
                <Label htmlFor="babolat" className=' font-poppinsRegular'>Babolat</Label>
              </fieldset>
                    </Dropdown.List>
                </Dropdown>
                <Dropdown action={<div className='p-2 hover:bg-black transition rounded-md text-black hover:text-white dark:text-white'><p className='text-lg mr-2 ml-[10%] font-poppinsRegular'>Precio</p></div>} actionClassName='border-none bg-transparent p-0' className='border-none'>
                    <Dropdown.List className='p-0 flex items-center justify-center'>
                        <fieldset className="flex items-center gap-2 mb-2">
                            <Slider
                                min={100}
                                max={500}
                                defaultValue={[100,500]}
                                tooltip='top'
                                range={true}
                                onChange={(value)=>setValue(value)}
                                className=''>
                                {Array.isArray(value) && (
                                    <Slider.Box className=''>
                                        <Button size='sm' color='secondary' className='pt-2 pl-3 pr-3'>{value[0]? value[0] : 100}</Button>
                                        <Button size='sm' color='secondary' className='pt-2 pl-3 pr-3'>{value[1]? value[1] : 500}</Button>
                                    </Slider.Box>
                                )}
                            </Slider>
                        </fieldset>
                    </Dropdown.List>
                </Dropdown>
                <button type='button' className='font-poppinsBold text-xl ml-5 hover:underline transition text-black dark:text-white' onClick={handleFilterClick}>FILTRAR</button>
            </form>
            <button className=' ml-16 text-red-500 font-poppinsBold hover:underline' onClick={handleDeleteFilters}>Borrar filtros</button>
        </section>
    );
};

export default Filters;
