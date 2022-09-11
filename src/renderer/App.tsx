import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'react-bootstrap';

import { useAppContext } from 'renderer/stores/app-store';

import Welcome from './Welcome';

import icon from '../../assets/icon.svg';
import './App.scss';

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
    </div>
  );
};

const App = observer(() => {
  const { preferences } = useAppContext();

  return (
    <ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg']} minBreakpoint="lg">
      {preferences.accounts.length === 0 ? (
        <Welcome />
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Hello />} />
          </Routes>
        </Router>
      )}
    </ThemeProvider>
  );
});

export default App;
