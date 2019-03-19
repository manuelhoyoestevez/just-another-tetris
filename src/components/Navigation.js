import React from 'react';

export const Navigation = (props) => {
  const { items } = props;
  return (
    <nav>
      <ul>
        { items.map((item, index) => 
          (<li key={index}>
            <a target="_blank" href={item.href}>{item.label}</a>
          </li>)) 
        }
      </ul>
    </nav>
  );
};