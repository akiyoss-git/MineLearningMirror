import axiosInstance from "./../../../axios/axiosAPI";


export async function GetNewDetail(slug) {
    try {
        const response = await axiosInstance.get('/news/' + slug + '/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function GetNewList(arg = '') {
    try {
        const response = await axiosInstance.get('/news/?ordering=-created_at', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function ChangeNew({ slug_old, slug, title, preview, poster, content, creator }) {
    try {
        const response = await axiosInstance.put('/news/' + slug_old + '/edit/', {
            slug: slug,
            title: title,
            preview: preview,
            poster: poster,
            content: content,
            creator: creator
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function DeleteNew(slug) {
    try {
        const response = await axiosInstance.delete('/news/' + slug + '/delete/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};

export async function CreateNew({ slug, title, preview, poster, content, creator }) {
    try {
        const response = await axiosInstance.post('/news/create/', {
            slug : slug,
            title : title,
            preview : preview,
            poster : poster,
            content : content,
            creator : creator
        });
        return response;
    } catch (error) {
        throw error;
    }
};