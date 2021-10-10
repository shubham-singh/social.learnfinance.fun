import { useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TopBar from "../../components/topBar";
import { editProfileAsync } from "../../utils/server.requests";

interface EditProfileFormState {
  name: string;
  bio: string;
  imgProfile: File | null;
  imgCover: File | null;
}

const EditProfile = () => {
  const profileDetails = useAppSelector((state) => state.auth.profile.profile);
  const dispatch = useAppDispatch();
  const getInitialState = () => ({
    name: profileDetails.name ? profileDetails.name : "",
    bio: profileDetails.bio ? profileDetails.bio : "",
    imgProfile: null,
    imgCover: null,
  });
  const [editProfileForm, setEditProfileForm] =
    useState<EditProfileFormState>(getInitialState);
  const navigate = useNavigate();
  const handleInput = (e: any) => {
    setEditProfileForm({
      ...editProfileForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageInput = (e: any) => {
    setEditProfileForm({
      ...editProfileForm,
      [e.target.name]: e.target.files![0],
    });
  };

  const handleSubmit = () => {
    let formData = new FormData();
    formData.append("name", editProfileForm.name);
    formData.append("bio", editProfileForm.bio);
    if (
      editProfileForm.imgCover !== null &&
      editProfileForm.imgCover !== undefined
    ) {
      formData.append("imgCover", editProfileForm.imgCover);
    }
    if (
      editProfileForm.imgProfile !== null &&
      editProfileForm.imgProfile !== undefined
    ) {
      formData.append("imgProfile", editProfileForm.imgProfile);
    }
    dispatch(editProfileAsync({ formData, navigate }));
  };

  return (
    <div className="flex flex-col">
      <TopBar title="Back to profile" />
      <input
        name="name"
        placeholder="Full name"
        value={editProfileForm.name}
        onChange={handleInput}
        className="p-3 my-2 border-2 border-gray-500 rounded-xl text-lg"
      />
      <textarea
        name="bio"
        placeholder="Bio"
        value={editProfileForm.bio}
        onChange={handleInput}
        className="w-full p-3 my-2 border-2 border-gray-500 rounded-xl text-lg"
      />
      <label htmlFor="imgCover" className="border-2 p-2 m-2 cursor-pointer">
        Cover picture {editProfileForm.imgCover ? " ✔️" : ""}
      </label>
      <input
        id="imgCover"
        className="hidden"
        type="file"
        name="imgCover"
        accept="image/png, image/jpeg"
        onChange={handleImageInput}
      />
      <label htmlFor="imgProfile" className="border-2 p-2 m-2 cursor-pointer">
        Profile picture{editProfileForm.imgProfile ? " ✔️" : ""}
      </label>
      <input
        id="imgProfile"
        className="hidden"
        type="file"
        name="imgProfile"
        accept="image/png, image/jpeg"
        onChange={handleImageInput}
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white rounded-xl py-3 px-6 block hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-black"
      >
        Save
      </button>
    </div>
  );
};

export default EditProfile;
