import React, { useState } from 'react';
import {
  Header,
  Table,
  Button,
  Divider,
  Form,
  Input,
  Card,
  Transition,
  Accordion,
  Icon,
} from 'semantic-ui-react';

import AlgoLayout from '../components/AlgoLayout';
import MagmaCypher from '../algorithms/magma/magma';

function Magma() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [processed, setProcessed] = useState({
    output: '',
    roundKeys: [],
    steps: [],
    isLowerCase: true,
    extraActive: false,
  });

  function cypher(e) {
    const magma = new MagmaCypher(text, key);
    let output = magma.cypher();
    setProcessed({
      ...processed,
      isLowerCase: true,
      roundKeys: magma.getKeys(),
      steps: magma.getIntermediateSteps(),
      output,
    });
    console.log(processed);
  }

  function decypher(e) {
    const magma = new MagmaCypher(text, key);
    let output = magma.decypher();
    setProcessed({
      ...processed,
      isLowerCase: true,
      roundKeys: magma.getKeys(),
      steps: magma.getIntermediateSteps(),
      output,
    });
    console.log(processed);
  }

  function handleChange(e) {
    const objs = { text: setText, key: setKey };
    objs[e.target.name](e.target.value);
  }

  const description =
    'Алгоритм Магма был опубликован в стандарте ГОСТ 34.12-2015, который представляет собой алгоритм блочного шифрования с размером блока в 64 бит и является уточнением ГОСТ 28147-89, а именно в стандарте также фиксирована таблица перестановок, в то вроме как в старом ГОСТе можно использовать произвольную перестановку. В основе блочного шифра используется сеть Фейстеля с 32 раундами и несложный, по сравнению с Кузнечиком, алгоритм развертки ключа.';

  return (
    <AlgoLayout
      title="Блочный шифр Магма"
      description={description}
      // xmind="http://google.com"
      table={[
        ['Длина блока n', '64 бит'],
        ['Длина ключа', '256 бит'],
        ['Количество раундов', '32'],
        ['Длина раундового ключа', '32 бит'],
      ]}
    >
      <Card fluid>
        <Card.Content>
          <Form>
            <Form.Field>
              <label>
                <h3 style={{ padding: '5px 10px' }}>Ключ</h3>
              </label>
              <input
                placeholder="Ключ..."
                name="key"
                onChange={handleChange}
                value={key}
              />
            </Form.Field>
            <Form.Field>
              <label>
                <h3 style={{ padding: '5px 10px' }}>Текст</h3>
              </label>
              <input
                placeholder="Текст..."
                name="text"
                onChange={handleChange}
                value={text}
              />
            </Form.Field>

            <Button
              basic
              color="green"
              content="Демо данные №1"
              onClick={() => {
                setText('fedcba9876543210');
                setKey(
                  'ffeeddccbbaa99887766554433221100f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff'
                );
              }}
            />
            <Button
              basic
              color="teal"
              content="Демо данные №2"
              onClick={() => {
                setText('4ee901e5c2d8ca3d');
                setKey(
                  'ffeeddccbbaa99887766554433221100f0f1f2f3f4f5f6f7f8f9fafbfcfdfeff'
                );
              }}
            />

            <Button.Group floated="right">
              <Button
                icon="lock"
                content="Зашифровать"
                color="grey"
                onClick={cypher}
              />
              <Button
                icon="unlock"
                content="Расшифровать"
                color="black"
                onClick={decypher}
              />
            </Button.Group>
          </Form>
        </Card.Content>
      </Card>

      <Divider hidden />

      <Card fluid>
        <Card.Content>
          <Header
            as="h3"
            content="Результаты"
            icon="terminal"
            style={{ padding: '5px 10px' }}
          />
          <Input fluid value={processed.output} action>
            <input />
            <Button
              compact
              onClick={() => {
                setProcessed({
                  ...processed,
                  output: processed.output.replaceAll(' ', ''),
                });
              }}
            >
              Убрать пробелы
            </Button>
            <Button
              compact
              onClick={() => {
                const { output, isLowerCase } = processed;
                setProcessed({
                  ...processed,
                  output: !isLowerCase
                    ? output.toLowerCase()
                    : output.toUpperCase(),
                  isLowerCase: !isLowerCase,
                });
              }}
            >
              Изменить регистр
            </Button>
          </Input>

          <Divider hidden />
          <Transition
            visible={!!processed.output}
            animation="fade up"
            duration={500}
            fluid
          >
            {processed.roundKeys && (
              <Accordion>
                <Accordion.Title
                  onClick={() =>
                    setProcessed({
                      ...processed,
                      extraActive: !processed.extraActive,
                    })
                  }
                  active={processed.extraActive}
                >
                  <Icon name="dropdown" />
                  Дополнительная информация
                </Accordion.Title>
                <Accordion.Content active={processed.extraActive}>
                  <div>
                    <Table celled striped>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>№</Table.HeaderCell>
                          <Table.HeaderCell>Ключ</Table.HeaderCell>
                          <Table.HeaderCell>
                            Промежуточный результат
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        {processed.roundKeys.map((_, i) => (
                          <Table.Row key={i}>
                            <Table.Cell>{i + 1}</Table.Cell>
                            <Table.Cell>{processed.roundKeys[i]}</Table.Cell>
                            <Table.Cell>{processed.steps[i]}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </div>
                </Accordion.Content>
              </Accordion>
            )}
          </Transition>
        </Card.Content>
      </Card>
    </AlgoLayout>
  );
}

export default Magma;
