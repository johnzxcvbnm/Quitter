//UserForm is used to Register new users, Login existing users, and Edit existing users
class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Functin is used for Editing existing users
  //If there is a user, prefill the input boxes
  componentDidMount() {
    if(this.props.loggedUser){
      // console.log("Logged In User:");
      // console.log(this.props.loggedUser);
      this.refs.user_name.value = this.props.loggedUser.user_name;
      this.refs.avatar.value = this.props.loggedUser.avatar;
    }
  }

  //Function is used to handle form submitions
  //Function prevents the page from being reloaded
  //Then creates a new user based off of the form information
  //It then calls the provided parentclass function with the new user as a parameter
  handleSubmit(event) {
    //Prevent the page from being reloaded
    event.preventDefault();

    //If there is no avatar input field, create one by default.
    //Used to prevent errors between user Register and user Login
    if(!(this.refs.avatar)){
      this.refs["avatar"] = { value: "Nunya Business" };
    }

    //Create new user from the form data
    const new_user = {
      user_name: this.refs.user_name.value,
      password: this.refs.password.value,
      avatar: this.refs.avatar.value
    }

    //If the user is editing their user information, add the user ID to the new_user
    if(this.props.loggedUser){
      new_user["id"] = this.props.loggedUser.id;
    }

    //Call the ParentClass function with the newly created user
    //Different functions are (Login, Register, and (soon) Edit)
    this.props.functionExecute(new_user);
  }

  render() {
    return (
      <div className="field">
        <h1>{this.props.title}</h1>
        {/* Error Messages */}
        {/* User Name not found */}
        {
          this.props.errorNoUser ?
            <h2 className="error_message">User not found</h2>
          : ''
        }
        {/* Password entered incorrectly */}
        {
          this.props.errorWrongPassword ?
            <h2 className="error_message">Wrong Password</h2>
          : ''
        }
        <form onSubmit={this.handleSubmit}>
          <label className="label" for="user_name">User Name</label>
          <div className="control">
            <input className="input" type="text" id="user_name" ref="user_name" required />
          </div>
          <label className="label" for="password">User Password</label>
          <div className="control">
            <input className="input" type="password" id="password" ref="password" required />
          </div>
          {/*If the user is trying to login, do not use the avatar input field*/}
          {
            this.props.login ?
              '' :
              <span>
                <label className="label" for="avatar">Avatar</label>
                <div className="control">
                  <input className="input" type="text" id="avatar" ref="avatar"/>
                </div>
              </span>
          }
          <div className="submit">
            <input className="button is-info" type="submit" />
          </div>
        </form>
      </div>
    )
  }
}
