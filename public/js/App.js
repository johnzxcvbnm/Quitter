//The App class holds all the functionality and control of the Quitter App
//Including the state, which contains if the user is logged in, what page they're view, etc.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Which page is the user currently viewing
      page: {
        userLogin: false,
        userRegister: false,
        userShow: false,
        userEdit: false,
        postList: true,
        postShow: false,
        postForm: false,
        postEdit: false

      }, //End of this.state.page
      //Login Error - No user found
      errorNoUser: false,
      //Login Error - Password submitted does not match stored password
      errorWrongPassword: false,
      //The current logged in user, if there is one
      loggedUser: null,
      //Used for user show pages
      selectedUser: null,
      //A list of posts
      posts: [],
      //The currently selected post, pulled from the database
      selectedPost: {},
      selectedPostIndex: 0,
      //The last like the user has created
      lastLike: {}

    } //End of this.state
    //Function Bindings
    this.changePage = this.changePage.bind(this);
    this.createUser = this.createUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.changeSelectedUser = this.changeSelectedUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.selectPost = this.selectPost.bind(this);
    this.editPost = this.editPost.bind(this);
    this.createComment = this.createComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.addLike = this.addLike.bind(this);
    this.removeLike = this.removeLike.bind(this);
  }//End of Constructor

  //Function used to load things on page load
  //Function loads a list of posts on page load
  componentDidMount() {
    // this.changePage("pageUserRegister");
    this.loadPosts();
  }

  //Function used to change what section is being displayed (newPage is the new section to be displayed)
  //Function takes all the keys in this.state.page and sets them to false
  //Then it takes the parameter key (newPage) and sets it to be true
  //The state is then updated
  //The function is designed to support being scaled up indefinately
  changePage (newPage) {
    let toUpdate = {};
    for(let key in this.state.page){
      toUpdate[key] = false;
    }
    toUpdate[newPage] = true;
    this.setState({page: toUpdate })
  }

  //Function creates a new user in the database
  //Function makes a POST request to the server
  //If successful it logs the returned user into the state creating a session
  //Logged in users are then brought back to the main page (postList)
  createUser(new_user){
    fetch("/users", {
      body: JSON.stringify(new_user),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdUser => {
      return createdUser.json()
    })
    .then(jsonedUser => {
      this.setUser(jsonedUser);
      this.changePage("postList");
    })
    .catch(error => console.log(error));
  }

  //Function creates a session by saving the user information in the current state
  //Function changes the password to 'Nice Try' for protection before setting the state
  //this.state.loggedUser is used for user functionality (only logged in users can post, for example)
  setUser(new_user){
    if(new_user != null){
      new_user["password"] = "Nice Try";
    }
    this.setState({loggedUser: new_user});
  }

  //Function destroys current sesison
  //Function sets the currently logged in user to null, thus destorying the session
  logOut(){
    this.setUser(null);
  }

  //Function calls the server to login user
  //Function first sets the login error messages to false to prevent them from showing up
  //Then the function looks for the user_name in the database
  //If the username is found it checks the password in the database against the submitted password
  //If the passwords match, log in that user
  //If the passwords do NOT match, set the corresponding error message to true and do nothing else
  //If the user_name is NOT found, set the corresponding error message to true and do nothing else
  loginUser(new_user){
    // console.log("Logging In User");
    // console.log(new_user);
    this.setState({ errorNoUser: false,
                    errorWrongPassword: false});
    fetch("/users/find/'" + new_user.user_name + "'")
      .then(response => response.json())
        .then(logged_user => {
          if(new_user.password === logged_user.password){
            this.setUser(logged_user);
            this.changePage("postList");
          } else {
            this.setState({ errorWrongPassword: true });
            console.log("Wrong Password");
          }
        }).catch(error => {
            console.log(error);
            this.setState({ errorNoUser: true });
        });
  }

  //Function changes the selected user.
  //Selected User is used to dislay user show pages
  changeSelectedUser(new_user){
    this.setState({selectedUser: new_user});
  }

  //Function edits an existing user
  //Function calls the back end with the information from old_user and updates the user
  //The loggedUser is then updated and the user is redirected back to the main page (postList)
  editUser(old_user){
    // console.log("Editing User");
    // console.log(old_user);
    fetch("/users/" + old_user.id, {
      body: JSON.stringify(old_user),
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(updatedUser => {
      return updatedUser.json()
    })
    .then(jsonedUser => {
      this.setUser(jsonedUser);
      this.changePage("postList");
    })
    .catch(error => console.log(error))
  }

  //Loads all the posts in the database and puts it into state
  //loadPosts executes automatically on page load
  //If there are no posts in the database to load a default post is loaded into state
  loadPosts() {
    fetch("/posts")
      .then(response => response.json())
        .then(all_posts => {
          // console.log(all_posts);
          if(all_posts[0] == null){
            this.loadDefaultPost();
          } else {
            this.setState({posts: all_posts})
          }
        }).catch(error => console.log(error));
  }

  //Function creates a default post to load into state should there be no posts to load
  //The post is removed automatically after a post has been made
  //The post is automatically placed in if all the posts are deleted
  loadDefaultPost(){
    const default_post = [];
    default_post.push({
      id: 0,
      post_content: "No one has posted anything yet!  Login and claim your birth right of creating the first post!",
      image: "",
      user_id: -1,
      user_name: "Quitter Dev",
      avatar: "https://d1ielco78gv5pf.cloudfront.net/assets/clear-495a83e08fc8e5d7569efe6339a1228ee08292fa1f2bee8e0be6532990cb3852.gif"
    })
    // console.log(default_post);
    this.setState({posts: default_post});
  }

  //Function creates a new post in the database
  //Function pushes a new post into the database then updates the state to reflect the update
  //Should the only post be the default post then then default is removed before
  //updating the state with the new post
  createPost(new_post){
    // console.log("Posting");
    // console.log(new_post);
    fetch("/posts", {
      body: JSON.stringify(new_post),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdPost => {
      return createdPost.json()
    })
    .then(jsonedPost => {
      const copy_array = this.state.posts;
      //If the default post is the only post, which has a user_id of -1, then remove the default post
      if(copy_array[0]["user_id"] == -1){
        copy_array.pop();
      }
      jsonedPost["user_name"] = this.state.loggedUser.user_name;
      jsonedPost["avatar"] = this.state.loggedUser.avatar;
      // console.log([jsonedPost, ...this.state.posts]);
      //New posts are pushed to the top automatically
      copy_array.unshift(jsonedPost);
      this.setState({posts: copy_array});
      this.changePage("postList");
    })
  }

  //Function removes a post from the database
  //Function first removes the post from the database then updates the
  //current state.  If there are no more posts in the state then load the default post
  //Function then redirects the user to the main page (postList)
  deletePost(old_post, index){
    // console.log("DELETING");
    // console.log(old_post);
    fetch("/posts/" + old_post.id, {
      method: "DELETE"
    })
    .then(data => {
      this.setState({
        posts: [
          ...this.state.posts.slice(0, index),
          ...this.state.posts.slice(index + 1)
        ]
      })
      if(this.state.posts.length == 0){
        this.loadDefaultPost();
      }
      this.changePage("postList");
    }).catch(error => console.log(error))
  }

  //Function is used to call the database to retrive all the information about
  //one selected post (likes, comments, etc)
  //Function first checks to see if the selected post is the default post
  //Function does not call the database or updates anything with the default post
  //After the database is called the selected post and post index (used for deletion)
  //are updated in the current state
  //The user is then redirected to the postShow page to display the selected post information
  selectPost(post, index) {
    // console.log("Selected Post");
    // console.log(post);
    if(post.id != 0){
      fetch("/posts/" + post.id)
        .then(response => response.json())
          .then(my_post => {
            this.setState({selectedPost: my_post,
                           selectedPostIndex: index});
            this.changePage("postShow");
          }).catch(error => console.log(error));
    }
  }

  //Function is used to edit an existing post in the database
  //Function calls the database and makes a PUT request with the new_post
  //If successful the function calls the database again to correctly update the state
  //and redirects the user back to the selected post
  editPost(new_post){
    // console.log("Editing Post");
    // console.log(new_post);
    fetch("/posts/" + new_post.id, {
      body: JSON.stringify(new_post),
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(updatedPost => {
      return updatedPost.json()
    })
    .then(jsonedPost => {
      this.loadPosts();
      this.setState({ selectedPost: jsonedPost });
      this.changePage("postShow");
    })
  }

  //Function is used to create new comments by users (users can comment on posts)
  //Function takes the new_comment and updates it in the database
  //The selectedPost is then updated in the state by calling the database again
  createComment(new_comment){
    // console.log("Creating new comment");
    // console.log(new_comment);
    fetch("/comments", {
      body: JSON.stringify(new_comment),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdComment => {
      return createdComment.json()
    })
    .then(jsonedComment => {
      // console.log("Comment Added");
      this.selectPost(this.state.selectedPost, this.state.selectedPostIndex);
    })
    .catch(error => console.log(error))
  }

  // Function is used to delete comments from the database
  // Function deletes the comment then updates the selected post in state by calling the database
  deleteComment(old_comment){
    // console.log("DELETING");
    // console.log(old_comment);
    fetch("/comments/" + old_comment.id, {
      method: "DELETE"
    })
    .then(data => {
      this.selectPost(this.state.selectedPost, this.state.selectedPostIndex);
    })
    .catch(error => console.log(error))
  }

  // Function is used to update comments in the database
  // Function calls the database with the updated post then updates the post in state by calling the database again
  updateComment(new_comment){
    // console.log("Updating Comment");
    // console.log(new_comment);
    fetch("/comments/" + new_comment.id, {
      body: JSON.stringify(new_comment),
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(updatedComment => {
      this.selectPost(this.state.selectedPost, this.state.selectedPostIndex);
    })
    .catch(error => console.log(error));
  }

  //Function adds likes to posts made by users
  //Function creates a new like from the loggedUser and selectedPost
  //then updates the database with the new like
  //Finally the post is updated in the state (by calling the database again)
  addLike(){
    // console.log("Like Added!");
    const new_like = {
      user_id: this.state.loggedUser.id,
      post_id: this.state.selectedPost.id
    }

    fetch("/likes", {
      body: JSON.stringify(new_like),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdLike => {
      return createdLike.json()
    })
    .then(jsonedLike => {
      this.setState({ lastLike: jsonedLike });
      this.selectPost(this.state.selectedPost, this.state.selectedPostIndex);
    })
    .catch(error => console.log(error));
  }

  //Function is used to delete likes that the user has made
  //Function removes the like from the database then updates the selected post
  removeLike(old_like){
    console.log("Removing Like");
    console.log(old_like);
    if(!(old_like.id)){
      old_like = this.state.lastLike;
      console.log("New Old Like");
      console.log(old_like);
    }
    fetch("/likes/" + old_like.id, {
      method: "DELETE"
    })
    .then(data => {
      // console.log("Like Deleted");
      this.selectPost(this.state.selectedPost, this.state.selectedPostIndex);
    })
    .catch(error => console.log(error));
  }

  //Render to the browser
  render() {
    return (
      <div className="container">
      {/* A Nav Bar that will be stuck to the top of the page */}
        <NavBar
          changePage={this.changePage}
          loggedUser={this.state.loggedUser}
          logOut={this.logOut}
          changeSelectedUser={this.changeSelectedUser}/>
        {/* Conditionals that display the rest of the website's content */}
        {/*Post Listing Section (Default Main Page) for guest users */}
        {
          this.state.page.postList && !(this.state.loggedUser) ?
            <span>
              <PostList
                posts={this.state.posts}
                loggedUser={ {id: 0} }
                selectPost={this.selectPost}/>
            </span>
          : ''
        }
        {/* If the user is logged in, display their information at the top of the page along with the postList section */}
        {
          this.state.page.postList && this.state.loggedUser ?
            <span>
              <UserSplash
                loggedUser={this.state.loggedUser}
                changePage={this.changePage}/>
              <PostList
                posts={this.state.posts}
                loggedUser={this.state.loggedUser}
                changePage={this.changePage}
                deletePost={this.deletePost}
                selectPost={this.selectPost}
                commentFunctionExecute={this.createComment}/>
            </span>
          : ''
        }
        {/*User Registration Section*/}
        {
          this.state.page.userRegister ?
            <UserForm
              functionExecute={this.createUser}
              title="Register User"/>
          : ''
        }
        {/*User Login Section*/}
        {
          this.state.page.userLogin ?
            <UserForm
              login={true}
              functionExecute={this.loginUser}
              title="User Login"
              errorNoUser={this.state.errorNoUser}
              errorWrongPassword={this.state.errorWrongPassword}/>
          : ''
        }
        {/* User Edit Page */}
        {
          this.state.page.userEdit ?
            <UserForm
              functionExecute={this.editUser}
              title="Edit User"
              loggedUser={this.state.loggedUser}/>
          : ''
        }
        {/* User Show Page */}
        {
          this.state.page.userShow ?
            <UserShow
              loggedUser={this.state.loggedUser}
              selectedUser={this.state.selectedUser}
              changePage={this.changePage}/>
          : ''
        }
        {/* Create Post Section */}
        {
          this.state.page.postForm ?
            <PostForm
              changePage={this.changePage}
              loggedUser={this.state.loggedUser}
              functionExecute={this.createPost}/>
          : ''
        }
        {/* Edit Post Section */}
        {
          this.state.page.postEdit ?
            <PostForm
              changePage={this.changePage}
              loggedUser={this.state.loggedUser}
              functionExecute={this.editPost}
              post={this.state.selectedPost}/>
          : ''
        }
        {/* Show post page with logged in users */}
        {
          this.state.page.postShow && this.state.loggedUser ?
            <PostShow
              loggedUser={this.state.loggedUser}
              changePage={this.changePage}
              changeSelectedUser={this.changeSelectedUser}
              post={this.state.selectedPost}
              postIndex={this.state.selectedPostIndex}
              deletePost={this.deletePost}
              commentFunctionExecute={this.createComment}
              addLike={this.addLike}
              deleteComment={this.deleteComment}
              updateComment={this.updateComment}
              removeLike={this.removeLike}/>
          : ''
        }
        {/* Show Post page with guests */}
        {
          this.state.page.postShow && !(this.state.loggedUser) ?
            <PostShow
              loggedUser={ {id: 0} }
              changePage={this.changePage}
              changeSelectedUser={this.changeSelectedUser}
              post={this.state.selectedPost}
              postIndex={this.state.selectedPostIndex}
              deletePost={this.deletePost}/>
          : ''
        }
        <Footer/>
      </div>
    )
  }
}

//Send to index.html
ReactDOM.render(
  <App />,
  document.querySelector("main")
);
