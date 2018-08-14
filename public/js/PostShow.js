//Class PostShow is used to display all the information from a single post provided from the parent class
//PostShow is also where the user can EDIT or DELETE posts that they have made
class PostShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      commentField: false
    }
    this.toggleComments = this.toggleComments.bind(this);
  }

  toggleComments(){
    this.setState({ commentField: !this.state.commentField });
  }

  render() {
    console.log(this.props.post)
    return (
      <div className="post">
        <div className="one_post">
          <div className="content">
            <h3><b>Content: </b>{this.props.post.post_content}</h3>
            <h3 ><b>Post Image: </b><img src={this.props.post.image}/></h3>
            <h2>{this.props.post.likes_amount} Likes</h2>
          </div>
          <div className="user">
            <div className="avatar"><img src={this.props.post.avatar}/></div>
            <h3>{this.props.post.user_name}</h3>
          </div>
          {/* If the user created this post, then allow them to edit it */}
          {
            this.props.post.user_id == this.props.loggedUser.id ?
              <span>
                <button
                  className="button is-warning"
                  onClick={() => this.props.changePage("postEdit") }>
                    Edit Post
                </button>
                <button
                  className="button is-danger"
                  onClick={() => this.props.deletePost(this.props.post, this.props.postIndex)}>
                    Delete Post
                </button>
              </span>
            : ''
          }
          {
            this.props.loggedUser.id != 0 && this.props.post.user_id != -1 ?
              <div className="buttons">
                <button className="button is-link">Like</button>
                <button className="button is-link" onClick={this.toggleComments}>Comment</button>
              </div>
            : ''
          }
          <div className="post_comment_container">
          {this.props.post.comments.map((comment, index) => {
            return(
              <div><div className="post_comment">
              <p>{comment.comment_content}</p>
              </div>
              <div className="comment_avatar">
              <img src={comment.avatar}/>
              <h3>{comment.username}</h3>
              </div>
              <br/>
              </div>
          )}
        )}
        </div>
          {/* Comment Field to allow a users to add comments to the post */}
          {
            this.state.commentField ?
              <CommentForm
                post={this.props.post}
                loggedUser={this.props.loggedUser}
                functionExecute={this.props.commentFunctionExecute}
                closeComments={this.toggleComments}/>
            : ''
          }
          <hr />
        </div>
      </div>
    )
  }
}
