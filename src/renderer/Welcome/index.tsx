import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import { animated, useSpring } from '@react-spring/web';

import './style.scss';

const Welcome = observer(() => {
  const styles = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      return;
    }

    const target = event.target as typeof event.target & {
      access_key: { value: string };
      access_secret: { value: string };
    };

    const accessKey = target.access_key.value; // typechecks!
    const accessSecret = target.access_secret.value; // typechecks!

    // eslint-disable-next-line no-console
    console.log(accessKey, accessSecret);

    setValidated(true);
  };

  return (
    <animated.div id="welcome" style={styles}>
      <div className="welcome-wrap">
        <Card style={{ width: 580, margin: '0 auto', padding: 25 }}>
          <Card.Body>
            <Card.Title as="h2" className="text-center mb-4">
              Attachment
            </Card.Title>

            <Card.Subtitle className="text-center mb-5">
              Set up key information for your Qiniu Cloud account.
            </Card.Subtitle>

            <Form validated={validated} onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingKey"
                label="Access Key"
                className="mb-4"
              >
                <Form.Control
                  required
                  type="text"
                  name="access_key"
                  placeholder="Access Key"
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingSecret"
                label="Access Secret"
                className="mb-4"
              >
                <Form.Control
                  required
                  type="password"
                  name="access_secret"
                  placeholder="Access Secret"
                />
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
});

export default Welcome;
