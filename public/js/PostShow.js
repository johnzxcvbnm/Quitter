//Class PostShow is used to display all the information from a single post provided from the parent class
//PostShow is also where the user can EDIT or DELETE posts that they have made
class PostShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      commentField: false,
      selectedComment: null,
      didLike: false
    }
    this.toggleComments = this.toggleComments.bind(this);
    this.selectComment = this.selectComment.bind(this);
    this.findLike = this.findLike.bind(this);
  }

  // Function jumps the user to the top of the page (where the post is)
  componentDidMount(){
    window.scrollTo(0, 0);
    this.findLike();
  }

  findLike() {
    for(let i of this.props.post.likes){
      // console.log(i);
      if(i.user_id === this.props.loggedUser.id){
        this.setState({didLike: true});
        // console.log("Found Like");
        return;
      }
    }
  }

  //Function updates the current state with the selected comment
  //Function is used for comment updates
  selectComment(comment){
    this.setState({ selectedComment: comment });
    this.toggleComments();
  }

  //Hide or Show the CommentForm
  toggleComments(){
    this.setState({ commentField: !this.state.commentField });
  }

  render() {
    // console.log(this.props.post)
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
          <div className="buttons">
            {/* If the user created this post, then allow them to edit it */}
            {
              this.props.post.user_id == this.props.loggedUser.id ?
                  <button
                    className="button is-warning"
                    onClick={() => this.props.changePage("postEdit") }>
                      Edit Post
                  </button>
              : ''
            }
            {
              this.props.post.user_id == this.props.loggedUser.id ?
                <button
                  className="button is-danger"
                  onClick={() => this.props.deletePost(this.props.post, this.props.postIndex)}>
                    Delete Post
                </button>
              : ''
            }
            {/* If the user is logged in, allow them to like/comment the post */}
            {
              this.props.loggedUser.id != 0 && this.props.post.user_id != -1 ?
                <button className="button is-link" onClick={this.props.addLike}>Like</button>
              : ''
            }
            {
              this.props.loggedUser.id != 0 && this.props.post.user_id != -1 ?
                <button className="button is-link" onClick={() => { this.selectComment(null);  this.toggleComments();}}>Comment</button>
              : ''
            }
          </div>
          {/* If the CommentField is hidden (default) then show the list of comments */}
          {
            !this.state.commentField ?
              <CommentList
                post={this.props.post}
                loggedUser={this.props.loggedUser}
                deleteComment={this.props.deleteComment}
                selectComment={this.selectComment}/>
            : ''
          }
          {/* When commentField is true, display the CommentForm (used for comment edit/create) */}
          {/* Comment Field to allow a users to add comments to the post */}
          {
            this.state.commentField ?
              <CommentForm
                post={this.props.post}
                loggedUser={this.props.loggedUser}
                functionExecute={this.props.commentFunctionExecute}
                functionExecute2={this.props.updateComment}
                closeComments={this.toggleComments}
                comment={this.state.selectedComment}/>
            : ''
          }
        </div>
      </div>
    )
  }
}
