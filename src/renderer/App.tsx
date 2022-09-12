import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'react-bootstrap';

import Welcome from './Welcome';
import Account from './Account';

import './App.scss';

const App = observer(() => {
  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg']} minBreakpoint="lg">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/accounts/:id" element={<Account />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
});

export default App;
