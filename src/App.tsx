import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}></Route>
        <Route path="/" element={<Join/>}></Route>
        <Route path="/" element={<Login/>}></Route>
      </Routes>  
    </BrowserRouter>
  );
}

export default App;