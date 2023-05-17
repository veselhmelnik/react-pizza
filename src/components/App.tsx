import AppRoutes from "../routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
