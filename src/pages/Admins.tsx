import { useState, useEffect } from "react";
import { Table } from "../components/table";
import { Navbar } from "../components/Navbar";
import { generateUpdateData, handleCheckboxChange } from "../functions/addAdminRigth";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function Admins() {
    const [admins, setAdmins] = useState<{ id: number; username: string; rights: string[] }[]>([]);
    const [userRights, setUserRights] = useState<string[]>([]);
    const availableRights = ["modifyAdmins", "modifyMaintenance", "modifyUsers"];

    useEffect(() => {
        const adminData = sessionStorage.getItem('adminData');
        const storedRights = adminData ? JSON.parse(adminData)["rights"] || [] : [];
        setUserRights(storedRights);

        fetch(`${API_BASE_URL}/admins`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setAdmins(data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div className="container">
            <Navbar />
            <div>
                <h2>Admins</h2>
                <Table
                    columns={userRights.includes("modifyAdmins") ? ["Id", "Username", "Rights", "Modify"] : ["Id", "Username", "Rights"]}
                    data={admins.map(admin => ({
                        ...admin,
                        modify: userRights.includes("modifyAdmins") ? (
                            <div>
                                {availableRights.map(right => (
                                    <label key={right}>
                                        <input
                                            type="checkbox"
                                            checked={admin.rights.includes(right)}
                                            onChange={(e) => handleCheckboxChange(
                                                admin.id,
                                                generateUpdateData(right, admin.rights, e.target.checked, availableRights)
                                            )}
                                        />

                                        <span>{right}</span>
                                    </label>
                                ))}
                            </div>
                        ) : null
                    }))}
                />
            </div>
        </div>
    );
}
