import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "./App.css";

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

  

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  render() {
    console.log("Rendering: ", this.state);

    let userState = this.state.usersArr;
    console.log("userState: ", userState);

    return (
      <div>
        <div>
          <h1>Github Users</h1>
          <input
            type="text"
            value={this.state.usersText}
            onChange={this.handleChanges}
          />
          <button onClick={this.fetchUser}>Search</button>
        </div>
        <hr />
        <div className="users">
          <img src={userState.avatar_url} alt={userState.avatar_url} />
          <div className="name">
            <h2>{userState.name}</h2>
            <h3>Username: {userState.login}</h3>
            <div className="follow">
              <span>Followers: {userState.followers}</span>
              <span>Following: {userState.following}</span>
            </div>
          </div>

          <div>
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle tag="a" className="nav-link" caret>
                Links to Github
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag="a" href={userState.url} active>
                  User's Github Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag="a" href={userState.repos_url} active>
                  User's Github Projects
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag="a" href={userState.followers_url} active>
                  User's Followers
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag="a" href={userState.following_url} active>
                  Who User is Following
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
