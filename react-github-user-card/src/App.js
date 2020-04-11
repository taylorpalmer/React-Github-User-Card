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
        this.setState({ userArray: users });
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
    console.log("Rendering");
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
          {this.state.usersArr.map((users) => (
            <p>{users}</p>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
