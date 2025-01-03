'use client';

import { useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { UserCircle, ShoppingCart, TerminalWindow, SignOut, SignIn } from '@phosphor-icons/react';
import Cookies from 'js-cookie';

const UserDropdown = ({ onLogout }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const username = localStorage.getItem('username');
  const tokenLog = Cookies.get('isLogged');
  const tokenAd = Cookies.get('isAdmin');

  if(tokenLog && tokenLog === 'true'){
    setIsLogged(true);
  }

  if(tokenAd && tokenAd === 'true'){
    setIsAdmin(true);
  }

  return (
    <div>
      {isLogged ? (
        <Dropdown>
          <DropdownTrigger className="bg-blue-600 hover:bg-blue-400 shadow-md shadow-black p-4 w-full text-white">
            <Button className="ml-4 p-2 text-lg" variant="flat" radius="lg">
              {username}
            </Button>
          </DropdownTrigger>
          <DropdownMenu className="p-0 w-full gap-4">
            <DropdownItem startContent={<UserCircle size={30} />} href="/profile" className="w-full text-black">
              <h1 className="text-lg font-bold">Mi perfil</h1>
            </DropdownItem>
            <DropdownItem startContent={<ShoppingCart size={30} />} href="/cart" className="w-full text-black">
              <h1 className="text-lg font-bold">Carrito</h1>
            </DropdownItem>
            {isAdmin && (
              <DropdownItem startContent={<TerminalWindow size={30} />} href='/dashboard' className="w-full text-black">
                <h1 className="text-lg font-bold">Dashboard</h1>
              </DropdownItem>
            )}
            <DropdownItem className="w-full text-black" onClick={onLogout} startContent={<SignOut size={30} />}>
              <h1 className="font-bold text-lg">Logout</h1>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <Button
          as={Link}
          href="/login"
          color="default"
          variant="flat"
          endContent={<SignIn size={25} />}
          className="m-4 text-lg w-full bg-blue-600 text-white shadow shadow-gray-500 hover:bg-blue-400 transition-colors p-4 rounded-lg"
        >
          Iniciar sesión
        </Button>
      )}
    </div>
  );
};

export default UserDropdown;
