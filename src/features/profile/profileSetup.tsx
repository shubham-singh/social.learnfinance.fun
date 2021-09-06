import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import {
  checkUsernameAsync,
  createProfileAsync,
} from "../../utils/server.requests";
import SetUsername from "./setUsername";

export interface ProfileFormState {
  username: string;
  name: string;
  bio: string;
  imgProfile: string;
  imgCover: string;
}

const ProfileSetup = () => {
  const { newUser } = useAppSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileFormState>({
    username: "",
    name: "",
    bio: "",
    imgCover: "",
    imgProfile: "",
  });
  const [formState, setFormState] = useState({
      index: 0,
      status: false
  });

  useEffect(() => {
    if (!newUser) {
      navigate("/profile");
    }
    if (formState.index >= 2) {
      dispatch(createProfileAsync(profile));
    }
  }, [formState.index, newUser]);

  const checkUsername = async () => {
      const available = await checkUsernameAsync(profile.username);  
      if (available) {
          setFormState({
              ...formState,
              status: true
          })
      } else {
          setFormState({
              ...formState,
              status: false
          })
      }   
  }

  const loadForm = () => {
    if (formState.index === 0) {
      return (
        <div>
          <input
            style={{ border: `2px solid ${formState.status ? "green" : "red"}` }}
            type="text"
            required
            autoFocus
            value={profile.username}
            onChange={(e) => setProfile({...profile, username: e.target.value})}
            placeholder="username"
          />
          <button onClick={checkUsername}>Check username</button>
        </div>
      );
    } else if (formState.index === 1) {
        return (<div>
            <input 
                type="text"
                required
                autoFocus
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                placeholder="full name"
            />
            <input 
                type="text"
                required
                autoFocus
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                placeholder="bio"
            />
        </div>)
    }
  };

  if (newUser) {
    return (
      <div>
        {loadForm()}
        <p>{formState.status}</p>
        <button
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
          }}
          onClick={() => setFormState({
              ...formState,
              index: formState.index + 1
          })}
          disabled={!formState.status}
        >
          next
        </button>
      </div>
    );
  }
  return null;
};

export default ProfileSetup;
