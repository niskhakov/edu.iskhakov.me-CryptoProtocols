import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function MenuBar() {
  // Active page resolving
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substring(1);

  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (name) => () => setActiveItem(name);

  return (
    <Menu pointing secondary color="blue" size="massive">
      <Menu.Item
        name="главная"
        active={activeItem === 'home'}
        onClick={handleItemClick('home')}
        as={Link}
        to="/"
      />
      <Menu.Item
        name="магма"
        active={activeItem === 'magma'}
        onClick={handleItemClick('magma')}
        as={Link}
        to="/magma"
      />
      <Menu.Item
        name="кузнечик"
        disabled
        active={activeItem === 'kuznechik'}
        // onClick={handleItemClick('kuznechik')}
        // as={Link}
        to="/kuznechik"
      />
    </Menu>
  );
}

export default MenuBar;
