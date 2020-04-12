import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      usersArr: [],
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
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  handleChanges = (e) => {
    this.setState({ usersText: e.target.value });
  };

  fetchUser = (e) => {
    e.preventDefault();

    fetch(`https://api.github.com/users/${this.state.usersText}`)
      .then((res) => res.json())
      .then((users) => this.setState({ usersArr: users }))
      .catch((err) => console.log("Err: ", err));
  };

  render() {
    console.log("Rendering: ", this.state);

    let userState = this.state.usersArr;
    console.log("userState: ", userState);
    return (
      <div>
        <h1>Github Users</h1>
        <input
          type="text"
          value={this.state.usersText}
          onChange={this.handleChanges}
        />
        <button onClick={this.fetchUser}>Search</button>
        <div className="users">
          <img src={userState.avatar_url} alt={userState.avatar_url} />
          <p>{userState.name}</p>
        </div>
      </div>
    );
  }
}

export default App;
