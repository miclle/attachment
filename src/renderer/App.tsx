import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

import Welcome from './Welcome';
import Account from './Account';

const App = observer(() => {
  return (
    <ConfigProvider locale={zhCN}>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/accounts/:id" element={<Account />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
});

export default App;
