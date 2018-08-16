//Class PostShow is used to display all the information from a single post provided from the parent class
//PostShow is also where the user can EDIT or DELETE posts that they have made
class PostShow extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      commentField: false,
      clickedUser: null,
      selectedComment: null,
      didLike: false,
      selectedLike: {}
    }
    this.toggleComments = this.toggleComments.bind(this);
    this.selectComment = this.selectComment.bind(this);
    this.findLike = this.findLike.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
    this.clickedUser = this.clickedUser.bind(this);
  }

  // Function jumps the user to the top of the page (where the post is)
  componentDidMount(){
    window.scrollTo(0, 0);
    this.findLike();
  }

  toggleLike(){
    this.setState({ didLike: !this.state.didLike })
  }

  clickedUser(id){
    fetch('/users/' + id)
      .then(response => response.json())
        .then(user => {
          this.props.changeSelectedUser(user)
          this.props.changePage("userShow");
        }).catch(error => console.log(error))
  }


  findLike() {
    for(let i of this.props.post.likes){
      // console.log(i);
      if(i.user_id === this.props.loggedUser.id){
        this.toggleLike();
        this.setState({ selectedLike: i });
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
    // console.log(this.props)
    return (
      <div className="post">
        <div className="one_post">
          <div className="content">

            <h3>{this.props.post.post_content}</h3>
            <h3><img src={this.props.post.image}/></h3>
            <h2>{this.props.post.likes_amount} Likes</h2>
          </div>
          <div className="buttons">
            {/* If the user is logged in, allow them to like/comment the post */}
            {
              this.props.loggedUser.id != 0 && this.props.post.user_id != -1 && !(this.state.didLike) ?
                <button className="button is-info" onClick={() => {this.toggleLike(); this.props.addLike();}}>Like Post</button>
              : ''
            }
            {
              this.props.loggedUser.id != 0 && this.props.post.user_id != -1 && (this.state.didLike) ?
                <button className="button is-light" onClick={() => {this.props.removeLike(this.state.selectedLike); this.toggleLike();}}>Remove Like</button>
              : ''
            }
            {
              this.props.loggedUser.id != 0 && this.props.post.user_id != -1 ?
                <button className="button is-info" onClick={() => { this.selectComment(null);  this.toggleComments();}}>Add Comment</button>
              : ''
            }
            {/* If the user created this post, then allow them to edit it */}
            {
              this.props.post.user_id == this.props.loggedUser.id ?
                  <button
                    className="button is-info"
                    onClick={() => this.props.changePage("postEdit") }>
                      Edit Post
                  </button>
              : ''
            }
            {
              this.props.post.user_id == this.props.loggedUser.id ?
                <button
                  className="button is-dark"
                  onClick={() => this.props.deletePost(this.props.post, this.props.postIndex)}>
                    Delete Post
                </button>
              : ''
            }
          </div>
          <div className="user">
            <
            div onClick={() => {
              this.clickedUser(this.props.post.user_id);
            }}
              className="avatar"
            >
              <img src={this.props.post.avatar}/></div>
            <h3>{this.props.post.user_name}</h3>
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
