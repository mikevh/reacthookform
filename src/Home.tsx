import { useReducer } from "react";

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const Home = () => {

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h1>Home</h1>
      <p>You are logged in.</p>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        Decrement
      </button>
    </div>
  );
};

export default Home;
