'use client';
import { Navbar, 
  NavbarBrand, 
  NavbarItem, 
  NavbarContent, 
  NavbarMenu, 
  NavbarMenuToggle, 
  NavbarMenuItem, 
  Link, Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu, } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import { getBrands, getSomeBrands, getTypes } from "../../data/storeData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowDown } from "@phosphor-icons/react";
import UserDropdown from "../UserDropdown";
import Cookies from "js-cookie";

const pop = Poppins({ subsets: ["latin"], weight: '500' });

const Nav = () => {

  const [brands, setBrands] = useState([]);
  const [allBrands, setAllBrands] = useState([])
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(''); //Tipo seleccionado para renderizar en pantallas chicas menús desplegables
  const [isMenuOpen, setIsMenuOpen] = useState(false); //Estado reservado para pantallas chicas, controla el menú desplegable.
  const router = useRouter();

  const handleBrandSelect = (brand, type) => {
    const params = new URLSearchParams(window.location.search);

    if (brand) params.set('brand', brand);
    if (type) params.set('type', type);

    router.push(`/products?${params.toString()}`);
  };

  const handleTypeSelect = (type) => setSelectedType(type);

  const fetchBrandsAndTypes = async () => {
    try {
      const data = await getSomeBrands();
      const allData = await getBrands()
      const types = await getTypes();
      setBrands(data.recourse);
      setAllBrands(allData.recourse);
      setTypes(types.recourse );
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };



  useEffect(() => {
    const initializeComponent = async () => {
      await fetchBrandsAndTypes();
  };
    initializeComponent();
  }, []);

  return (
    <section className={`${pop.className} w-full flex flex-row`}>
      <div className="fixed w-full top-7 z-40">
        <Navbar onMenuOpenChange={setIsMenuOpen} className="h-[6rem]">
          <NavbarContent className="justify-between">
            <NavbarBrand justify="start" onClick={()=>window.location.href="/"}>
              <img src="/LogoPadelPoint.png" alt="Logo de PadelPoint" className="h-[9rem] invert-0 dark:invert" />
            </NavbarBrand>
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden text-black"/>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4 z-50" justify="end">
            <NavbarItem>
              <Link href="/" className="text-xl p-2 text-black dark:text-white">Inicio</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/products" className="text-xl p-2 text-black dark:text-white">Productos</Link>
            </NavbarItem>
            <NavbarItem>
              <UserDropdown/>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu className="mt-14">
            <NavbarMenuItem>
              <Button as={Link} href="/" className="bg-transparent w-full text-xl p-2 justify-start text-black dark:text-white" endContent={<ArrowRight size={25}/>}>Inicio</Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button as={Link} href="/products" className="bg-transparent w-full text-xl p-2 justify-start text-black dark:text-white" endContent={<ArrowRight size={25}/>}>Ver Productos</Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Dropdown>
              <DropdownTrigger>
                <Button className="p-2 text-xl" variant="light" radius="sm" endContent={<ArrowDown size={25}/>}>Ver productos de PadelPoint</Button>
              </DropdownTrigger>
              <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {types.map(type => (
                  <DropdownItem key={type.id} onClick={() => handleTypeSelect(type.name)} className="text-black">{type.name}</DropdownItem>
                ))}
              </DropdownMenu>
              </Dropdown>
              {selectedType && (
                <div className={`${selectedType? '':'hidden'}  w-64 p-4`}>
                  <ul className="space-y-2">
                    {allBrands.map((brand) => (
                    <li key={brand.id}>
                      <a className="text-black hover:underline" onClick={() => handleBrandSelect(brand.name, selectedType)}>{brand.name}</a>
                    </li>
                ))}
                 </ul>
              </div>
            )}
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button as={Link} href="/register" className={`p-3 text-xl bg-transparent hover:bg-[#B3B7BF]`}>Unirme a PadelPoint</Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button as={Link} href="/about" className={`p-3 text-xl bg-transparent hover:bg-[#B3B7BF]`}>Sobre Nosotros</Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <UserDropdown/>
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      </div>
      <div className="fixed w-full top-[7.5rem] z-20 hidden min-[640px]:block">
        <Navbar className="flex h-auto bg-gray-400 dark:bg-gray-800 w-auto justify-around items-center">
          <NavbarContent className="gap-10 max-[760px]:gap-1"> 
            <Dropdown>
              <DropdownTrigger>
                <Button className="p-3 text-lg max-[700px]:text-base" variant="light" radius="sm">¡Las mejores marcas!</Button>
              </DropdownTrigger>
              <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {brands.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name)} className="text-black">{brand.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button className="p-3 text-lg max-[700px]:text-base" variant="light" radius="sm">Bolsos</Button>
              </DropdownTrigger>
              <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {allBrands.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name, 'Bolsos')} className="text-black">{brand.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button className="p-3 text-lg max-[700px]:text-base" variant="light" radius="sm">Zapatillas</Button>
              </DropdownTrigger>
              <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {allBrands.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name, 'Zapatillas')} className="text-black">{brand.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button className="p-3 text-lg max-[700px]:text-base" variant="light" radius="sm">Accesorios</Button>
              </DropdownTrigger>
              <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {allBrands.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name,'Accesorios')} className="text-black">{brand.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> 
          </NavbarContent>
        </Navbar>
      </div>
    </section>
  );
}

export default Nav;
