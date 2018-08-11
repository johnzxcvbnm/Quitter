//The NavBar that will be stuck to the top of the page.
//NavBar uses the function changePage to change what page the user is currently viewing
class NavBar extends React.Component {
  render () {
    return (
      <div className="columns">
        <div className="column is-3" onClick={() => this.props.changePage("postList")}>Logo</div>
        <div className="column" onClick={() => this.props.changePage("postList")}>Main</div>
        <div className="column" onClick={() => this.props.changePage("userLogin")}>Login</div>
        <div className="column" onClick={() => this.props.changePage("userRegister")}>Register</div>
        <div className="column" onClick={() => this.props.changePage("postList")}>Log Out</div>
      </div>
    )
  }
}
