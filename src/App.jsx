import { Route } from 'wouter'
import Inicio from './components/pages/Inicio'
import Productos from './components/pages/Productos'
import About from './components/pages/About'
function App() {

  return (
    <main className='h-full w-full'>
        <Route path='/' component={Inicio}/>
        <Route path='/products' component={Productos}/>
        <Route path='/about' component={About}/>
    </main>
  )
}

export default App
