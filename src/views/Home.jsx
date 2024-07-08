import Hero from '../components/Hero';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className='w-full'>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12 lg:-mt-16 pt-3 justify-center items-center p-4">
        <Hero/>
      </div>
    </div>
  );
}

export default Home;
