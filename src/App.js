import './App.scss'

import React from 'react'

import PizzaCreator from './PizzaCreator'
import PizzaViewer from './PizzaViewer'
import Summary from './Summary'

let App = React.createClass({
  getInitialState() {
    return {
      activePizza: 0,
      details: {
        name: '',
        email: '',
        confirm: '',
        phone: '',
        address: '',
        postcode: '',
      },
      errors: {},
      touched: {},
      pizzas: [],
      valid: false,
    }
  },

  handleBlur(e) {
    let {name, value} = e.target
    if (!this.state.touched[name]) {
      let stateChange = {touched: {...this.state.touched, [name]: true}}
      if (!value) {
        stateChange.errors = {...this.state.errors, [name]: 'Field is required'}
      }
      this.setState(stateChange)
    }
  },
  handleChange(e) {
    let {name, value} = e.target
    let details = {...this.state.details, [name]: value}
    let errors = {...this.state.errors, [name]: value ? null : 'Field is required'}
    if ((name === 'address' || name === 'postcode') &&
        value && value.length < 3) {
      errors[name] = 'Min of 3 characters'
    }
    if ((name === 'email' || name === 'confirm') &&
        details.email && details.confirm) {
      errors.confirm = details.email !== details.confirm ? 'Emails must match' : null
    }
    let valid = (
      Object.keys(this.state.touched).length === 6 &&
      Object.keys(errors).filter(name => !!errors[name]).length === 0
    )

    this.setState({details, errors, valid})
  },

  handlePizzaChange(name, value) {
    let {activePizza, pizzas} = this.state
    pizzas = pizzas.slice()
    pizzas[activePizza] = {...pizzas[activePizza], [name]: value}
    this.setState({pizzas})
  },
  handleAddPizza() {
    let pizzas = this.state.pizzas.concat({
      _key: Date.now(),
      size: 'small',
      toppings: [],
    })
    this.setState({activePizza: pizzas.length - 1, pizzas})
  },
  handleChangeActivePizza(index) {
    this.setState({activePizza: index})
  },
  handleRemovePizza(index) {
    let stateChange = {pizzas: this.state.pizzas.filter((_, i) => i !== index)}
    if (index === this.state.pizzas.length - 1) {
      stateChange.activePizza = index - 1
    }
    this.setState(stateChange)
  },

  render() {
    let {
      activePizza, pizzas,
      errors, touched, valid,
    } = this.state
    return <div class="app">
      <div class="form">
        <PizzaViewer pizzas={pizzas} activePizza={activePizza}/>
        <div class="order">
          <form noValidate>
            <h2>Enter your details</h2>
            <div class="section">
              <div class="input">
                <label>
                  Name <span class="required">*</span>
                  {errors.name && touched.name &&
                    <span class="error">{errors.name}</span>
                  }
                </label>
                <input
                  name="name" type="text" placeholder="John Smith"
                  onChange={this.handleChange} onBlur={this.handleBlur}
                />
              </div>
              <div class="input">
                <label>
                  Email <span class="required">*</span>
                  {errors.email && touched.email &&
                    <span class="error">{errors.email}</span>
                  }
                </label>
                <input
                  name="email" type="email" placeholder="john@hungry.me"
                  onChange={this.handleChange} onBlur={this.handleBlur}
                />
              </div>
              <div class="input">
                <label>
                  Confirm email <span class="required">*</span>
                  {errors.confirm && touched.confirm &&
                    <span class="error">{errors.confirm}</span>
                  }
                </label>
                <input
                  name="confirm" type="email" placeholder="Confirm email"
                  onChange={this.handleChange} onBlur={this.handleBlur}
                />
              </div>
            </div>
            <div class="section">
              <div class="input">
                <label>
                  Address <span class="required">*</span>
                  {errors.address && touched.address &&
                    <span class="error">{errors.address}</span>
                  }
                </label>
                <input
                  name="address" type="text" placeholder="44 Pizza Street"
                  onChange={this.handleChange} onBlur={this.handleBlur}
                />
              </div>
              <div class="input">
                <label>
                  Post Code <span class="required">*</span>
                  {errors.postcode && touched.postcode &&
                    <span class="error">{errors.postcode}</span>
                  }
                </label>
                <input
                  name="postcode" type="text" placeholder="PI3 3AS"
                  onChange={this.handleChange} onBlur={this.handleBlur}
                />
              </div>
              <div class="input">
                <label>
                  Contact Number <span class="required">*</span>
                  {errors.phone && touched.phone &&
                    <span class="error">{errors.phone}</span>
                  }
                </label>
                <input
                  name="phone" type="text" placeholder="01234 567 890"
                  onChange={this.handleChange} onBlur={this.handleBlur}
                />
              </div>
            </div>
            <PizzaCreator
              activePizza={activePizza}
              pizzas={pizzas}
              onAdd={this.handleAddPizza}
              onChange={this.handlePizzaChange}
              onRemove={this.handleRemovePizza}
              onToggle={this.handleChangeActivePizza}
            />

            <h2>Order Summary</h2>

            <Summary pizzas={pizzas} valid={valid}/>
          </form>
        </div>
      </div>
    </div>
  }
})

export default App
