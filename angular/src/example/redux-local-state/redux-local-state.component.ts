import { Component, OnInit } from '@angular/core';


const counter = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
};

@Component({
  selector: 'app-redux-local-state',
  templateUrl: './redux-local-state.component.html',
  styleUrls: ['./redux-local-state.component.css']
})
export class ReduxLocalStateComponent implements OnInit {

  constructor() { }

  /* local state with out redeux pattern
     extract the logic below into redux pattern
     state, action, & reducer

  state = { value: 0 };
  increment = () => {
    this.setState(prevState => ({
      value: prevState.value + 1
    }));
  }

  decrement = () => {
    this.setState(prevState => ({
      value: prevState.value - 1
    }));
  }
  */

  state = counter(undefined, {});
  ngOnInit() {
  }

  dispatch(action) {
    this.state = counter(this.state, action);
  }

  increment = () => {
    this.dispatch({ type: 'INCREMENT' });
  }

  decrement = () => {
    this.dispatch({ type: 'DECREMENT' });
  }

}
