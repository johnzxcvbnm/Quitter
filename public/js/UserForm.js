class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if(this.props.user){
      console.log("Logged In User:");
      console.log(this.props.user);
    }
  }

  handleSubmit(event) {
    //Prevent the page from being reloaded
    event.preventDefault();

    if(!(this.refs.avatar)){
      this.refs["avatar"] = { value: "Test" };
    }
    const new_user = {
      user_name: this.refs.user_name.value,
      password: this.refs.password.value,
      avatar: this.refs.avatar.value
    }
    // if(this.refs.avatar){
    //   new_user["avatar"] = this.refs.avatar.value;
    // } else {
    //   this.refs["avatar"] = {value: "Test"};
    //   new_user["avatar"] = this.refs.avatar.value;
    // }
    // console.log(new_user);
    this.props.functionExecute(new_user);

  }

  render() {
    return (
      <div className="field">
        <h1>This is the UserForm Page</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="label" for="user_name">User Name</label>
          <div className="cotrol">
            <input className="input" type="text" id="user_name" ref="user_name" />
          </div>
          <label className="label" for="password">User Password</label>
          <div className="cotrol">
            <input className="input" type="password" id="password" ref="password"/>
          </div>
          {
            this.props.login ?
              '' :
              <span>
                <label className="label" for="avatar">Avatar</label>
                <div className="cotrol">
                  <input className="input" type="text" id="avatar" ref="avatar"/>
                </div>
              </span>
          }
          <input className="button is-primary" type="submit" />
        </form>
      </div>
    )
  }
}
