//The NavBar that will be stuck to the top of the page.
//NavBar uses the function changePage to change what page the user is currently viewing
class NavBar extends React.Component {
  render () {
    return (
      <div className="nav">
        <div className="columns">
          <div className="column is-8" onClick={() => this.props.changePage("postList")}><img src="/images/quitter_logo.png"/>
                <p className="nav_hover">uitter</p></div>
          {/* If the user IS logged in, display their name (link it to their user page) and Log Out (deletes current user session) */}
          {/* If the user is NOT logged in, display links to register (create new user) and login (login existing user) and create a new session */}
          {
            this.props.loggedUser ?
              <div className="column"
                   onClick={() => {
                     this.props.changeSelectedUser(this.props.loggedUser);
                     this.props.changePage("userShow");}}>
                <p className="nav_hover">{this.props.loggedUser.user_name}</p>
              </div>
            :
              <div className="column" onClick={() => this.props.changePage("userLogin")}><p className="nav_hover">Log In</p></div>
          }
          {
            this.props.loggedUser ?
              <div
                className="column"
                onClick={() => {
                    this.props.logOut();
                    this.props.changePage("postList"); }}>
                <p className="nav_hover">Log Out</p>
              </div>
            :
              <div className="column" onClick={() => this.props.changePage("userRegister")}><p className="nav_hover">Register</p></div>
          }
        </div>
      </div>
    )
  }
}
