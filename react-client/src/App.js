// import logo from './logo.svg';
import './App.css';
// import $ from 'jquery';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "jquery/dist/jquery.min.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/js/dist/collapse";
import NavBar from './Components/NavBar';
import { BrowserRouter , Route ,Switch,useHistory} from 'react-router-dom';
import Home from './screens/app/Home';
import Profile from './screens/app/Profile';
import Signin from './screens/auth/Signin';
import Signup from './screens/auth/Signup';
import CreatePost from './screens/app/CreatePost';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { userReducer,initiallState } from './reducers/user.reducer'
import UserProfile from './screens/app/UserProfile';

export const UserContext = createContext()


const Routing = () =>{
  const history = useHistory();
  const userContext = useContext(UserContext);
  useEffect(()=>{
    console.log(userContext,'*************************8');
    const token = localStorage.getItem('jwt');
    const user = localStorage.getItem('user');
    if (user && token) {
      userContext.dispath({type:'user',payload:JSON.parse(user)});
    }else{
      history.push('/signin')
    }
  },[])
  return (
    <Switch>
      <Route exact path = '/'>
        <Home />
      </Route>
      <Route exact path = '/profile'>
      <Profile />
      </Route>
      <Route path = '/signin'>
        <Signin />
      </Route>
      <Route path = '/signup'>
        <Signup />
      </Route>
      <Route path = '/create'>
        <CreatePost />
      </Route>
      <Route path = '/profile/:id'>
        <UserProfile />
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispath] = useReducer(userReducer,initiallState)
  return (
    <UserContext.Provider value={{state,dispath}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
