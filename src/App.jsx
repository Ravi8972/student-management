import { Provider } from 'react-redux';
import { store } from "./redux/store";
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Provider store={store}>
      <Home />
      <Toaster position="top-right" />
    </Provider>
  );
}

export default App;