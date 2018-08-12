class UserSplash extends React.Component {
  render() {
    return (
      <div>
        <h1>This is the UserSplash section for {this.props.loggedUser.user_name}!</h1>
      </div>
    )
  }
}
