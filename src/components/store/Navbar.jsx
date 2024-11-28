'use client';
import { Navbar, 
  NavbarBrand, 
  NavbarItem, 
  NavbarContent, 
  NavbarMenu, 
  NavbarMenuToggle, 
  NavbarMenuItem, 
  Link, Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import { userLogout, checkUserState, searchUserAuthenticated } from "../../data/loginData";
import { getSomeBrands, getTypes } from "../../data/storeData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, SignOut, SignIn, UserCircle, TerminalWindow, ArrowRight, ArrowDown } from "@phosphor-icons/react";

const pop = Poppins({ subsets: ["latin"], weight: '500' });

const Nav = () => {
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(''); //Tipo seleccionado para renderizar en pantallas chicas menús desplegables
  const [isMenuOpen, setIsMenuOpen] = useState(false); //Estado reservado para pantallas chicas, controla el menú desplegable.
  const [isLogged, setIsLogged] = useState(false); //Estado que nos permitirá conocer si hay un usuario loggeado o no.
  const [isAdmin, setIsAdmin] = useState(false); //Bandera para chequear si un usuario tiene beneficios de administrador
  const [username, setUsername] = useState(''); //Estado que almacena el username para renderizar el nombre
  const router = useRouter();

  const handleBrandSelect = (brand) => {
    localStorage.setItem('selectedBrand', brand);
    router.push('/products');
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    // localStorage.setItem('type', type);
    // router.push('/products');
  };

  const fetchBrandsAndTypes = async () => {
    try {
      const data = await getSomeBrands();
      const types = await getTypes();
      setBrands(data.recourse);
      setTypes(types.recourse );
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleLogout = async() =>{
    await userLogout();
    window.location.reload();
} 
  const getStatus = async() =>{
    try{
      const status = await checkUserState();
      setIsLogged(status.isLogged || (status.isLogged === false && status.refreshTokenExists === true));
      
    }catch(err){
      console.error('Error checking user status:',err)
    }
}

  const checkIfAdmin = async () => {
    try {
      const data = await searchUserAuthenticated();
      if (data.user && data.user.roles && data.user.roles.some(role => role.name === 'admin')) {
        setIsAdmin(true);
      }
    } catch (err) {
      console.error(err);
    }
};

  useEffect(() => {
    const initializeComponent = async () => {
    setUsername(localStorage.getItem('username'));
    await getStatus();
    await checkIfAdmin();
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
                  {isLogged ? 
                   <Dropdown>
                   <DropdownTrigger className="bg-red-600 shadow-md shadow-black p-4 w-full text-white">
                      <Button className="ml-4 p-2 text-lg" variant="flat" radius="lg">{username}</Button>
                   </DropdownTrigger>
                   <DropdownMenu className="p-0 w-full gap-4">
                   <DropdownItem startContent={<UserCircle size={30}/>} href="/profile" className="w-full text-black">
                      <h1 className="text-lg font-bold">Mi perfil</h1>
                    </DropdownItem>
                    <DropdownItem startContent={<ShoppingCart size={30}/>} href="/cart" className="w-full text-black">
                      <h1 className="text-lg font-bold">Carrito</h1>
                    </DropdownItem>
                    {isAdmin && (<DropdownItem startContent={<TerminalWindow size={30}/>} href="/dashboard" className="w-full text-black">
                        <h1 className="text-lg font-bold">Dashboard</h1>
                     </DropdownItem>)
                     
                   }
                    <DropdownItem className="w-full text-black" onClick={handleLogout} startContent={<SignOut size={30}/>}>
                      <h1 className="font-bold text-lg">Logout</h1>
                    </DropdownItem>
                   </DropdownMenu>
                 </Dropdown>
                  :
                    <Button
                      as={Link}
                      href='/login'
                      color="default"
                      variant="flat"
                      endContent={<SignIn size={25}/>}
                      className='m-4 text-lg w-full bg-red-600 text-white shadow shadow-gray-500 hover:bg-red-400 transition-colors p-4 rounded-lg'>
                      Iniciar sesión
                    </Button>
                }
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu className="mt-8">
            <NavbarMenuItem>
              <Button as={Link} href="/" className="bg-transparent w-full text-xl p-2 justify-start text-black dark:text-white" endContent={<ArrowRight size={30}/>}>Inicio</Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button as={Link} href="/products" className="bg-transparent w-full text-xl p-2 justify-start text-black dark:text-white" endContent={<ArrowRight size={30}/>}>Ver Productos</Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Dropdown>
              <DropdownTrigger>
                <Button className="p-2 text-xl" variant="light" radius="sm" endContent={<ArrowDown size={30}/>}>Ver productos de PadelPoint</Button>
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
                    {brands.map((brand) => (
                    <li key={brand.id}>
                      <a className="text-black hover:underline" onClick={() => handleBrandSelect(brand.name)}>{brand.name}</a>
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
            {isLogged ? 
                   <Dropdown>
                   <DropdownTrigger className="bg-red-600 p-4 w-full text-white">
                      <Button className="ml-4 p-2 text-lg" variant="flat" radius="lg">{username}</Button>
                   </DropdownTrigger>
                   <DropdownMenu className="p-0 w-full gap-4">
                   <DropdownItem startContent={<UserCircle size={30}/>} href="/profile" className="w-full text-black">
                      <h1 className="text-lg font-bold">Mi perfil</h1>
                    </DropdownItem>
                    <DropdownItem startContent={<ShoppingCart size={30}/>} href="/cart" className="w-full text-black">
                      <h1 className="text-lg font-bold">Carrito</h1>
                    </DropdownItem>
                    {isAdmin && (<DropdownItem startContent={<TerminalWindow size={30}/>} href="/dashboard" className="w-full text-black">
                        <h1 className="text-lg font-bold">Dashboard</h1>
                     </DropdownItem>)
                     
                   }
                    <DropdownItem className="w-full text-black" onClick={handleLogout} startContent={<SignOut size={30}/>}>
                      <h1 className="font-bold text-lg">Logout</h1>
                    </DropdownItem>
                   </DropdownMenu>
                 </Dropdown>
                  :
                    <Button
                      as={Link}
                      href='/login'
                      color="default"
                      variant="flat"
                      endContent={<SignIn size={25}/>}
                      className='m-4 text-lg w-full bg-red-600 text-white hover:bg-red-400 transition-colors p-4 rounded-lg'>
                      Iniciar sesión
                    </Button>
                }
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
                {brands.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name)} className="text-black">{brand.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button className="p-3 text-lg max-[700px]:text-base" variant="light" radius="sm">Zapatillas</Button>
              </DropdownTrigger>
              <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {brands.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name)} className="text-black">{brand.name}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button className="p-3 text-lg max-[700px]:text-base" variant="light" radius="sm">Accesorios</Button>
              </DropdownTrigger>
              <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {brands.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name)} className="text-black">{brand.name}</DropdownItem>
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
