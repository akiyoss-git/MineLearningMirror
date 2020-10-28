import axiosInstance from "../../../../axios/axiosAPI";


export async function GetUserCurrent() {
    try {
        const response = await axiosInstance.get('/auth/user/current/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function GetUserDetail(slug) {
    try {
        const response = await axiosInstance.get('/auth/user/' + slug + '/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function GetUserList(slug) {
    try {
        const response = await axiosInstance.get('/auth/user/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function ChangeUser({ username, name, surname, second_name, email, bio, new_password, old_password}) {
    try {
        const response = await axiosInstance.put('/auth/user/' + username + '/edit/', {
            username: username,
            name: name,
            surname: surname,
            second_name: second_name,
            email: email,
            bio: bio,
            new_password: new_password,
            old_password: old_password,
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function DeleteUser(slug) {
    try {
        const response = await axiosInstance.delete('/auth/user/' + slug + '/delete/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        const response_logout = await axiosInstance.post('auth/blacklist/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        return response;
    } catch (error) {
        throw error
    }
};