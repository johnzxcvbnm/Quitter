//UserShow shows a user specific page
//Should be dynamic to show either the logged in user page or anyones user page
class UserShow extends React.Component {
  render() {
    return (
      <div className="user_show">
        <h1>Welcome to Quitter, {this.props.selectedUser.user_name}</h1>
        <h2>Password: {this.props.selectedUser.password}</h2>
        <img src={this.props.selectedUser.avatar}/>
        {/* If the selectedUser is also the loggedUser then allow them to edit their user information */}
        {
          (this.props.selectedUser == this.props.loggedUser)?
            <button className="button is-link" onClick={() => this.props.changePage("userEdit")}>Edit User</button>
          : ''
        }
        {console.log(this.props.loggedUser)}
      </div>
    )
  }
}
