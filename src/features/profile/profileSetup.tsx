import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { createProfileAsync } from "../../utils/server.requests";

export interface ProfileFormState {
    username: String;
    name: String;
    bio: String;
    imgProfile: String;
    imgCover: String;
}

const ProfileSetup = () => {
    
    const dispatch = useDispatch();
    const { newUser } = useAppSelector(state => state.profile);
    const navigate = useNavigate();
    const [profile, setProfile] = useState<ProfileFormState>({
        username: "",
        name: "",
        bio: "",
        imgCover: "",
        imgProfile: ''
    })
    const [index, setIndex] = useState(0);
    console.log("New user: ", newUser);

    useEffect(() => {
        if (!newUser) {
            navigate("/profile")
        }
        if (index === 3 || index > 2) {
            dispatch(createProfileAsync(profile));
        }
    }, [index, newUser])

    if (newUser) {
        return (
            <div>
                {index === 0 && <p>username</p>}
                {index === 1 && <p>name</p>}
                {index === 2 && <p>bio</p>}
                <button style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "10%"
                }} onClick={() => setIndex(index => index + 1)}>next</button>
            </div>
        );
    } 
    return null;
}

export default ProfileSetup;