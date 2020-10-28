import axiosInstance from "./../../../axios/axiosAPI";


export async function GetLessonDetail(slug) {
    try {
        const response = await axiosInstance.get('/lessons/' + slug + '/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function GetLessonList() {
    try {
        const response = await axiosInstance.get('/lessons/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};
export async function GetLessonListByCourse(course) {
    try {
        const response = await axiosInstance.get('/lessons/?search=' + course + '&ordering=-id', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};



export async function ChangeLesson({ slug_old, slug, title, preview, poster, content, creator, course }) {
    try {
        const response = await axiosInstance.put('/lessons/' + slug_old + '/edit/', {
            slug: slug,
            title: title,
            preview: preview,
            poster: poster,
            content: content,
            creator: creator,
            course: course,
        });
        return response;
    } catch (error) {
        throw error
    }
};


export async function DeleteLesson(slug) {
    try {
        const response = await axiosInstance.delete('/lessons/' + slug + '/delete/', {
            "refresh_token": localStorage.getItem("refresh_token")
        });
        return response;
    } catch (error) {
        throw error
    }
};

export async function CreateLesson({ slug, title, preview, poster, content, creator, course }) {
    try {
        const response = await axiosInstance.post('/lessons/create/', {
            slug: slug,
            title: title,
            preview: preview,
            poster: poster,
            content: content,
            creator: creator,
            course: course,
        });
        return response;
    } catch (error) {
        throw error;
    }
};