import React from 'react';

import {
  Container,
  Header,
  Table,
  Grid,
  Image,
  Button,
  Divider,
} from 'semantic-ui-react';
import XMindBtn from '../images/xmindbtn.png';

function AlgoLayout({ children, title, description, table, xmind }) {
  return (
    <>
      <Container style={{ padding: '20px' }}>
        <Header as="h2">{title}</Header>
        <Grid centered>
          <Grid.Column width={10}>
            <p> {description}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            {table && (
              <Table attached={xmind ? 'top' : ''}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Характеристика</Table.HeaderCell>
                    <Table.HeaderCell>Значение</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {table.map((item) => (
                    <Table.Row>
                      <Table.Cell>{item[0]}</Table.Cell>
                      <Table.Cell>{item[1]}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
            {xmind && (
              <Table attached="bottom">
                <Table.Body>
                  <Table.Row>
                    <Table.Cell textAlign="center">
                      <Button basic compact={true} as="a" href={xmind}>
                        <Image src={XMindBtn} size="tiny" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            )}
          </Grid.Column>
        </Grid>

        <Divider hidden />
        {children}
      </Container>
    </>
  );
}

export default AlgoLayout;
