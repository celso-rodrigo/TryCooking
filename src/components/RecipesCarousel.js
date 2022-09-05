import React from 'react';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';

function RecipesCarousel({ carouselInfo }) {
  const history = useHistory();

  const {
    detailsPageType,
    recommendations,
  } = carouselInfo;

  const changePage = (recipeObj) => {
    const pathname = detailsPageType === 'foods'
      ? `/drinks/${recipeObj.idDrink}`
      : `/foods/${recipeObj.idMeal}`;
    history.push(pathname);
    window.location.reload();
  };

  return (
    <Carousel infiniteLoop showThumbs={ false } emulateTouch>
      {recommendations.map((recommendation) => (
        <div
          type="button"
          key={ detailsPageType === 'foods'
            ? recommendation.idDrink
            : recommendation.idMeal }
        >
          <img
            src={ detailsPageType === 'foods'
              ? recommendation.strDrinkThumb
              : recommendation.strMealThumb }
            alt="Recommended recipe."
          />
          <button
            type="button"
            className="legend"
            onClick={ () => changePage(recommendation) }
          >
            { detailsPageType === 'foods'
              ? recommendation.strDrink
              : recommendation.strMeal }
          </button>
        </div>
      ))}
    </Carousel>
  );
}

RecipesCarousel.propTypes = {
  carouselInfo: PropTypes.shape({
    detailsPageType: PropTypes.string.isRequired,
    recommendations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default RecipesCarousel;
