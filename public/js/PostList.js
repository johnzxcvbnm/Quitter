//Class PostList is used to display all the posts on the main section of the website
class PostList extends React.Component {
  render() {
    return (
      <div className="post">
        {this.props.posts.map((post, index) => {
          return (
            <div className="one_post">
              <div className="user">
                <div className="avatar"><img src={post.avatar}/></div>
                <h3>{post.user_name}</h3>
              </div>
              <div
                className="content"
                onClick={() => {
                  this.props.selectPost(post, index)}}>
                <h3><b>Content: </b>{post.post_content}</h3>
                <h3 ><b>Post Image: </b><img src={post.image}/></h3>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}
