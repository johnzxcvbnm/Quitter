//UserShow shows a user specific page
//Should be dynamic to show either the logged in user page or anyones user page
class UserShow extends React.Component {
  render() {
    return (
      <div>
        <h1>This is the UserShow Page</h1>
        <h2>User Name: {this.props.selectedUser.user_name}</h2>
        <h2>Password: {this.props.selectedUser.password}</h2>
        <h2>Avatar: {this.props.selectedUser.avatar}</h2>
        {/* If the selectedUser is also the loggedUser then allow them to edit their user information */}
        {
          (this.props.selectedUser == this.props.loggedUser)?
            <button className="button is-link" onClick={() => this.props.changePage("userEdit")}>Edit User</button>
          : ''
        }
      </div>
    )
  }
}
