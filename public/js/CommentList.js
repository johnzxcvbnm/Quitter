class CommentList extends React.Component {
  render() {
    return (
      <div className="post_comment_container">
        {this.props.post.comments.map((comment, index) => {
          return(
            <div>
              <div className="post_comment">
                <p>{comment.comment_content}</p>
              </div>
              {/* Edit and Delete */}
              {
                this.props.loggedUser.user_name == comment.username ?
                  <div className="buttons">
                    <button className="button is-info add_top_margin" onClick={() => { this.props.selectComment(comment);}}>Edit Comment</button>
                    <button className="button is-dark add_top_margin" onClick={() => this.props.deleteComment(comment)}>Delete Comment</button>
                  </div>
                : ''
              }
              <div className="comment_avatar">
                <img src={comment.avatar}/>
                <h3>{comment.username}</h3>
              </div>
              <br/>
            </div>
          )}
        )}
      </div>
    )
  }
}
