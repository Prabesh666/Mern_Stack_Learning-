import { v2 as cloudinary } from 'cloudinary';


const CLOUDINARY_FOLDER = "Learning-MernStack";
async function uploadFile(files) {
    const uploadResults = [];
    for (const file of files) {
        console.log(file);
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({
                        folder: CLOUDINARY_FOLDER,
                    },
                    (error, data) => {
                        if (error) return reject(error);

                        return resolve(data);
                    })
                .end(file.buffer);
        });
        uploadResults.push(result);
    }
    return uploadResults;
}

export default uploadFile;