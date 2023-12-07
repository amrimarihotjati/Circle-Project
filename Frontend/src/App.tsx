import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import DetailThreads from "./components/DetailThreads";
import Layout from "./layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SearchUser from './pages/SearchUser';
// import { useSelector } from 'react-redux';
// import { RootState } from '../src/store/type/RootState';
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { API, setAuthToken } from './libs/Api';
import { AUTH_CHECK, AUTH_ERROR } from './store/rootReducer';
import Profile from './pages/Profile';
import Follow from './pages/Follow';



function App() {

  // const auth = useSelector((state: RootState) => state.auth);
  // console.log(auth);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // function authCheck
  const authCheck = async () => {
    try {
      setAuthToken(localStorage.token);
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data.user));
      setIsLoading(false);
    } catch (error) {
      dispatch(AUTH_ERROR());
      console.log("auth check error");
      setIsLoading(false);
      navigate("/auth/login");
    }
  };

  console.log(localStorage.token);

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Private Root
  function IsNotLogin() {
    if (!localStorage.token) {
      return <Navigate to="/auth/login" />; //gagalLogin
    } else {
      return <Layout />; //berhasilLogin
    }
  }

  return (
    <>
      {isLoading ? null : (
        <Routes>

          <Route path='/' element={<IsNotLogin />}>
            <Route path='/' element={<Home />} />
            <Route path='threads/:id' element={<DetailThreads />} />
            <Route path='/search' element={<SearchUser />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/follow' element={<Follow />} />
          </Route>

          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/register' element={<Register />} />

        </Routes>

      )}

    </>
  );
}

export default App

