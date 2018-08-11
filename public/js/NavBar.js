class NavBar extends React.Component {
  render () {
    return (
      <div className="columns">
        <div className="column is-3">Logo</div>
        <div className="column" onClick={() => this.props.changePage("testUserForm")}>UserForm</div>
        <div className="column" onClick={() => this.props.changePage("testUserList")}>UserList</div>
        <div className="column" onClick={() => this.props.changePage("testUserShow")}>UserShow</div>
      </div>
    )
  }
}
