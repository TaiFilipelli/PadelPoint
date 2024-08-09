'use client';
import { Navbar, NavbarBrand, NavbarItem, NavbarContent, NavbarMenu, NavbarMenuToggle, NavbarMenuItem, Link, Button, Dropdown, DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import { getBrands, userLogout } from "src/data/data";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const pop = Poppins({ subsets: ["latin"], weight: '500' });

const Nav = () => {
  const [brands, setBrands] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false); //Estado que nos permitirá conocer si hay un usuario loggeado o no.
  const router = useRouter();

  const handleBrandSelect = (brand) => {
    localStorage.setItem('selectedBrand', brand);
    router.push('/products');
  };
  const fetchBrands = async () => {
    try {
      const data = await getBrands();
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleLogout = async() =>{
    const result = await userLogout();
    localStorage.removeItem('isLogged');
    window.location.reload();
}

  useEffect(() => {
    const log = localStorage.getItem('isLogged')
    if(log=='true') setIsLogged(true);
    fetchBrands();
  }, []);

  return (
    <section className={`${pop.className} w-full flex flex-row`}>
      <div className="fixed w-full top-0 z-50">
        <Navbar onMenuOpenChange={setIsMenuOpen} className="h-[6rem]">
          <NavbarContent className="justify-between">
            <NavbarBrand justify="start">
              <img src="/LogoPadelPoint.png" alt="Logo de PadelPoint" className="h-[9rem] invert-0 dark:invert" />
            </NavbarBrand>
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden"/>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4 z-50" justify="end">
            <NavbarItem>
              <Link href="/" className="text-xl p-2 text-black dark:text-white">Inicio</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/products" className="text-xl p-2 text-black dark:text-white">Productos</Link>
            </NavbarItem>
            <NavbarItem>
              {/* La idea principal es que este item de la navbar cambie depende si el usuario está loggeado o no. En caso esté loggeado,
                  se renderizará un Dropdown/Modal que tenga una opción para cerrar sesión mediante un método que vendrá desde la API para 
                  'matar' la cookie. En caso no esté loggeado, este botón quedará como está. */}
                  {isLogged ? 
                    <Button className="bg-red-600 m-10 text-white" onClick={handleLogout}>Logout</Button>
                  :
                    <Button
                      as={Link}
                      href='/login'
                      color="default"
                      variant="flat"
                      className='mr-6 text-md bg-red-600 text-white hover:bg-red-400 transition-colors p-4 rounded-lg'>
                      Iniciar sesión
                    </Button>
                }
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu className="mt-10">
            <NavbarMenuItem>
              <Link href="/" className="w-full text-xl p-2 text-black dark:text-white">Inicio</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href="/products" className="w-full text-xl p-2 text-black dark:text-white">Productos</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link href="/login" className="w-full text-xl p-2 text-black dark:text-white">Iniciar sesión</Link>
            </NavbarMenuItem>
          </NavbarMenu>
        </Navbar>
      </div>
      <div className="fixed w-full top-24 z-20">
        <Navbar className="flex text-center h-14 bg-gray-400 dark:bg-gray-800 w-full justify-center">
          <NavbarContent className="gap-10">
            <Dropdown>
              <DropdownTrigger>
                <Button className="ml-4 p-2 text-lg" variant="light" radius="sm">Las mejores marcas!</Button>
              </DropdownTrigger>
              <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                {brands.map(brand => (
                  <DropdownItem key={brand.id} onClick={() => handleBrandSelect(brand.name)}>{brand.name}</DropdownItem>
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
