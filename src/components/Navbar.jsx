'use client';
import { Navbar, NavbarBrand, NavbarItem, NavbarContent, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem, Link, Button } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import { User } from "@phosphor-icons/react";

const pop = Poppins({ subsets: ["latin"], weight: '500' });

const Nav = () => {
  return (
    <section className={`${pop.className} w-full flex flex-col`}>
        <div className="fixed w-full top-0 z-50">
          <Navbar className="flex text-center h-24 bg-white dark:bg-black w-full">
            <NavbarBrand justify="start">
              <img src="/LogoPadelPoint.png" alt="Logo de PadelPoint" className="h-[11rem] invert-0 dark:invert" />
            </NavbarBrand>
            <NavbarContent className="flex gap-7" justify="end">
              <NavbarItem>
                <Link href="/" className="text-xl p-2 text-black dark:text-white">Inicio</Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/products" className="text-xl p-2 text-black dark:text-white">Productos</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} href='/login' color="default" variant="flat" className='mr-6 font-semibold text-lg bg-red-600 text-white hover:bg-red-400 transition-colors p-2 rounded-lg'>
                  <User size={30} />
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
        <div className="fixed w-full top-24 z-40">
          <Navbar className="flex text-center h-14 bg-gray-400 dark:bg-gray-800 w-full justify-center">
            <NavbarContent className="gap-10">
              <Dropdown>
                <DropdownTrigger>
                  <Button className="ml-4 p-2 text-lg" disableAnimation disableRipple variant="light" radius="sm">Las mejores marcas!</Button>
                </DropdownTrigger>
                <DropdownMenu className="p-0 w-full" itemClasses={{ base: "gap-4" }}>
                  <DropdownItem key="adidas" href="/products">Adidas</DropdownItem>
                  <DropdownItem key="nike" href="/products">Nike</DropdownItem>
                  <DropdownItem key="head" href="/products">Head</DropdownItem>
                  <DropdownItem key="babolat" href="/products">Babolat</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </Navbar>
        </div>
    </section>
  );
}

export default Nav;
