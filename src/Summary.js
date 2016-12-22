import './Summary.scss'

import React from 'react'

import {capitalise} from './utils'

const SIZE_PRICES = {
  small: {
    base: 9.99,
    toppings: 0.69,
  },
  medium: {
    base: 12.99,
    toppings: 0.99,
  },
  large: {
    base: 16.99,
    toppings: 1.29,
  },
}

function getPrice(pizzas) {
  let price = 0
  pizzas.forEach(pizza => {
    price += SIZE_PRICES[pizza.size].base
    price += SIZE_PRICES[pizza.size].toppings * pizza.toppings.length
  })
  return price.toFixed(2)
}

let Summary = React.createClass({
  render() {
    let {pizzas, valid} = this.props
    return <div class="summary">
      {pizzas.map((pizza, i) =>
        <div key={pizza._key} class="summary__pizza">
          {pizza.size &&
            <div>
              <h3>
                {capitalise(pizza.size)} Pizza
                <span class="summary__price">
                  &pound;{SIZE_PRICES[pizza.size].base}
                </span>
              </h3>

              <div class="summary__toppings">
                {pizza.toppings.map(topping =>
                  <div key={topping} class="summary__topping">
                    <i class="fa fa-plus"/> {capitalise(topping)}

                    <span class="summary__price">
                      {SIZE_PRICES[pizza.size].toppings}
                    </span>
                  </div>
                )}
              </div>
            </div>
          }
        </div>
      )}
      <div class="summary__total-price">
        &pound;{getPrice(pizzas)}
      </div>

      <button type="submit" class="summary__button" disabled={!valid}>
        Place order
      </button>
    </div>
  }
})

export default Summary
