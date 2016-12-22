import './PizzaToppings.scss'

import classNames from 'classnames'
import React from 'react'

import {capitalise} from './utils'

const TOPPINGS = [
  'anchovy',
  'bacon',
  'basil',
  'chili',
  'mozzarella',
  'mushroom',
  'olive',
  'onion',
  'pepper',
  'pepperoni',
  'sweetcorn',
  'tomato',
]

let PizzaToppings = React.createClass({
  getInitialState() {
    return {
      focused: '',
    }
  },

  handleBlur(e) {
    this.setState({focused: ''})
  },
  handleChange(e) {
    let {checked, value} = e.target
    let {onChange, value: toppings} = this.props
    if (checked) {
      onChange(toppings.concat(value))
    }
    else {
      onChange(toppings.filter(topping => topping !== value))
    }
  },
  handleFocus(e) {
    this.setState({focused: e.target.value})
  },

  render() {
    let {focused} = this.state
    let {value} = this.props
    return <div class="pizza-toppings">
      {TOPPINGS.map(topping =>
        <label key={topping} class={classNames('pizza-topping', {
          'pizza-topping--active': value.includes(topping),
          'pizza-topping--focused': focused === topping,
        })}>
          <input
            type="checkbox"
            value={topping}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            checked={value.includes(topping)}
          />
          <span class={`pizza-topping__icon pizza-topping__icon--${topping}`}/>
          {capitalise(topping)}
        </label>
      )}
    </div>
  }
})

export default PizzaToppings
