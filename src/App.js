import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Recipe from './Recipe';
import './App.css';
import uuuid from 'uuid';


function App() {

  const APP_ID = '4a06f7bf';
  const APP_KEY = '450cd8f1339b98b62433fe2aad4e4217';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  //This useEffect function triggers on the load of the page (actually everytime any component loads, this function runs),
  //and if we have to make it run only on the page load, then we have to pass empty array   
  //This useEffect is the alternative of componentDidMount() in class based component,
  //the main purpose here is to fetch the data from API and set it to state.
  useEffect(() => { getRecipes() }, [query]);

  const getRecipes = async () => {
    const response = await Axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    setRecipes(response.data.hits);

  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };



  return (
    <div className="App">
      <header className="headerStyle">
        <h1>Search Recipe</h1>
      </header>

      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" required={true} type="text" value={search} onChange={onSearchChange} />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe
            key={uuuid.v4()}
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            calories={recipe.recipe.calories}
            ingredients={recipe.recipe.ingredients}>
          </Recipe>
        ))}
      </div>
    </div>
  );
}

export default App;
