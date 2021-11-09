import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const userContext = useContext(UserContext);
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom px-5">
        <Link class="navbar-brand" to={userContext.state?"/":'/signin'}>
          <h1 className='display-6 fw-bold'>Chatify</h1>
        </Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto">
           {userContext.state?null:<Link class="nav-item nav-link mx-3" to="/signup">Sign up</Link>}
           {userContext.state?null:<Link class="nav-item nav-link mx-3" to="/signin">Sign In</Link>}
            {userContext.state?<Link class="nav-item nav-link mx-3" to="/profile">Profile</Link>:null}
           {userContext.state? <Link class="nav-item nav-link mx-3" to="/create">create post</Link>:null}
           {userContext.state? <Link class="nav-item nav-link mx-3" to="/signin">
           <button 
            onClick={()=>{
              localStorage.clear()
              userContext.dispath({type:'clear'})
            }}
            className="btn waves-effect waves-light #1e88e5 blue darken-1 text-light">
                Logout
            </button>
           </Link>:null}
          </div>
        </div>
      </nav>
    );
}

export default NavBar;