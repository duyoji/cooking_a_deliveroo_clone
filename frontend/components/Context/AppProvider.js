import React from "react";
import Cookies from "js-cookie";
/* First we will make a new context */
const AppContext = React.createContext();

const COOKIE_KEY = 'cart';

/* Then create a provider Component */
class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      total: 0
    };
  }
  componentDidMount() {
    const cart = Cookies.getJSON( COOKIE_KEY );
    let total = 0;
    if (cart) {
      cart.forEach(item => {
        total += item.price * item.quantity;
      });
      this.setState({ items: cart, total: total });
    }
  }

  addItem = item => {
    let { items } = this.state;
    const newItem = items.find(i => i.id === item.id);

    if (!newItem) {
      item.quantity = 1;
      this.setState(
        {
          items: [...this.state.items, item],
          total: this.state.total + item.price
        },
        () => Cookies.set(COOKIE_KEY, this.state.items)
      );
    } else {
      this.setState(
        {
          items: this.state.items.map(
            item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
          ),
          total: this.state.total + item.price
        },
        () => Cookies.set(COOKIE_KEY, this.state.items)
      );
    }
  };
  removeItem = item => {
    let { items } = this.state;
    const newItem = items.find(i => i.id === item.id);
    if (newItem.quantity > 1) {
      this.setState(
        {
          items: this.state.items.map(
            item =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
          ),
          total: this.state.total - item.price
        },
        () => Cookies.set(COOKIE_KEY, this.state.items)
      );
    } else {
      const items = [...this.state.items];
      const index = items.findIndex(i => i.id === newItem.id);

      items.splice(index, 1);
      this.setState(
        { items, total: this.state.total - item.price },
        () => Cookies.set(COOKIE_KEY, this.state.items)
      );
    }
  };
  render() {
    return (
      <AppContext.Provider
        value={{
          items: this.state.items,
          addItem: this.addItem,
          removeItem: this.removeItem,
          total: this.state.total
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

/* then make a consumer which will surface it as an HOC */
// This function takes a component...
export function withContext(Component) {
  // ...and returns another component...
  return function ContextComponent(props) {
    // ... and renders the wrapped component with the context theme!
    // Notice that we pass through any additional props as well
    return (
      <AppContext.Consumer>
        {context => <Component {...props} context={context} />}
      </AppContext.Consumer>
    );
  };
}

export default AppProvider;
