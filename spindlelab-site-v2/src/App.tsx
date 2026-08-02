import Nav from './components/Nav';
import Hero from './components/Hero';
import Problema from './components/Problema';
import Servicios from './components/Servicios';
import Metodo from './components/Metodo';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-[#0B120E]">
      <Nav />
      <main>
        <Hero />
        <Problema />
        <Servicios />
        <Metodo />
        <Contacto />
      </main>
      <Footer />
    </div>
  );
}

export default App;
