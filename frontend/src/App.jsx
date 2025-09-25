import { createContext, useState, useEffect } from 'react';
import MyRoutes from './components/MyRoutes';
import NavBar from './components/NavBar';

export let GlobalVariableContext = createContext();

function App() {
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    profession: "",
    description: "",
    question1: ""
  });
  const [majorProblem, setMajorProblem] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div>
      <GlobalVariableContext.Provider value={{ token, setToken, formData, setFormData, majorProblem, setMajorProblem }}>
        <NavBar />
        <MyRoutes />
      </GlobalVariableContext.Provider>
    </div>
  );
}

export default App;
