import './PizzaViewer.scss'

import classNames from 'classnames'
import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

/*
  animations: [
    trigger(
      'drop', [
        transition(':enter', [
          style({transform: 'translateY(-200px)', opacity: 0}),
          animate('300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', 'opacity': 1}),
          animate('200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)', style({transform: 'translateY(-200px)', opacity: 0}))
        ])
      ]
    )
  ]
*/

let PizzaViewer = React.createClass({
  render() {
    let {activePizza, pizzas} = this.props
    return <div>
      <div class="pizza-viewer">
        <div class="pizza-viewer__table-side"></div>
        <div class="pizza-viewer__table"></div>

        {activePizza}

        {pizzas.map((pizza, i) =>
          <div key={pizza._key} class={classNames('pizza', {'pizza--active': activePizza === i})}>
            <div class="pizza__board"></div>
            <div class="pizza__base"></div>

            <div class="pizza__toppings">
              <ReactCSSTransitionGroup
                transitionName={{
                  enter: 'pizza__topping--enter',
                  leave: 'pizza__topping--leave',
                }}
                transitionEnterTimeout={300}
                transitionLeaveTimeout={200}>
                {pizza.toppings.map((topping, i) =>
                  <div key={topping} style={{zIndex: i}}>
                    <div class={`pizza__topping pizza__topping--${topping}`}/>
                    <div class={`pizza__topping pizza__topping--${topping}`}/>
                    <div class={`pizza__topping pizza__topping--${topping}`}/>
                    <div class={`pizza__topping pizza__topping--${topping}`}/>
                    <div class={`pizza__topping pizza__topping--${topping}`}/>
                  </div>
                )}
              </ReactCSSTransitionGroup>
            </div>
          </div>
        )}
      </div>
    </div>
  }
})

export default PizzaViewer
