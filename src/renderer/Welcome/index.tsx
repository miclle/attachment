import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { animated, useSpring } from '@react-spring/web';
import { Button, Card, Form, Input, List, Select, Skeleton, Typography } from 'antd';

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
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const handleSubmit = async (values: IAccount) => {
    await Application.addAccount(values);
    await Application.preferences().then((preference) => {
      return store.setPreferences(preference);
    });
    refetch();
  };

  if (isAccountLoading) {
    return (
      <animated.div id="welcome" style={styles}>
        <Skeleton active />
      </animated.div>
    );
  }

  if (accounts.length === 0) {
    return (
      <animated.div id="welcome" style={styles}>
        <div className="welcome-wrap">
          <Card style={{ width: 580, margin: '0 auto', padding: 25 }}>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>
              Attachment
            </Typography.Title>

            <Typography.Title level={5} style={{ textAlign: 'center', marginBottom: 25 }}>
              Add an account to get started
            </Typography.Title>

            <Form name="basic" layout="vertical" onFinish={handleSubmit} autoComplete="off">
              <Form.Item label="Provider with selects" name="provider" initialValue="QiniuCloud">
                <Select size="large">
                  <Select.Option value="QiniuCloud">Qiniu Cloud</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Access Key"
                name="access_key"
                rules={[{ required: true, message: 'Please input your access key!' }]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Secret Key"
                name="secret_key"
                rules={[{ required: true, message: 'Please input your secret key!' }]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item label="Comments" name="comment">
                <Input size="large" />
              </Form.Item>

              <Form.Item style={{ marginTop: 35, marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" block size="large">
                  Continue
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </animated.div>
    );
  }

  return (
    <animated.div id="welcome" style={styles}>
      <div className="welcome-wrap">
        <Card style={{ width: 580, margin: '0 auto', padding: 25 }}>
          <Typography.Title level={2} className="text-center mb-4">
            Attachment
          </Typography.Title>

          <Typography.Title level={4} className="text-center mb-5">
            Select the account.
          </Typography.Title>

          <List
            itemLayout="horizontal"
            dataSource={accounts}
            renderItem={(account) => (
              <List.Item>
                <List.Item.Meta
                  // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={<a href="https://ant.design">{account.access_key}</a>}
                  description={account.comment}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </animated.div>
  );
});

export default Welcome;
