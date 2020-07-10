const fs = require('fs');
const multer = require('multer');

const upload = (uniqPath) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const path = uniqPath ? './uploads/' + uniqPath : './uploads/';
            fs.mkdirSync(path, { recursive: true });

            return  cb(null, path);
        },
        filename: (req, file, cb) => {
            cb(null, new Date().toDateString() + '-' + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpeg' ||
            file.mimetype === 'image/jpg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    return multer({
        storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter

    });
};

module.exports = upload;