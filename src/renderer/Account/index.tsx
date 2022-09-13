import { useEffect, useState } from 'react';
import { Button, Col, Dropdown, Layout, Menu, Row } from 'antd';
import { observer } from 'mobx-react-lite';
import { Link, useLocation } from 'react-router-dom';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { FiHardDrive } from 'react-icons/fi';
import { AiOutlineCaretDown } from 'react-icons/ai';

const Account = observer(() => {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<ItemType[]>([]);
  const [menuSelectedKeys, setMenuSelectedKeys] = useState<string[]>([]);

  const menu = (
    <Menu
      style={{ width: 180 }}
      items={[
        {
          key: 'current_user',
          label: (
            <Link to="/">
              Signed in as <strong>current account</strong>
            </Link>
          ),
        },
        { type: 'divider' },
        { key: 'sign_out', label: <a href="/logout">Sign out</a> },
      ]}
    />
  );

  useEffect(() => {
    const items: ItemType[] = [];

    items.push({
      key: '/buckets',
      icon: <FiHardDrive />,
      label: <Link to="/clusters">空间管理</Link>,
    });

    setMenuItems(items);
  }, []);

  // change menu selected when route changed
  useEffect(() => {
    setMenuSelectedKeys([location.pathname]);
  }, [location.pathname]);

  return (
    <Layout>
      <Layout.Header className="navigation">
        <Row>
          <Col>
            <Link to="/" className="logo">
              <svg width="160" height="28" viewBox="0 0 160 22" fill="#07BEFF">
                <text style={{ fontWeight: 'bold' }} x="5" y="20" fontFamily="Verdana" fontSize="24">
                  Attachment
                </text>
              </svg>
            </Link>
          </Col>
          <Col flex="auto" />
          <Col>
            <Dropdown trigger={['click']} placement="bottomRight" overlay={menu}>
              <Button type="link">
                Account <AiOutlineCaretDown />
              </Button>
            </Dropdown>
          </Col>
        </Row>
      </Layout.Header>

      <Layout hasSider className="site-layout" style={{ marginLeft: 257 }}>
        <Layout.Sider className="sidebar" width={257}>
          <Menu
            className="sidemenu"
            mode="inline"
            inlineIndent={8}
            defaultSelectedKeys={[location.pathname]}
            selectedKeys={menuSelectedKeys}
            items={menuItems}
          />
        </Layout.Sider>

        <Layout.Content className="site-layout-content">Content</Layout.Content>
      </Layout>
    </Layout>
  );
});

export default Account;
