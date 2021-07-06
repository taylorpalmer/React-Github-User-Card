import React from "react";
import { HeaderWrap, LinksWrapper, StyledLink, UserCardWrap } from "./Styles";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      usersArr: [],
      usersFollowers: [],
      usersText: "",
    };
  }

  componentDidMount() {
    console.log("componentDidMount");

    fetch(`https://api.github.com/users/taylorpalmer`)
      .then((res) => res.json())
      .then((users) => {
        console.log("Users: ", users);
        this.setState({ usersArr: users });
      })
      .catch((err) => {
        console.log("Err: ", err);
      });

    fetch(`https://api.github.com/users/taylorpalmer/followers`)
      .then((res) => res.json())
      .then((followers) => {
        console.log("Followers: ", followers);
        this.setState({ usersFollowers: followers });
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  handleChanges = (e) => {
    e.preventDefault();
    this.setState({ usersText: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
  };

  fetchUser = (e) => {
    e.preventDefault();
    console.log("fetch");

    fetch(`https://api.github.com/users/${this.state.usersText}`)
      .then((res) => res.json())
      .then((users) => this.setState({ usersArr: users }))
      .catch((err) => console.log("Err: ", err));

    fetch(`https://api.github.com/users/${this.state.usersText}/followers`)
      .then((res) => res.json())
      .then((followers) => {
        console.log("Followers: ", followers);
        this.setState({ usersFollowers: followers });
      });
  };

  render() {
    console.log("Rendering: ", this.state);

    let userState = this.state.usersArr;
    console.log("userState: ", userState);
    return (
      <div>
        <HeaderWrap>
          <h1>Github Users</h1>
          <form onSubmit={(event) => this.submitHandler(event)}>
            <input
              type="text"
              value={this.state.usersText}
              onChange={this.handleChanges}
            />
            <button onClick={this.fetchUser}>Search</button>
          </form>
        </HeaderWrap>
        <hr />
        <UserCardWrap className="users">
          <img
            width="200"
            src={userState.avatar_url}
            alt={userState.avatar_url}
          />
          <div className="name">
            <h3>{userState.name}</h3>
            <h4>Username: {userState.login}</h4>
          </div>
          <LinksWrapper className="links">
            <StyledLink href={userState.url}>Github Profile</StyledLink>
            <StyledLink href={userState.repos_url}>Github Projects</StyledLink>
            <StyledLink href={userState.followers_url}>
              Followers: {userState.followers}
            </StyledLink>
            <StyledLink href={userState.following_url}>
              Following: {userState.following}
            </StyledLink>
          </LinksWrapper>
        </UserCardWrap>
      </div>
    );
  }
}

export default App;
