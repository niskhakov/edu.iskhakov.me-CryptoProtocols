import React from 'react';
import {
  Container,
  Header,
  Table,
  Grid,
  Image,
  Button,
  Input,
  Divider,
} from 'semantic-ui-react';
import XMindBtn from '../images/xmindbtn.png';

function Magma() {
  return (
    <Container style={{ padding: '20px' }}>
      <Header as="h2">Блочный шифр Магма</Header>
      <Grid centered>
        <Grid.Column width={10}>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
            elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
            ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam
            lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
            viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
            imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
            ultricies nisi.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa strong. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel,
            aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
            imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus
            elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
            ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam
            lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
            viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
            imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
            ultricies nisi.
          </p>
        </Grid.Column>
        <Grid.Column width={6}>
          <Table attached="top">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Характеристика</Table.HeaderCell>
                <Table.HeaderCell>Значение</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Длина блока n</Table.Cell>
                <Table.Cell>64 бит</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Длина ключа</Table.Cell>
                <Table.Cell>256 бит</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Количество раундов</Table.Cell>
                <Table.Cell>32</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Длина раундового ключа</Table.Cell>
                <Table.Cell>32 бит</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table attached="bottom">
            <Table.Body>
              <Table.Row>
                <Table.Cell textAlign="center">
                  <Button basic compact={true}>
                    <Image src={XMindBtn} size="tiny" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>

      <Divider hidden />
      <Input action placeholder="Открытый текст..." fluid>
        <input />
        <Button color="vk" basic icon="lock" />
        <Button color="linkedin" icon="unlock" />
      </Input>
    </Container>
  );
}

export default Magma;
