class UserSplash extends React.Component {
  render() {
    return (
      <div className="user_splash">
        <div className="flexy">
          <div className="avatar">
            <img src={this.props.loggedUser.avatar}/>
          </div>
          <h3 className="user_welcome">{this.props.loggedUser.user_name}</h3>
          <button className="button is-info" onClick={() => this.props.changePage("postForm")}>Create New Post</button>
        </div>
      </div>
    )
  }
}
