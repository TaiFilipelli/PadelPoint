import React from 'react'
import { GithubLogo } from 'phosphor-react';

const Footer = () => {
    const members = [
        { name: 'Filipelli Taiel', role: 'FrontEnd', github: 'https://github.com/TaiFilipelli' },
        { name: 'Fernandez Lautaro', role: 'BackEnd', github: 'https://github.com/juan-perez' },
        { name: 'Merlo Ignacio', role: 'DataBase & PadelPoint Owner', github: 'https://github.com/maria-lopez' },
      ];
  return (
    <section className='absolute bottom-0 font-poppinsRegular flex flex-row items-center text-center p-4 w-full opacity-50'>
        <div className='flex max-w-4xl mx-auto text-base hover:opacity-100'>
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