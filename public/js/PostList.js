//Class PostList is used to display all the posts on the main section of the website
class PostList extends React.Component {
  constructor(props){
    super(props);
    this.clickedUser = this.clickedUser.bind(this);
  }

  componentDidMount(){
    window.scrollTo(0, 0);
  }

  clickedUser(id){
    fetch('/users/' + id)
      .then(response => response.json())
        .then(user => {
          console.log(this.props)
          this.props.changeSelectedUser(user)
          this.props.changePage("userShow");
        }).catch(error => console.log(error))
  }


  render() {
    return (
      <div className="post">
        {this.props.posts.map((post, index) => {
          return (
            <div className="one_post">
              <div className="user">
                <div onClick={()=>{
                  this.clickedUser(post.user_id)
                }} className="avatar"><img src={post.avatar}/></div>
                <h3>{post.user_name}</h3>
              </div>
              <div
                className="content"
                onClick={() => {
                  this.props.selectPost(post, index)}}>
                <h3>{post.post_content}</h3>
                <h3><img src={post.image}/></h3>
                <h2>{post.likes_amount} Likes</h2>
              </div>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}
