class PostShow extends React.Component {
  render() {
    return (
      <div className="post">
        <div className="one_post">
          <div className="content">
            <h3><b>Content: </b>{this.props.post.post_content}</h3>
            <h3 ><b>Post Image: </b><img src={this.props.post.image}/></h3>
          </div>
          {/* If the user created this post, then allow them to edit it */}
          {
            this.props.post.user_id == this.props.loggedUser.id ?
              <span>
                <button className="button is-warning">Edit Post</button>
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
                <button className="button is-link">Comment</button>
              </div>
            : ''
          }
          <div className="user">
            <div className="avatar"><img src={this.props.post.avatar}/></div>
            <h3>{this.props.post.user_name}</h3>
          </div>
          <hr />
        </div>
      </div>
    )
  }
}
