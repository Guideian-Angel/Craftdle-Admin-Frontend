import { IUpdateRights } from "../interfaces/updateRigths";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export const handleCheckboxChange = (adminId: number, updateData: IUpdateRights) => {
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

export const generateUpdateData = (target: string, rights: string[], isChecked: boolean, availableRights: string[]) => {
    const updateData: IUpdateRights = {} as IUpdateRights;

    availableRights.forEach(right => {
        updateData[right] = (right === target) ? isChecked : rights.includes(right);
    });

    return updateData;
};