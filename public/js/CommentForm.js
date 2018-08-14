class CommentForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event){
    event.preventDefault();

    const new_comment = {
      comment_content: this.refs.comment_content.value,
      image: this.refs.image.value,
      user_id: this.props.loggedUser.id,
      post_id: this.props.post.id
    }

    this.props.closeComments();

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
            </div>
          </div>
        </form>
      </div>
    )
  }
}
