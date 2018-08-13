class PostList extends React.Component {
  render() {
    return (
      <div className="post">
        {this.props.posts.map((post, index) => {
          return (
            <div className="one_post">
              <div
                className="content"
                onClick={() => {
                  this.props.selectPost(post, index)}}>
                <h3><b>Content: </b>{post.post_content}</h3>
                <h3 ><b>Post Image: </b><img src={post.image}/></h3>
              </div>
              {/* If the user is logged in and the post is not the default post enable like and comment buttons*/}
              {
                this.props.loggedUser.id != 0 && post.user_id != -1 ?
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
