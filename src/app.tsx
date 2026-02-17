import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import TaskDetail from "./screens/TaskDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<TaskDetail />} path="/task/:benchmark/:taskId" />
      </Routes>
    </BrowserRouter>
  );
}
