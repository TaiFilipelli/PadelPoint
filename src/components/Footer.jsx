import React from 'react'
import { InstagramLogo, WhatsappLogo } from 'phosphor-react';

const Footer = () => {
    const members = [
        { name: 'Filipelli Taiel', role: 'FrontEnd', github: 'https://github.com/TaiFilipelli' },
        { name: 'Fernandez Lautaro', role: 'BackEnd', github: 'https://github.com/Lautaro24Fer' },
        { name: 'Merlo Ignacio', role: 'DataBase & PadelPoint Owner', github: 'https://github.com/maria-lopez' },
        { name: 'Gramet Maximiliano', role: 'BackEnd', github: 'https://github.com/Lautaro24Fer' }
      ];
  return (
    <section className='absolute bottom-0 font-poppinsRegular flex flex-row items-center text-center p-4 w-full opacity-50 justify-between z-0'>
        <p className='mr-1'>Contactanos:</p><a href="https://www.instagram.com/_padelpoint?igsh=dmI0aTNxcjhtb3lz&utm_source=qr"><InstagramLogo size={45} className='mr-2'/></a>
        <WhatsappLogo size={45}/><p>3364 00-3555</p>
        <div className='flex max-w-4xl mx-auto text-base hover:opacity-100'>
          <p className='mr-2'>Colaboradores del proyecto:</p>
         {members.map((member, index) => (
          <p key={index}>
            {member.name} ({member.role})  <a href={member.github} target='_blank' rel='noopener noreferrer'>GitHub</a>
          </p>
        ))}
        </div>
    </section>
  );
};

export default Footer;