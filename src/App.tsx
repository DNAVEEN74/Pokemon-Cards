import { useEffect, useState } from 'react';
import './App.css'
import Card from './components/Card';

interface Pokemon {
  name: string,
  url: string
}

function App() {
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null)
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [fetchUrl, setFetchUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon');
  const [searchInput, setSearchInput] = useState<string>('')


  const handleCardsLoad = async () => {
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json()

      setNextUrl(data.next);
      setPreviousUrl(data.previous);
      setPokemonList(data.results);
    }catch (err){
      console.log('Error fetching the Pokemons list:', err)
    }
  }

  useEffect(() => {
    handleCardsLoad();
  },[fetchUrl]);

  const handleNext: any = () => {
    if(nextUrl === null) return ;
    setPokemonList([]);
    setFetchUrl(nextUrl);
  }

  const handlePrevious: any = () => {
    if(previousUrl === null) return ;
    setPokemonList([]);
    setFetchUrl(previousUrl);
  }

  const searchPokemon : any  = async (searchName: string, url: string) => {
    if(!searchName) return;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const foundPokemon = data.results.find((pokemon: Pokemon) => pokemon.name.toLowerCase() === searchName.toLowerCase());

      if(foundPokemon){
        setPreviousUrl(null);
        setNextUrl(null);
        return setPokemonList([foundPokemon]);
      }else{
        if(data.next){
          return searchPokemon(searchName, data.next);
        }else{
          const confirm = window.confirm(`Pokemon with the name ${searchName} not found`);
          if(confirm){
            return ;
          }else {
            return;
          }
        }
      }
    }catch(err){
      console.error('Error in searching the pokemon:',err)
    }
  }

  return (
    <>
    <img src='https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif' alt="background" className='fixed top-0 w-full z-0' />
    <div className=' m-0 mt-14 mb-32 p-0 flex flex-col justify-center items-center border-box' >
      <img src="/Pokeball-PNG-Images-HD.png" alt=""  className='absolute size-20 top-64 right-10 drop-shadow-[0_25px_50px_#f87171] animate-ziggle-slow lg:right-36 lg:top-20'/>
      <img src="/pickachu.png" alt=""  className='absolute -rotate-12 size-20 top-20 left-20 drop-shadow-[0_25px_50px_#fde047] animate-ziggle-slow lg:left-80 lg:top-10 xl:left-80 xl:top-10 2xl:left-80 2xl:top-10'/>
      <img src="/pokemon-logo.svg" alt="" className='relative top-10 h-60 bg-transparent w-3/4 mb-12 filter drop-shadow-[0_25px_50px_#2563eb] min-w-96 sm:h-60 sm: w-60 md: w-96 lg: w-1/3 xl: size-2/4 2xl: size-2/4'/>
      <img src="/charizard.png" alt="" className='invisible absolute bottom-40 left-32 size-40  bg-transparent size-2/4 mb-4 filter drop-shadow-[0_25px_50px_#fdba74] animate-ziggle-slow sm:invisible md:invisible lg:visible xl:visible 2xl:visible'/>
      <img src="/mew.png" alt="" className='invisible absolute bottom-44 right-20 size-40  bg-transparent size-2/4 mb-4 filter drop-shadow-[0_25px_50px_#ddd6fe] animate-ziggle-slow sm:invisible md:invisible lg:visible xl:visible 2xl:visible'/>

      <p className='text-slate-400 font-medium text-xl m-0 mb-2'>Explore the vast world of Pokémon</p>
      <div className="relative w-4/5 max-w-lg min-w-11/12 mt-2">
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-gray-950 text-white px-4 py-3 pr-12 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-700 placeholder-slate-400"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button className="absolute right-4 top-1/2 transform -translate-y-1/2" onClick={() => searchPokemon(searchInput, 'https://pokeapi.co/api/v2/pokemon')} >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 2a8 8 0 015.31 13.56l4.61 4.61a1 1 0 01-1.42 1.42l-4.61-4.61A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"
          />
        </svg>
      </button>
    </div>
    </div>
    <div className='flex flex-wrap m-0 justify-center relative z-10 p-0 mx-40 mt-0 mb-0 bg-transparent sm: m-10 md: m-10 lg: m-40 xl: m-40 2xl: m-40'>
        {pokemonList.length ? (
          pokemonList.map((pokemon) => {
            return (
              <div className='m-4' key={pokemon.name}>
                <Card url={pokemon.url} /> 
              </div>
            );
          })
        ) : (
            <div className='m-4' ><Card url=''/></div>
        )}
    </div>
    <div className='flex justify-center pl-4 pr-4 gap-4 max-w-lg m-auto flex-wrap mt-6 mb-6 relative z-10' >
      { previousUrl ? (
        <button className='inline-block mt-0 justify-center w-40 rounded bg-slate-200 px-12 py-3 text-sm font-medium hover:bg-slate-300' onClick={handlePrevious} >Previous</button>
      ): (
        <button className='inline-block mt-0 justify-center rounded w-40 bg-slate-200 px-12 py-3 text-sm font-medium hover:cursor-not-allowed'>Previous</button>
      )}
      { nextUrl ? (
        <button className='flex justify-center mt-0 inline-block w-40 rounded bg-slate-200 px-12 py-3 text-sm font-medium hover:bg-slate-300 hover' onClick={handleNext}>Next
      </button>
      ) : (
        <button className='flex inline-block mt-0 justify-center w-40 rounded bg-slate-200 px-12 py-3 text-sm font-medium hover:cursor-not-allowed'>Next
      </button>
      )}
    </div>
    </>
  )
}

export default App