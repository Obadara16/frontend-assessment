import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className='w-full'>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12">
        <h1 className="text-2xl font-bold text-red-500">Welcome to Postit</h1>
      </div>
    </div>
  );
}

export default Home;
