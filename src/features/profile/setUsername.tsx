import { checkUsernameAsync } from "../../utils/server.requests";
import { FormState, ProfileFormState } from "./profileSetup";

const SetUsername = ({
  profile,
  setProfile,
  formState,
  setFormState,
}: {
  profile: ProfileFormState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileFormState>>;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}) => {

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

  const handleInput = (e: any) => {
    setProfile({
      ...profile,
      username: e.target.value,
    });
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <input
        style={{ border: `2px solid ${formState.status ? "green" : "red"}` }}
        className="p-3 rounded-xl text-lg"
        type="text"
        required
        autoFocus
        value={profile.username}
        onChange={(e) => setProfile({...profile, username: e.target.value})}
        placeholder="username"
        maxLength={14}
        minLength={3}
      />
      <button className="m-3 p-3 rounded-xl text-white bg-black" onClick={checkUsername}>Check username</button>
    </div>
  );
};

export default SetUsername;
