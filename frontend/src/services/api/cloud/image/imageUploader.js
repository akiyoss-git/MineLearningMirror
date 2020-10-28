import axios from 'axios';
const CLOUDINARY_UPLOAD_TRANSFORM_PRESET = 'dfnrvqvx'; // img transformed to 200x200
const CLOUDINARY_UPLOAD_PRESET = 'aes3rcs1';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/noface312/image/upload/';

export const imageUploadApi = (file, transform = true) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'aes3rcs1');
    formData.append("api_key", '496662936339743');
    formData.append("timestamp", (Date.now() / 1000) | 0);
    return axios.post("https://api.cloudinary.com/v1_1/noface312/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
    });
};