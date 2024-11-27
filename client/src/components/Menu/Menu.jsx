import React, { useState } from 'react';
import './Menu.scss';

const Menu = ({ children, title, open, setOpen }) => {
  return (
    <div className={`menu_left ${open ? 'open' : ''}`}>
      <div className="menu_head">
        <h3>{title}</h3>
        <button className="close_menu" onClick={() => setOpen(!open)}>
          &times;
        </button>
      </div>
      <div className="menu_child">{children}</div>
    </div>
  );
};

export default Menu