import React, { useReducer, useCallback, useMemo, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import ErrorModal from './../UI/ErrorModal';
import Search from './Search';
import IngredientList from './IngredientList';
import useHttp from './../../hooks/http';

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...state, action.ingredient];
    case 'DELETE':
      return state.filter((ingredient) => action.id !== ingredient.id);
    default:
      return state;
  }
};

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const { loading, errorMsg, responseObj, reqExtra, sentRequest, reqIdentifer, clear } = useHttp();
  useEffect(() => {
    if(!loading && !errorMsg && reqIdentifer === 'ADD_INGREDIENT'){
      dispatch({ type: 'ADD', ingredient: { id: responseObj.name, ...reqExtra } })
    }
    if(!loading && !errorMsg && reqIdentifer === 'DELETE_INGREDIENT'){
      dispatch({ type: 'DELETE', id: reqExtra })
    }
  }, [loading, errorMsg, reqIdentifer, reqExtra, responseObj])

  const addUserIngredients = useCallback((ingredient) => {
    sentRequest(
      'https://react-hooks-update-220cb.firebaseio.com/ingredient.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );
  }, [sentRequest]);

  const onRemoveItem = useCallback((id) => {
    sentRequest(
      `https://react-hooks-update-220cb.firebaseio.com/ingredient/${id}.json`,
      'DELETE',
      null,
      id,
      'DELETE_INGREDIENT'
    );
  }, [sentRequest]);
  const onLoadSearchText = useCallback((ingredients) => {
    dispatch({ type: 'SET', ingredients });
  }, []);


  const ingrediantList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={onRemoveItem}
      />
    );
  }, [userIngredients, onRemoveItem]);

  return (
    <div className="App">
      {errorMsg && <ErrorModal onClose={clear}>{errorMsg}</ErrorModal>}
      <IngredientForm submit={addUserIngredients} loading={loading} />

      <section>
        <Search onLoadSearchText={onLoadSearchText} />
        {ingrediantList}
      </section>
    </div>
  );
}

export default Ingredients;
