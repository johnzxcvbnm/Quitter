//UserShow shows a user specific page
//Should be dynamic to show either the logged in user page or anyones user page
class UserShow extends React.Component {
  render() {
    return (
      <div className="user_show">
          <h1 className="user_welcome">Welcome to Quitter, {this.props.selectedUser.user_name}</h1>
          <h2>Password: {this.props.selectedUser.password}</h2>
          <img className="user_pic" src={this.props.selectedUser.avatar}/>
          {this.props.selectedUser.posts.map((post, index) => {
            return (
              <div className="one_post">
                <div className="content">
                  {console.log({post})}
                  <p>{post.post_content}</p>
                  <img src={post.img}/>
                </div>
                <div className="user">
                  <div className="avatar"><img src={post.avatar}/></div>
                  <h3>{post.user_name}</h3>
                </div>
              </div>
            )
          })
          }
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
