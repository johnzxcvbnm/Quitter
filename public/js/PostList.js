class PostList extends React.Component {
  render() {
    return (
      <div>
        <h1>Post List Page</h1>
        {this.props.posts.map((post, index) => {
          return (
            <div>
              <h3><b>Posted By: </b>{post.user_name}</h3>
              <h3><b>Avatar: </b>Avatar</h3>
              <h3><b>Content: </b>{post.post_content}</h3>
              <h3><b>Post Image: </b>Image</h3>
              {/* If the user created this post, then allow them to edit it */}
              {
                post.user_id == this.props.loggedUser.id ?
                  <span>
                    <button className="button is-warning">Edit Post</button>
                    <button className="button is-danger">Delete Post</button>
                  </span>
                : ''
              }
              {
                this.props.loggedUser.id != 0 ?
                  <span>
                    <button className="button is-link">Like</button>
                    <button className="button is-link">Comment</button>
                  </span>
                : ''
              }
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}
