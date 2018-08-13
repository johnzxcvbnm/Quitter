class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Used for Edit Posts
  componentDidMount() {
    if(this.props.post){
      this.refs.post_content.value = this.props.post.post_content;
      this.refs.image.value = this.props.post.image;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const new_post = {
      post_content: this.refs.post_content.value,
      image: this.refs.image.value,
      user_id: this.props.loggedUser.id
    }

    if(this.props.post){
      new_post["id"] = this.props.post.id;
    }

    this.props.functionExecute(new_post);
  }

  render() {
    return (
      <div className="field">
        <h1>Write Your Post Here</h1>
        <form className="post_form" onSubmit={this.handleSubmit}>
          <label className="label" for="post_content">Content</label>
          <div className="control">
            <textarea className="input" type="text" id="post_content" ref="post_content"></textarea>
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
