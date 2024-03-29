import React, { useState } from 'react';

import LoadingIndicator from './../UI/LoadingIndicator';
import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [inputTitleState, setInputTitleState] = useState("");
  const [inputAmountState, setInputAmountState] = useState("");
  const submitHandler = event => {
    event.preventDefault();
    props.submit({ title: inputTitleState, amount: inputAmountState });
  };

  console.log('IngredientForm class rendering')
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title"
              value={inputTitleState}
              onChange={event => {
                setInputTitleState(event.currentTarget.value)
              }} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount"
              value={inputAmountState}
              onChange={event => {
                setInputAmountState(event.currentTarget.value);
              }} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
