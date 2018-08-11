//The App class holds all the functionality and control of the Quitter App
//Including the state, which contains if the user is logged in, what page they're view, etc.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        userLogin: false,
        userRegister: false,
        userShow: false,
        postList: true

      }, //End of this.state.page
      //The current logged in user, if there is one
      loggedUser: null
    } //End of this.state
    //Function Bindings
    this.changePage = this.changePage.bind(this);
    this.createUser = this.createUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }//End of Constructor

  //Function used to load things on page load
  // Currently used for testing
  componentDidMount() {
    // this.changePage("pageUserRegister");
  }

  //Function used to change what section is being displayed (newPage is the new section to be displayed)
  //Function takes all the keys in this.state.page and sets them to false
  //Then it takes the parameter key (newPage) and sets it to be true
  //The state is then updated
  //The function is designed to support being scaled up indefinately
  changePage (newPage) {
    let toUpdate = {};
    for(let key in this.state.page){
      toUpdate[key] = false;
    }
    toUpdate[newPage] = true;
    this.setState({page: toUpdate })
  }

  //Function creates a new user in the database
  //Function makes a POST request to the server
  //If successful it logs the returned user into the state creating a session
  //Logged in users are then brought back to the main page (postList)
  createUser(new_user){
    fetch("/users", {
      body: JSON.stringify(new_user),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdUser => {
      return createdUser.json()
    })
    .then(jsonedUser => {
      this.setUser(jsonedUser);
      this.changePage("postList");
    })
    .catch(error => console.log(error));
  }

  //Function creates a session by saving the user information in the current state
  //Function changes the password to 'Nice Try' for protection before setting the state
  //this.state.loggedUser is used for user functionality (only logged in users can post, for example)
  setUser(new_user){
    if(new_user != null){
      new_user["password"] = "Nice Try";
    }

    this.setState({loggedUser: new_user});
  }

  //Function destroys current sesison
  //Function sets the currently logged in user to null, thus destorying the session
  logOut(){
    this.setUser(null);
  }

  //Function calls the server to login user
  //Currently the server automatically logs the user in as the first user ID until further updated
  loginUser(new_user){
    console.log("Logging In User");
    console.log(new_user);
    fetch("/users/1")
      .then(response => response.json())
        .then(logged_user => {
          this.setUser(logged_user);
          this.changePage("postList");
        }).catch(error => console.log(error));
  }

  //Render to the browser
  render() {
    return (
      <div className="container">
      {/* A Nav Bar that will be stuck to the top of the page */}
        <NavBar
          changePage={this.changePage}
          loggedUser={this.state.loggedUser}
          logOut={this.logOut}/>
        {/* Conditionals that display the rest of the website's content */}
        {/*Post Listing Section (Default Main Page)*/}
        {
          this.state.page.postList ?
            <PostList />
          : ''
        }
        {/*User Registration Section*/}
        {
          this.state.page.userRegister ?
            <UserForm
              login={false}
              functionExecute={this.createUser}
              title="Register User"/>
          : ''
        }
        {/*User Login Section*/}
        {
          this.state.page.userLogin ?
            <UserForm
              login={true}
              functionExecute={this.loginUser}
              title="User Login"/>
          : ''
        }
        {/* User Show Page */}
        {
          this.state.page.userShow ?
            <UserShow />
          : ''
        }
      </div>
    )
  }
}

//Send to index.html
ReactDOM.render(
  <App />,
  document.querySelector("main")
);
