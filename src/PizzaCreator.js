import './PizzaCreator.scss'

import classNames from 'classnames'
import React from 'react'

import PizzaSize from './PizzaSize'
import PizzaToppings from './PizzaToppings'

let PizzaCreator = React.createClass({
  componentDidMount() {
    this._handlers = {}
    this.props.onAdd()
  },

  handleChange(name) {
    if (!this._handlers[name]) {
      this._handlers[name] = (value) => this.props.onChange(name, value)
    }
    return this._handlers[name]
  },
  handleRemove(e, index) {
    e.stopPropagation()
    this.props.onRemove(index)
  },
  handleToggle(index) {
    this.props.onToggle(this.props.activePizza === index ? -1 : index)
  },

  render() {
    let {activePizza, pizzas} = this.props
    return <div class="pizza-creator">
      <h2>
        Choose your pizzas

        <button type="button" class="button" onClick={this.props.onAdd}>
          <i class="fa fa-plus"></i>
          Add another pizza
        </button>
      </h2>

      {pizzas.map((pizza, i) =>
        <div key={pizza._key}>
          <div class="pizza-creator__header" onClick={() => this.handleToggle(i)}>
            <i class={classNames('fa fa-fw pizza-creator__icon', {
              'fa-chevron-down': activePizza !== i,
              'fa-chevron-up': activePizza === i,
            })}/>
            Pizza {i + 1}

            {/*
            <i class="fa fa-fw pizza-creator__status"
               [class.fa-check]="pizza.valid"
               [class.fa-times]="pizza.invalid"></i>
            */}

            {pizzas.length > 1 &&
              <div
                class="pizza-creator__delete"
                onClick={(e) => this.handleRemove(e, i)}>
                <i class="fa fa-trash fa-fw"></i>
              </div>
            }
          </div>
          <div class={classNames('pizza-creator__content', {
            'pizza-creator__content--open': activePizza === i,
          })}>
            <h3>Select the size <span class="required">*</span></h3>
            <PizzaSize
              value={pizza.size}
              onChange={this.handleChange('size')}
            />

            <h3>Pick your toppings</h3>
            <PizzaToppings
              value={pizza.toppings}
              onChange={this.handleChange('toppings')}
            />
          </div>
        </div>
      )}
    </div>
  }
})

export default PizzaCreator
