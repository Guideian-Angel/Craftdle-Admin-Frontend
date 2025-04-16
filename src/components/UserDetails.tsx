import { useState, useEffect } from "react";
import PlayedGamemodesChart from "./PlayedGamemodesChart";
import { generateUpdateData, handleCheckboxChange } from "../functions/addAdminRigth";

interface UserDetailsProps {
    userId: number;
    onClose: () => void;
}

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function UserDetails({ userId, onClose }: UserDetailsProps) {
    const [userData, setUserData] = useState<any>(null);
    const availableRights = ["modifyAdmins", "modifyMaintenance", "modifyUsers"];

    useEffect(() => {
        fetch(`${API_BASE_URL}/user/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data);
            })
            .catch((error) => console.error("Error:", error));
    }, [userId]);

    console.log(userData)

    return userData && !userData.error && (
        <div id="userDetails">
            <button onClick={onClose}>✖</button>
            <div>
                <h2>User Details</h2>
                <p>Username: {userData.username}</p>
                <p>Streak: {userData.streak ?? "0"}</p>
                <p>Achievements: {userData.achievements.collected + "/" + userData.achievements.total}</p>
                <p>Collection: {userData.collection.collected + "/" + userData.collection.total}</p>
                <p>Registration Date: {new Date(userData.registration_date).toLocaleDateString()}</p>
                <p>Favourite Gamemode: {userData.favoriteGamemode}</p>
                {!userData.is_guest? <p>Adimin rights: {
                                availableRights.map(right => (
                                    <label key={right}>
                                        <input
                                            type="checkbox"
                                            checked={userData.rights?.includes(right)}
                                            onChange={(e) => handleCheckboxChange(
                                                userData.id,
                                                generateUpdateData(right, userData.rights, e.target.checked, availableRights)
                                            )}
                                        />

                                        <span>{right}</span>
                                    </label>
                                ))}
                            </p>: <></>}
                <div>
                    <h3>Gamemode Distribution</h3>
                    <PlayedGamemodesChart rawData={userData.playedGamemodes} />
                </div>
            </div>
        </div>
    );
}