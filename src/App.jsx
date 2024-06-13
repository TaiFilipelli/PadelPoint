import { Route, Switch } from 'wouter';
import Inicio from './components/pages/Inicio.jsx';
import Productos from './components/pages/Productos.jsx';
import Error404 from './components/pages/404Page.jsx';
import AboutUs from './components/pages/AboutUs.jsx';
import Navbar from './components/Navbar.jsx';
import Product from './components/pages/Product.jsx';
import { useState } from 'react';

function App() {

  const [isLogged, setIsLogged] = useState(false);

  return (
    <main className='h-full w-full bg-no-repeat'>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged}/>
      <Switch>
        <Route path='/' component={Inicio}/>
        <Route path='/products' component={Productos}/>
        <Route path='/about' component={AboutUs}/>
        <Route path='/productdetail' component={Product}/>

        <Route path='/404' component={Error404}/>
      </Switch>
    </main>
  );
}

export default App;