import { Route, Switch } from 'wouter';
import Inicio from './components/pages/Inicio.jsx';
import Productos from './components/pages/Productos.jsx';
import Error404 from './components/pages/404Page.jsx';
import AboutUs from './components/pages/AboutUs.jsx';
import Navbar from './components/Navbar.jsx';
import Product from './components/pages/Product.jsx';
import Carrito from './components/Carrito.jsx';
import { useState, useEffect } from 'react';

/**
 * 
 * @returns {JSX.Element} El componente principal de la app web. 
 */
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <main className='h-full w-full bg-no-repeat bg-custom-light-bg text-black dark:bg-custom-dark-bg dark:text-white'>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged} onToggleDarkMode={onToggleDarkMode} isDarkMode={isDarkMode} />
      <Switch>
        <Route path='/' component={Inicio} />
        <Route path='/products' component={Productos} />
        <Route path='/about' component={AboutUs} />
        <Route path='/productdetail' component={Product} />
        <Route path='/404' component={Error404} />
      </Switch>
      <div className='w-screen flex fixed left-[90%] bottom-16'>
        <Carrito isLogged={isLogged} setIsLogged={setIsLogged} items={cartItems} />
      </div>
    </main>
  );
}

export default App;
