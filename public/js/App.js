//The App class holds all the functionality and control of the Quitter App
//Including the state, which contains if the user is logged in, what page they're view, etc.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        userLogin: false,
        userRegister: false,
        postList: true

      }, //End of this.state.page
      loggedUser: {}
    } //End of this.state
    //Function Bindings
    this.changePage = this.changePage.bind(this);
    this.createUser = this.createUser.bind(this);
  }

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

  createUser(new_user){
    console.log("Creating New User");
    console.log(new_user);

  }

  //Render to the browser
  render() {
    return (
      <div className="container">
      {/* A Nav Bar that will be stuck to the top of the page */}
        <NavBar changePage={this.changePage}/>
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
              functionExecute={this.createUser}/>
          : ''
        }
        {/*User Login Section*/}
        {
          this.state.page.userLogin ?
            <UserForm
              login={true}/>
          : ''
        }
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector("main")
);
