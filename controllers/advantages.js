const fs = require('fs');
let router = new (require('express').Router)();

const upload = require('../middleware/upload')('advantages/');
const verifyToken = require('../middleware');
const checkToken = require('../middleware');
const error = require('../bin/errorHandler');

const { Advantages } = require('./../models');

router.post('', verifyToken, checkToken, upload.single('image'), (req, res, next) => {

    if (!req.body.title || !req.file || !req.body.text) {
        return error(null, 401, req, res);
    }

    const advantage = new Advantages();

    advantage.title = req.body.title;
    advantage.image = req.file.path;
    advantage.text = req.body.text;

    advantage.save((err, doc) => {
        if (err) throw (err);

        res.status(201).json({
            status: true,
            msg: 'Created',
            data: {
                id: doc._id,
                image: doc.image,
                title: doc.title,
                text: doc.text
            }
        });

    });

});

router.get('', upload.none(), (req, res, next) => {

    const lang = req.headers['lang'] ? req.headers['lang'] : 'am';

    if (req.body.id) {
        Advantages.findById({ _id: req.body.id }, (err, doc) => {

            if (err) {
                return error(err, 500, req, res);
            }

            res.status(200).json({
                status: true,
                msg: 'Success',
                data: {
                    id: doc.id,
                    image: doc.image,
                    title: doc.title[lang],
                    text: doc.text[lang]
                }
            });

        });
    } else {
        Advantages.find({}, (err, docs) => {

            if (err) {
                return error(err, 500, req, res);
            }

            res.status(200).json({
                status: true,
                msg: 'Success',
                data: docs.map(d => ({
                    id: d.id,
                    image: d.image,
                    title: d.title[lang],
                    text: d.text[lang]
                }))
            });

        });
    }

});

router.patch('', verifyToken, checkToken, upload.none(), (req, res, next) => {

    if (!req.body.id) {
        return error(null, 400, req, res);
    }

    const updated = { ...req.body };

    Advantages.findOneAndUpdate({ _id: req.body.id }, { ...updated }, { new: true }, (err, result) => {

        if (err) return error(err, 400, req, res);

        res.status(201).json({
            status: true,
            msg: 'Updated',
            data: {
                id: result._id,
                title: result.title,
                image: result.image,
                text: result.text
            }
        });

    });

});


router.delete('', verifyToken, checkToken, upload.none(), (req, res, next) => {

    Advantages.findByIdAndDelete({ _id: req.body.id }, (err, doc) => {

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
