class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Used for Edit Posts
  componentDidMount() {

  }
  handleSubmit(event) {
    event.preventDefault();

    const new_post = {
      post_content: this.refs.post_content.value,
      image: this.refs.image.value,
      user_id: this.props.loggedUser.id
    }

    this.props.functionExecute(new_post);
  }
  render() {
    return (
      <div className="field">
        <h1>Post Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="label" for="post_content">Content</label>
          <div className="control">
            <input className="input" type="text" id="post_content" ref="post_content" />
          </div>
          <label className="label" for="image">Image URL</label>
          <div className="control">
            <input className="input" type="text" id="image" ref="image" />
          </div>
          <div className="control">
            <input className="button is-primary" type="submit" />
          </div>
        </form>
      </div>
    )
  }
}
