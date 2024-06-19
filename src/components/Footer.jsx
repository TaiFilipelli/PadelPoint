import React from 'react'
import { GithubLogo } from 'phosphor-react';

const Footer = () => {
    const members = [
        { name: 'Filipelli Taiel', role: 'Front', github: 'https://github.com/TaiFilipelli' },
        { name: 'Martinez Lautaro', role: 'Back', github: 'https://github.com/juan-perez' },
        { name: 'Gramet Maximiliano', role: 'Back', github: 'https://github.com/maria-lopez' },
        { name: 'Merlo Ignacio', role: 'DataBase', github: 'https://github.com/maria-lopez' },
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