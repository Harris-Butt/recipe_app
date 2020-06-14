import React, {useEffect, useContext , useState} from 'react';
import './App.css';
import Recipe from './Recipe';


function App() {
  const APP_ID = 'd91497a3';
  const APP_KEY = '3030df2fa63327cb2cba0644d4cef15b';

  const[recipes,setRecipes] = useState([]);
  const[search,setSearch] = useState("");
  const [query,setQuery] = useState("chicken")

  useEffect(() => {
    getRecipes();
  },[query] );  
  const getRecipes = async()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`,{mode:'cors'});
    const data = await response.json();
    setRecipes(data.hits); 
    console.log(data);
  }
  const updateSearch = e =>{
    setSearch(e.target.value);
  } 
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="App">
      <form className="serach-form" onSubmit={getSearch}>
        <input type="text"  className="serach-bar" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit" >Search</button>
      </form>
      {recipes.map(recipe=>(
        <Recipe 
          key = {recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image} />
      ))} 
    </div>
  );
}

export default App;
