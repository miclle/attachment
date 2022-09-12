import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, FloatingLabel, Form, ListGroup, Placeholder } from 'react-bootstrap';
import { animated, useSpring } from '@react-spring/web';

import { IAccount } from 'models';
import { useAppContext } from 'renderer/stores/app-store';
import { Application } from 'renderer/services';

import './style.scss';

const Welcome = observer(() => {
  const navigate = useNavigate();
  const store = useAppContext();

  const {
    isLoading: isAccountLoading,
    data: accounts,
    refetch,
  } = useQuery<IAccount[]>(
    ['accounts'],
    async () => {
      const preference = await Application.preferences();
      return preference.accounts;
    },
    {
      initialData: [],
      onSuccess(data: IAccount[]) {
        if (data.length === 1) {
          navigate(`/accounts/${data[0].access_key}`, { replace: true });
        }
      },
    }
  );

  const styles = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    setValidated(true);

    const target = event.target as typeof event.target & {
      provider: { value: string };
      access_key: { value: string };
      access_secret: { value: string };
      comment: { value: string };
    };

    const account = {
      provider: target.provider.value,
      access_key: target.access_key.value,
      access_secret: target.access_secret.value,
      comment: target.comment.value,
    };

    await Application.addAccount(account);

    await Application.preferences().then((preference) => {
      return store.setPreferences(preference);
    });

    refetch();
  };

  if (isAccountLoading) {
    return (
      <animated.div id="welcome" style={styles}>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} />
              <Placeholder xs={4} />
              <Placeholder xs={4} />
              <Placeholder xs={6} />
              <Placeholder xs={8} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={6} />
          </Card.Body>
        </Card>
      </animated.div>
    );
  }

  if (accounts.length === 0) {
    return (
      <animated.div id="welcome" style={styles}>
        <div className="welcome-wrap">
          <Card style={{ width: 580, margin: '0 auto', padding: 25 }}>
            <Card.Body>
              <Card.Title as="h2" className="text-center mb-4">
                Attachment
              </Card.Title>

              <Card.Subtitle className="text-center mb-5">Add an account to get started</Card.Subtitle>

              <Form validated={validated} onSubmit={handleSubmit}>
                <FloatingLabel controlId="floatingProvider" label="Provider with selects" className="mb-4">
                  <Form.Select required name="provider">
                    <option value="QiniuCloud">Qiniu Cloud</option>
                  </Form.Select>
                </FloatingLabel>

                <FloatingLabel controlId="floatingKey" label="Access Key" className="mb-4">
                  <Form.Control required type="text" name="access_key" placeholder="Access Key" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingSecret" label="Access Secret" className="mb-4">
                  <Form.Control required type="password" name="access_secret" placeholder="Access Secret" />
                </FloatingLabel>

                <FloatingLabel controlId="floatingComments" label="Comments" className="mb-4">
                  <Form.Control as="textarea" name="comment" placeholder="Add a comment here" />
                </FloatingLabel>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    Continue
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </animated.div>
    );
  }

  return (
    <animated.div id="welcome" style={styles}>
      <div className="welcome-wrap">
        <Card style={{ width: 580, margin: '0 auto', padding: 25 }}>
          <Card.Body>
            <Card.Title as="h2" className="text-center mb-4">
              Attachment
            </Card.Title>

            <Card.Subtitle className="text-center mb-5">Select the account.</Card.Subtitle>

            <ListGroup variant="flush">
              {accounts.map((account) => (
                <ListGroup.Item key={account.access_key} action>
                  {account.access_key}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </animated.div>
  );
});

export default Welcome;
