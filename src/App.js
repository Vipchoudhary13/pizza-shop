import logo from "./logo.svg";
import "./App.css";
import "./styles/style.css";
import OrderForm from "./components/OrderForm";
import PizzaDisplay from "./components/PizzaDisplay";

function App() {
  return (
    <div className="App">
      <OrderForm />
      <hr/>
      <PizzaDisplay />
    </div>
  );
}

export default App;
