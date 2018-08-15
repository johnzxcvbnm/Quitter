//UserShow shows a user specific page
//Should be dynamic to show either the logged in user page or anyones user page
class UserShow extends React.Component {
  render() {
    return (
      <div className="user_show">
          <h1 className="user_welcome">Welcome to Quitter, {this.props.selectedUser.user_name}</h1>
          <img className="user_pic" src={this.props.selectedUser.avatar}/>
          {
            (this.props.selectedUser == this.props.loggedUser)?
              <button className="button is-info" onClick={() => this.props.changePage("userEdit")}>Edit User</button>
            : ''
          }
          <div className="user_posts">
            {this.props.selectedUser.posts.map((post, index) => {
              return (
                <div className="one_post">
                  <div className="content">
                    <p>{post.post_content}</p>
                    <img src={post.img}/>
                  </div>
                </div>
              )}
            )}
            </div>
            <div className="user_comments">
              <h1>Comments</h1>
              {this.props.selectedUser.comments.map((comment, index) => {
                return (
                  <div className="one_comment">
                    <div className="content">
                      {console.log({comment})}
                      <p>{comment.comment_content}</p>
                      <img src={comment.img}/>
                    </div>
                  </div>
                )}
          )}
          </div>
      </div>
    )}
  }
