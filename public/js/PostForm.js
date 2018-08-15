//Class PostForm is used for post creation and post editing
class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Used for Edit Posts
  //If a post is passed to the class, then it is a edit post call
  //Funtion is used to prefill the input boxes
  componentDidMount() {
    if(this.props.post){
      this.refs.post_content.value = this.props.post.post_content;
      this.refs.image.value = this.props.post.image;
    }
  }

  //Function is used to handle form submitions
  //Function first prevents the page from being reloaded automatically
  //Function then creates a new post with the submitted content
  //User ID is automatically filled in from the loggedUser ID provided from the parent class
  //If this is an edit post (provided from the parent class) then add in the post ID
  //The new post is then passed in the functionExecute provided from the parent class
  handleSubmit(event) {
    //Prevent page reload
    event.preventDefault();

    //Create a new post from the input boxes
    //User ID is automatically filled in
    const new_post = {
      post_content: this.refs.post_content.value,
      image: this.refs.image.value,
      user_id: this.props.loggedUser.id
    }

    //In case this is an edit post, add the post ID from the provided post
    if(this.props.post){
      new_post["id"] = this.props.post.id;
    }

    //Execute the function provided from the parent class
    this.props.functionExecute(new_post);
  }

  //What to render in the browser
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
            <div className="buttons">
              <input id="submit" className="button is-primary" type="submit" value="Submit" />
              <button className="button is-info" onClick={() => this.props.changePage("postList")}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
