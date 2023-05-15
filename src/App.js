import "./App.css";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { getUser, getRepositories } from "./Api";

function UserInfo({ user }) {
  return (
    <div>
      <h2>User Info</h2>
      <img src={user.avatar_url} alt="Profile" />
      <p>Name: {user.name}</p>
      <p>Location: {user.location}</p>
      <p>Bio: {user.bio}</p>
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

function RepositoryList({ repositories }) {
  return (
    <div>
      <h3>Repositories</h3>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}

RepositoryList.propTypes = {
  repositories: PropTypes.array.isRequired,
};

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username) {
      try {
        const userData = await getUser(username);
        const repoData = await getRepositories(username);
        setUser(userData);
        setRepositories(repoData);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="main">
      <h1>Github User App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button type="submit">Submit</button>
      </form>
      {user && <UserInfo user={user} />}
      {repositories.length > 0 && (
        <RepositoryList repositories={repositories} />
      )}
    </div>
  );
}

export default App;
