class UserForm extends React.Component {
  render() {
    return (
      <div className="field">
        <h1>This is the UserForm Page</h1>
        <form>
          <label className="label" for="user_name">User Name</label>
          <div className="cotrol">
            <input className="input" type="text" id="user_name" />
          </div>
          <label className="label" for="password">User Password</label>
          <div className="cotrol">
            <input className="input" type="text" id="user_name" />
          </div>
          <label className="label" for="avatar">Avatar</label>
          <div className="cotrol">
            <input className="input" type="text" id="avatar" />
          </div>
          <input className="button is-primary" type="submit" />
        </form>
      </div>
    )
  }
}
