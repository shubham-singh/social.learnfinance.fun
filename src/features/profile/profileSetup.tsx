import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import {
  checkUsernameAsync,
  createProfileAsync,
} from "../../utils/server.requests";
import TopBar from "../../components/topBar";

export interface ProfileFormState {
  username: string;
  name: string;
  bio: string;
  imgProfile: File | null;
  imgCover: File | null;
}

export interface FormState {
  index: number;
  status: boolean;
}

const ProfileSetup = () => {
  const { newUser, profile: userProfile } = useAppSelector(
    (state) => state.auth.profile
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileFormState>({
    username: "",
    name: "",
    bio: "",
    imgCover: null,
    imgProfile: null,
  });
  const [formState, setFormState] = useState<FormState>({
    index: 0,
    status: false,
  });

  useEffect(() => {
    if (!newUser) {
      navigate(`/${userProfile.username}`);
    }
    if (formState.index >= 2 && newUser) {
      let formData = new FormData();
      formData.append("username", profile.username);
      formData.append("name", profile.name);
      formData.append("bio", profile.bio);
      if (profile.imgProfile !== null) {
        formData.append("imgProfile", profile.imgProfile);
      }
      if (profile.imgCover !== null) {
        formData.append("imgCover", profile?.imgCover);
      }
      dispatch(createProfileAsync(formData));
    }
  }, [formState.index, newUser, profile, userProfile.username, navigate, dispatch]);

  const checkUsername = async () => {
    const available = await checkUsernameAsync(profile.username);
    if (available) {
      setFormState({
        ...formState,
        status: true,
      });
    } else {
      setFormState({
        ...formState,
        status: false,
      });
    }
  };

  const loadForm = () => {
    if (formState.index === 0) {
      return (
        <div className="flex-grow flex flex-col justify-center items-center">
          <input
            style={{
              border: `2px solid ${formState.status ? "green" : "red"}`,
            }}
            className="p-3 rounded-xl text-lg"
            type="text"
            required
            autoFocus
            value={profile.username}
            onChange={(e) => {
              setProfile({ ...profile, username: e.target.value });
              setFormState({
                ...formState,
                status: false,
              });
            }}
            onKeyUp={(e: any) => {
              if (e.code === "Space") {
                setProfile({
                  ...profile,
                  username: profile.username.replace(/\s/g, ""),
                });
              }
            }}
            placeholder="username"
            maxLength={14}
            minLength={3}
          />
          <button
            className="m-3 p-3 rounded-xl text-white bg-black"
            onClick={checkUsername}
          >
            Check username
          </button>
        </div>
      );
    } else if (formState.index === 1) {
      return (
        <div className="flex-grow w-5/6 flex flex-col justify-center items-center mx-auto">
          <label htmlFor="imgCover" className="border-2 p-2 m-2 cursor-pointer">
          Cover picture{profile.imgCover !== null ? " ✔️" : ""}
          </label>
          <input
            id="imgCover"
            type="file"
            name="imgCover"
            accept="image/png, image/jpeg"
            onChange={(e) =>
              setProfile({ ...profile, imgCover: e.target.files![0] })
            }
            className="hidden"
          />
          <label
            htmlFor="imgProfile"
            className="border-2 p-2 m-2 cursor-pointer"
          >
            Profile picture {profile.imgProfile !== null ? " ✔️" : ""}
          </label>
          <input
            id="imgProfile"
            type="file"
            name="imgProfile"
            accept="image/png, image/jpeg"
            onChange={(e) =>
              setProfile({ ...profile, imgProfile: e.target.files![0] })
            }
            className="hidden"
          />
          <input
            className="p-3 my-2 border-2 border-gray-500 rounded-xl text-lg"
            type="text"
            required
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="full name"
          />
          <textarea
            className="w-full p-3 my-2 border-2 border-gray-500 rounded-xl text-lg"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            placeholder="bio"
            maxLength={140}
          />
        </div>
      );
    }
  };

  if (newUser) {
  return (
    <div className="h-full flex flex-col justify-center">
      <TopBar title="Profile Setup" canGoBack={false} />
      {loadForm()}
      <button
        className="bg-green-500 py-3 px-6 block font-bold disabled:opacity-50"
        onClick={() =>
          setFormState({
            ...formState,
            index: formState.index + 1,
          })
        }
        disabled={!formState.status}
      >
        {formState.index === 0 ? "Next" : "Submit"}
      </button>
    </div>
  );
  }
  return null;
};

export default ProfileSetup;
