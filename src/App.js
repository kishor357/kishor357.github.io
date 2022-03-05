import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewTaskManager from "./components/ViewTaskManager";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";

function App() {
  return (
    <>
      <Router>
        <div>
        <Routes>
        <Route path="/" element={<ViewTaskManager />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/editTask" element={<EditTask />} />

        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
