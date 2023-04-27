import logo from './logo.svg';
import './App.css';

import Home from './components/Home';

import AuthContext from './contexs/AuthContext';

function App() {
  return (
    <AuthContext>
      <Home></Home>
    </AuthContext>
  );
}

export default App;
