class PostList extends React.Component {
  render() {
    return (
      <div className="post">
        <h1>Post List Page</h1>
        {this.props.posts.map((post, index) => {
          return (
            <div className="one_post">
              <div className="content">
                <h3><b>Content: </b>{post.post_content}</h3>
                <h3 ><b>Post Image: </b><img src={post.image}/></h3>
              </div>
              {/* If the user created this post, then allow them to edit it */}
              {
                post.user_id == this.props.loggedUser.id ?
                  <span>
                    <button className="button is-warning">Edit Post</button>
                    <button
                      className="button is-danger"
                      onClick={() => this.props.deletePost(post, index)}>
                        Delete Post
                    </button>
                  </span>
                : ''
              }
              {
                this.props.loggedUser.id != 0 ?
                  <div className="buttons">
                    <button className="button is-link">Like</button>
                    <button className="button is-link">Comment</button>
                  </div>
                : ''
              }
              <div className="user">
                <div className="avatar"><img src={post.avatar}/></div>
                <h3>{post.user_name}</h3>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}
