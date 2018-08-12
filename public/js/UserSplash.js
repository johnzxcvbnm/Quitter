class UserSplash extends React.Component {
  render() {
    return (
      <div className="user_splash">
        <h1>This is the UserSplash section for {this.props.loggedUser.user_name}!</h1>
        <button className="button is-link" onClick={() => this.props.changePage("postForm")}>New Post</button>
      </div>
    )
  }
}
