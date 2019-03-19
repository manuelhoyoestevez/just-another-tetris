import React from 'react';

export const Header = (props) => {
  return (
    <header>
      <h2>My {props.title || 'React'} Application</h2>
    </header>
  );
};