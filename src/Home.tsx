import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "./state/store";
import { increment, decrement, incrementByAmount } from "./state/couter/counterSlice";

const Home = () => {

  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter);

  return (
    <div>
      <h1>Home</h1>
      <p>You are logged in.</p>
      <p>Count: {counter.count}</p>
      <button onClick={() => dispatch(increment())}>
        Increment
      </button>
      <button  onClick={() => dispatch(decrement())}>
        Decrement
      </button>
    </div>
  );
};

export default Home;
