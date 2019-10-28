import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/scan';

/*
interface Action {
  type: string;
  payload?: any;
}

const incrementAction: Action = { type: 'INCREMENT' };
const decrementAction: Action = { type: 'DECREMENT' };

interface Reducer<T> {
  (state: T, action: Action): T;
}
type Reducer<T> = (state: T, action: Action) => T;
const reducer: Reducer<number> = (state: number, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'PLUS':
      return state + action.payload;
    default:
      return state;
  }
};

//self subscrible implementation
interface ListenerCallback {
  (): void;
}
interface UnsubscribeCallback {
  (): void;
}
class Store<T> {
  private _state: T;
  private _listeners: ListenerCallback[] = [];

  constructor(
    private reducer: Reducer<T>,
    initialState: T
  ) {
    this._state = initialState;
  }

  getState(): T {
    return this._state;
  }

  dispatch(action: Action): void {
    this._state = this.reducer(this._state, action);
    this._listeners.forEach((listener: ListenerCallback) => listener());
  }

  subscribe(listener: ListenerCallback): UnsubscribeCallback {
    this._listeners.push(listener);
    return () => { // returns an "unsubscribe" function
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }
}



console.log(reducer(0, incrementAction)); // -> 1
console.log(reducer(1, incrementAction)); // -> 2
console.log(reducer(100, decrementAction)); // -> 99

console.log(reducer(3, { type: 'PLUS', payload: 7 }));    // -> 10
console.log(reducer(3, { type: 'PLUS', payload: 9000 })); // -> 9003
console.log(reducer(3, { type: 'PLUS', payload: -2 }));   // -> 1


// create a new store
const store = new Store<number>(reducer, 0);
console.log(store.getState()); // -> 0

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // -> 1

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // -> 2

store.dispatch({ type: 'DECREMENT' });
console.log(store.getState()); // -> 1

// subscribe
const unsubscribe = store.subscribe(() => {
  console.log('subscribed: ', store.getState());
});

store.dispatch({ type: 'INCREMENT' }); // -> subscribed: 1
store.dispatch({ type: 'INCREMENT' }); // -> subscribed: 2

unsubscribe();
store.dispatch({ type: 'DECREMENT' }); // (nothing logged)

// decrement happened, even though we weren't listening for it
console.log(store.getState()); // -> 1
*/


interface Action {
  type: string;
  payload?: any;
}

type Reducer<T> = (state: T, action: Action) => T;

/* Angular EventEmitter is a wraper of RxJs Subject
   the EventEmitter.emit method is same as Subject.emit method
   */
class Store<T> extends BehaviorSubject<T> {
  private _dispatcher: Subject<Action>;

  constructor(
    private _reducer: Reducer<T>,
    initialState: T
  ) {
    super(initialState);

    this._dispatcher = new Subject<Action>();
    this._dispatcher
      .scan(
        (state: T, action: Action) => this._reducer(state, action),
        initialState)
      .subscribe((state) => super.next(state));
  }

  getState(): T {
    return this.value;
  }

  dispatch(action: Action): void {
    this._dispatcher.next(action);
  }
}

// same reducer as before (!)
const reducer: Reducer<number> = (state: number, action: Action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'PLUS':
      return state + action.payload;
    default:
      return state;
  }
};

// create a new store
console.log('-- store --');
const store = new Store<number>(reducer, 0);
console.log(store.getState()); // -> 0

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // -> 1

store.dispatch({ type: 'INCREMENT' });
console.log(store.getState()); // -> 2

store.dispatch({ type: 'DECREMENT' });
console.log(store.getState()); // -> 1

// observing!
console.log('-- store2 --');
const store2 = new Store<number>(reducer, 0);
store2.subscribe((newState => console.log('state: ', newState))); // -> state: 0
store2.dispatch({ type: 'INCREMENT' }); // -> state: 1
store2.dispatch({ type: 'INCREMENT' }); // -> state: 2
store2.dispatch({ type: 'DECREMENT' }); // -> state: 1

@Component({
  selector: 'app-redux-global-state',
  templateUrl: './redux-global-state.component.html',
  styleUrls: ['./redux-global-state.component.css']
})
export class ReduxGlobalStateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
