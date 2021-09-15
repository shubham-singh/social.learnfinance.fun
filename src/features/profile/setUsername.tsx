import { useState } from "react";
import { checkUsernameAsync } from "../../utils/server.requests";

const SetUsername = () => {
  const [username, setUsername] = useState({
      username: "",
      status: false
  });

  const handleInput = (e: any) => {
      setUsername({
          ...username,
          username: e.target.value
      })
  }

  return (
    <div>
      <input
        style={{ border: `2px solid ${username.status ? "green" : "red"}` }}
        type="text"
        required
        autoFocus
        value={username.username}
        onChange={handleInput}
        placeholder="username"
      />
      <button onClick={() => checkUsernameAsync(username.username)}>Check username</button>
    </div>
  );
};

export default SetUsername;
