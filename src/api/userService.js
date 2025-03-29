const BASE_URL = "http://localhost:8080/api/v1/auth";

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/get-all-users`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
              }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            console.log("Error, sorry love!");
        }
    }

    catch (error) {
        console.log("Error fetching students: " + error);
        return;
    }
}

export const getUserById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/get-user/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken"),
              }
        });
        if (response.ok) {
            const data = await response.json();
            return data.name;
        }
    } catch (error) {
        console.log(error);
        return;
    }
}