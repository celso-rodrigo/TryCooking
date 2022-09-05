import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import UtilButtons from '../components/UtilButtons';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const findNone = 'Nenhuma Receita Concluida!';

  const transform = (tags) => {
    const arrTags = tags.toString().split(',');
    return arrTags;
  };

  const doneRecipeCard = (recipes) => (
    <>
      {
        recipes
          .map((element, index) => (
            <div className="done-recipes-container" key={ element.id }>
              <div className="done-recipes-card">
                <div className="image-card">
                  <Link to={ `foods/${element.id}` }>
                    <img
                      src={ element.image }
                      alt="Receita concluída."
                      data-testid={ `${index}-horizontal-image` }
                      className="small-img"
                    />
                  </Link>
                </div>

                <div className="content-card">
                  <Link to={ `foods/${element.id}` }>
                    <h2
                      data-testid={ `${index}-horizontal-name` }
                    >
                      { element.name }
                    </h2>
                  </Link>

                  <h4
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    { element.nationality.length
                      ? `${element.nationality} - ${element.category}`
                      : `${element.category}`}
                  </h4>

                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                  >
                    { element.doneDate }
                  </p>

                  {
                    element.tags !== undefined ? (
                      transform(element.tags).map((tag) => (
                        <h4
                          key={ tag }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          {tag}

                        </h4>
                      ))
                    ) : null
                  }

                  <UtilButtons
                    recipeObj={ element }
                    isDrink={ element.type === 'drink' }
                    copyText={ `http://localhost:3000/foods/${element.id}` }
                  />

                </div>
              </div>
            </div>
          ))
      }
    </>
  );

  const showItens = (infoFiltro) => {
    const doneItensLocal = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneItensLocal === null || !doneItensLocal.length) return <h4>{ findNone }</h4>;
    const filteredItems = infoFiltro !== 'all'
      ? doneItensLocal.filter((recipes) => recipes.type === infoFiltro)
      : doneItensLocal;
    return doneRecipeCard(filteredItems);
  };

  return (
    <div className="done-recipes-container">
      <Header title="Done Recipes" icons={ { profile: true, search: false } } />
      {/* Filters */}
      <div className="done-recipes-buttons">
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
        >
          Food
        </button>
        <button
          type="button"
          name="drinks"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>

      {/* Map Itens */}
      {showItens(filter)}

    </div>
  );
}

export default DoneRecipes;
