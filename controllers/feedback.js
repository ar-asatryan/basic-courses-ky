const fs = require('fs');
let router = new (require('express').Router)();

const upload = require('../middleware/upload')('feedback/');
const verifyToken = require('../middleware');
const checkToken = require('../middleware');
const error = require('../bin/errorHandler');

const { Feedback } = require('./../models');

router.post('', verifyToken, checkToken, upload.single('image'), (req, res, next) => {

    if (!req.body.name || !req.body.comment) {
        return error(null, 401, req, res);
    }

    const feedback = new Feedback();

    feedback.name = req.body.name;
    feedback.comment = req.body.comment;

    if (req.file) {
        feedback.image = req.file.path;
    } else {
        feedback.image = null;
    }

    feedback.save((err, doc) => {
        if (err) throw (err);

        res.status(201).json({
            status: true,
            msg: 'Created',
            data: {
                id: doc._id,
                name: doc.name,
                comment: doc.comment,
                image: doc.image
            }
        });

    });

});

router.get('', upload.none(), (req, res, next) => {

    const lang = req.headers['lang'] ? req.headers['lang'] : 'am';

    if (req.body.id) {
        Feedback.findById({ _id: req.body.id }, (err, doc) => {

            if (err) {
                return error(err, 500, req, res);
            }

            res.status(200).json({
                status: true,
                msg: 'Success',
                data: {
                    id: doc.id,
                    name: doc.name[lang],
                    comment: doc.comment[lang],
                    image: doc.image
                }
            });

        });
    } else {
        Feedback.find({}, (err, docs) => {

            if (err) {
                return error(err, 500, req, res);
            }

            res.status(200).json({
                status: true,
                msg: 'Success',
                data: docs.map(d => ({
                    id: d.id,
                    name: d.name[lang],
                    comment: d.comment[lang],
                    image: d.image
                }))
            });

        });
    }

});

router.patch('', verifyToken, checkToken, upload.single('image'), (req, res, next) => {

    if (!req.body.id) {
        return error(null, 400, req, res);
    }

    const updated = { ...req.body };

    Feedback.findOneAndUpdate({ _id: req.body.id }, { ...updated }, { new: true }, (err, result) => {

        if (err) return error(err, 400, req, res);

        res.status(201).json({
            status: true,
            msg: 'Updated',
            data: {
                id: result._id,
                name: result.name,
                comment: result.comment,
                image: result.image
            }
        });

    });

});

router.delete('', verifyToken, checkToken, upload.none(), (req, res, next) => {

    Feedback.findByIdAndDelete({ _id: req.body.id }, (err, doc) => {

        if (err) return res.status(500).send(err);

        if (!doc) {
            return error(err, 400, req, res);
        } else {
            if (doc.image) {
                fs.unlink(path.resolve('./', doc.image), (err, data) => {
                    if (err) {
                        throw err
                    }
                });
            }

            res.status(200).json({
                status: true,
                msg: 'Section deleted',
            });
        }

    });

});


module.exports = router;
