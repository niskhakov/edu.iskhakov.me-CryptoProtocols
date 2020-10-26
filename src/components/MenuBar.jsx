import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

function MenuBar() {
  return (
    <Menu pointing secondary color="blue" size="massive">
      <Menu.Item name="главная" as={NavLink} to="/" exact />
      <Menu.Item name="магма" as={NavLink} to="/magma" exact />
      <Menu.Item
        name="кузнечик"
        disabled
        // as={Link}
        to="/kuznechik"
      />
    </Menu>
  );
}

export default MenuBar;
