//The NavBar that will be stuck to the top of the page.
//NavBar uses the function changePage to change what page the user is currently viewing
class NavBar extends React.Component {
  render () {
    return (
      <div className="columns">
        <div className="column is-3" onClick={() => this.props.changePage("postList")}>Logo</div>
        <div className="column" onClick={() => this.props.changePage("postList")}>Main</div>
        {/* If the user IS logged in, display their name (link it to their user page) and Log Out (deletes current user session) */}
        {/* If the user is NOT logged in, display links to register (create new user) and login (login existing user) and create a new session */}
        {
          this.props.loggedUser ?
            <div className="column"
                 onClick={() => {
                   this.props.changeSelectedUser(this.props.loggedUser);
                   this.props.changePage("userShow");}}>
              {this.props.loggedUser.user_name}
            </div>
          :
            <div className="column" onClick={() => this.props.changePage("userLogin")}>Login</div>
        }
        {
          this.props.loggedUser ?
            <div
              className="column"
              onClick={() => {
                  this.props.logOut();
                  this.props.changePage("postList"); }}>
              Log Out
            </div>
          :
            <div className="column" onClick={() => this.props.changePage("userRegister")}>Register</div>
        }
      </div>
    )
  }
}
