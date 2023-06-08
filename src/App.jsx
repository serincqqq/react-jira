import "./fontStyles.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
function App() {
  const element = useRoutes(routes);
  return (
    <div className="App">
      {element}
      {/* <Project></Project> */}
    </div>
  );
}

export default App;
