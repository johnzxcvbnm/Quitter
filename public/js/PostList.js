class PostList extends React.Component {
  render() {
    return (
      <div>
        <h1>Post List Page</h1>
        {this.props.posts.map((post, index) => {
          return (
            <div>
              <h3><b>Posted By: </b>{post.user_name}</h3>
              <h3><b>Avatar: </b>{post.avatar}</h3>
              <h3><b>Content: </b>{post.post_content}</h3>
              <h3><b>Post Image: </b>{post.image}</h3>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}
