import './PizzaSize.scss'

import classNames from 'classnames'
import React from 'react'

import {capitalise} from './utils'

const SIZES = ['large', 'medium', 'small']
const INCHES = [13, 11, 9]

let PizzaSize = React.createClass({
  getInitialState() {
    return {
      focused: '',
    }
  },

  handleBlur() {
    this.setState({focused: ''})
  },
  handleChange(e) {
    this.props.onChange(e.target.value)
  },
  handleFocus(e) {
    this.setState({focused: e.target.value})
  },

  render() {
    let {focused} = this.state
    let {value} = this.props
    return <div class="pizza-size section">
      {SIZES.map((size, i) =>
        <label key={size} class={classNames('pizza-size__item', {
          'pizza-size__item--active': value === size,
          'pizza-size__item--focused': focused === size,
        })}>
          <input
            type="radio"
            name="size"
            value={size}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            checked={value === size}
          />
          <div class="pizza-size__plate">
            <div class={`pizza-size__pizza pizza-size__pizza--${size}`}>
              <div class="pizza-size__pizza__line"></div>
              <div class="pizza-size__pizza__line"></div>
              <div class="pizza-size__pizza__line"></div>
              <div class="pizza-size__pizza__line"></div>
            </div>
          </div>
          {`${capitalise(size)} (${INCHES[i]})`}
        </label>
      )}
    </div>
  }
})

export default PizzaSize
