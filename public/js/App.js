//The App class holds all the functionality and control of the Quitter App
//Including the state, which contains if the user is logged in, what page they're view, etc.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        userLogin: false,
        userRegister: false,
        postList: false,
        testUserForm: false,
        testUserList: false,
        testUserShow: true

      }, //End of this.state.page
      loggedUser: {}
    } //End of this.state
    //Function Bindings
    this.changePage = this.changePage.bind(this);
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

  //Render to the browser
  render() {
    return (
      <div className="container">
        <NavBar changePage={this.changePage}/>
        {
          this.state.page.testUserForm ?
            <UserForm />
          : ''
        }
        {
          this.state.page.testUserList ?
            <UserList />
          : ''
        }
        {
          this.state.page.testUserShow ?
            <UserShow />
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
