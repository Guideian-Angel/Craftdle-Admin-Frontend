import { useState, useEffect } from "react";
import { Table } from "../components/table";
import { Navbar } from "../components/Navbar";
import { IUpdateRights } from "../interfaces/updateRigths";

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

    const handleCheckboxChange = (adminId: number, updateData: IUpdateRights) => {
        fetch(`${API_BASE_URL}/admin/${adminId}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                window.location.reload();
            })
            .catch((error) => console.error("Error updating rights:", error));        
    };
    

    const generateUpdateData = (target: string, rights: string[], isChecked: boolean) => {
        const updateData: IUpdateRights = {} as IUpdateRights;
    
        availableRights.forEach(right => {
            updateData[right] = (right === target) ? isChecked : rights.includes(right);
        });
    
        return updateData;
    };

    return (
        <div>
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
                                                generateUpdateData(right, admin.rights, e.target.checked)
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
