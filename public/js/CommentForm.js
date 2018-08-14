class CommentForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Function is used for editing comments
  //If a comment is passed to the form, prefill the input boxes
  componentDidMount() {
    if(this.props.comment){
      this.refs.comment_content.value = this.props.comment.comment_content;
      this.refs.image.value = this.props.comment.image;
    }
  }

  // Function is used to create/edit comments
  // Function first prevents the page from being reloaded
  // Then it creates a new comment.  If this is an edit, the comment ID is added
  // Then newly created comment is then passed up to the parent class to update the database
  handleSubmit(event){
    //Prevent page reload
    event.preventDefault();

    //Create a new comment from the form
    //Post ID and user ID are automatically filled in
    const new_comment = {
      comment_content: this.refs.comment_content.value,
      image: this.refs.image.value,
      user_id: this.props.loggedUser.id,
      post_id: this.props.post.id
    }

    //If this is a comment EDIT then add the passed in comment ID
    if(this.props.comment){
      new_comment["id"] = this.props.comment.id;
    }

    //Close the comment form box after submition
    this.props.closeComments();

    //Update the database and the post state with the new comment
    this.props.functionExecute(new_comment);
  }

  render() {
    return (
      <div className="field">
        <h1>Write Your Post Here</h1>
        <form className="post_form" onSubmit={this.handleSubmit}>
          <label className="label" for="comment_content">Content</label>
          <div className="control">
            <textarea className="input" type="text" id="comment_content" ref="comment_content"></textarea>
          </div>
          <label className="label" for="image">Image URL</label>
          <div className="control">
            <input className="input" type="text" id="image" ref="image" />
          </div>
          <div className="submit">
            <div className="control">
              <input id="submit" className="button is-primary" type="submit" />
              <button className="button is-primary" onClick={this.props.closeComments}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
