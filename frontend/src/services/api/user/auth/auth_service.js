import axiosInstance from "../../../../axios/axiosAPI";

export async function Login({username, password}) {
    try {
        const response = await axiosInstance.post('/auth/token/obtain/', {
            username: username,
            password: password
        });
        axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return response;
    } catch (error) {
        throw error;
    }
};


export async function SingUp({username, password, email, name, surname, second_name}) {
    try {
        const response = await axiosInstance.post('/auth/user/create/', {
            username: username,
            email: email,
            password: password,
            name: name,
            surname: surname,
            second_name: second_name,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export async function Logout() {
    try {
        const response = await axiosInstance.post('auth/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        return response;
    }
    catch (e) {
        console.log(e);
    }
};