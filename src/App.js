import "./styles.css";
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import Footer from "./Components/Footer";
import About from "./Components/About";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import AddTaskForm from "./Components/AddTaskForm";
import Login from "./Components/Login";
import ShowContext from "./Components/Context";
import isloginContext from "./Components/Context";
import { createStore } from "redux";
import loginReducer from "./Redux";

export default function App() {
  const store = createStore(
    loginReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  const [login, setLogin] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      Name: "Check Emails",
      Day: "Jan 1st At 8AM",
      Reminder: true,
      Username: "Stark",
      Password: 1234
    },
    {
      id: 2,
      Name: "Attend The Meeting",
      Day: "Jan 1st At 11AM",
      Reminder: true,
      Username: "Mick",
      Password: 1234
    },
    {
      id: 3,
      Name: "Doctor Appointment",
      Day: "Jan 5th At 2PM",
      Reminder: false,
      Username: "John",
      Password: 1234
    }
  ]);
  const delTask = (id) => {
    //console.log("Delete: ", id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    //console.log("Toogle: ", id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, Reminder: !task.Reminder } : task
      )
    );
  };

  const AddTask = (task) => {
    //console.log(task);
    const id = Math.floor(Math.random() * 500) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  const Onlogin = (user) => {
    console.log(user);
    const isExists = tasks.filter(
      (task) => task.Username === user.uname && task.Password === user.password
    );
    console.log(isExists);
    if (isExists) {
      console.log("Logged in ");
    } else {
      console.log("Invalid Username or Password");
    }
  };

  return (
    <Router>
      <div className="container">
        <ShowContext.Provider value={showAddTask}>
          <isloginContext.Provider value={login}>
            <Header
              onBtnAdd={() => setShowAddTask(!showAddTask)}
              onloginClick={() => setLogin(!login)}
            />
          </isloginContext.Provider>
        </ShowContext.Provider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTaskForm onAdd={AddTask} />}
                {login && <Login onbtnlogin={Onlogin} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={delTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Task To Show"
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
