import axiosInstance from "./../../../axios/axiosAPI";


export async function GetCourseDetail(slug) {
    try {
        const response = await axiosInstance.get('/courses/' + slug + '/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function GetCourseList() {
    try {
        const response = await axiosInstance.get('/courses/?ordering=-id', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function ChangeCourse({ slug_old, slug, title, preview, poster, content, creator }) {
    try {
        const response = await axiosInstance.put('/courses/' + slug_old + '/edit/', {
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


export async function DeleteCourse(slug) {
    try {
        const response = await axiosInstance.delete('/courses/' + slug + '/delete/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};

export async function CreateCourse({ slug, title, preview, poster, content, creator }) {
    try {
        const response = await axiosInstance.post('/courses/create/', {
            slug: slug,
            title: title,
            preview: preview,
            poster: poster,
            content: content,
            creator: creator
        });
        return response;
    } catch (error) {
        throw error;
    }
};