import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'semantic-ui-react';

function Home() {
  return (
    <Card.Group>
      <Card as={Link} to="/magma">
        <Card.Content>
          <Card.Header>Блочный шифр Магма</Card.Header>
          <Card.Meta>ГОСТ Р 34.12-2015 - 64 бит</Card.Meta>
          <Card.Description>
            Блочный шифр, берущий начало из ГОСТ 28147-89 и использующий в
            качестве основы сеть Фейстеля
          </Card.Description>
        </Card.Content>
      </Card>
      <Card>
        <Card.Content>
          <Card.Header>
            <span style={{ color: 'grey' }}>Блочный шифр Кузнечик</span>
          </Card.Header>
          <Card.Meta>ГОСТ Р 34.12-2015 - 128 бит</Card.Meta>
          <Card.Description>
            Блочный шифр с размером блока 128 бит, который был впервые описан в
            ГОСТ Р 34.12-2015
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

export default Home;
