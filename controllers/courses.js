const fs = require('fs');
let router = new (require('express').Router)();

const upload = require('../middleware/upload')('courses/');
const verifyToken = require('../middleware');
const checkToken = require('../middleware');
const error = require('../bin/errorHandler');

const { Courses } = require('./../models');


router.post('', verifyToken, checkToken, upload.single('image'), (req, res, next) => {

    if (!req.body.title || !req.body.desc || !req.body.slug) {
        return error(null, 401, req, res);
    }

    const courses = new Courses();

    courses.title = req.body.title;
    courses.desc = req.body.desc;
    courses.slug = req.body.slug;

    courses.text = req.body.text ? req.body.text : null;
    courses.href = req.body.href ? req.body.href : null;
    courses.dif = req.body.dif ? req.body.dif : 0;

    courses.infoBlocks = req.body.infoBlocks ? req.body.infoBlocks : [];
    courses.discountBlocks = req.body.discountBlocks ? req.body.discountBlocks : [];
    courses.instructors = req.body.instructors ? req.body.instructors : [];

    courses.whoCanAttend = req.body.whoCanAttend ? req.body.whoCanAttend : {
        title: null,
        checkboxes: []
    };

    courses.administrative = req.body.administrative ? req.body.administrative : {
        duration: null,
        price: null,
        startDate: null
    };

    courses.opportunities = req.body.opportunities ? req.body.opportunities : [];

    courses.status = req.body.status ? req.body.status : 0;
    courses.syllabus = req.body.syllabus ? req.body.syllabus : [];
    courses.lang = req.body.lang ? req.body.lang : null;

    courses.image = req.file ? req.file.path : null;

    courses.save((err, doc) => {
        if (err) throw (err);

        res.status(201).json({
            status: true,
            msg: 'Created',
            data: {
                id: doc._id,
                slug: doc.slug,
                title: doc.title,
                desc: doc.desc,
                image: doc.image,
                infoBlocks: doc.infoBlocks,
                discountBlocks: doc.discountBlocks,
                instructors: doc.instructors,
                whoCanAttend: doc.whoCanAttend,
                administrative: doc.administrative,
                opportunities: doc.opportunities,
                status: doc.status,
                syllabus: doc.syllabus,
                lang: doc.lang,
            }
        });
    });

});

router.get('', upload.none(), (req, res, next) => {

    const lang = req.headers['lang'] ? req.headers['lang'] : 'am';

    if (req.body.slug) {
        Courses.findOne({ slug: req.body.slug }, (err, doc) => {

            if (err) {
                return error(err, 500, req, res);
            }

            res.status(200).json({
                status: true,
                msg: 'Success',
                data: {
                    id: doc._id,
                    slug: doc.slug,
                    title: doc.title[lang],
                    desc: doc.desc[lang],
                    text: doc.text[lang],
                    image: doc.image,
                    infoBlocks: doc.infoBlocks.map(inf => ({
                        img: inf.img,
                        title: inf.title[lang],
                        desc: inf.desc[lang]
                    })),
                    discountBlocks: doc.discountBlocks.map(dis => ({
                        percent: dis.percent,
                        title: dis.title[lang]
                    })),
                    instructors: doc.instructors,
                    whoCanAttend: {
                        title: doc.whoCanAttend.title[lang],
                        checkboxes: doc.whoCanAttend.checkboxes.map(ch => ch[lang])
                    },
                    administrative: doc.administrative,
                    opportunities: doc.opportunities.map(op => ({
                        img: op.img,
                        title: op.title[lang]
                    })),
                    status: doc.status,
                    syllabus: doc.syllabus.map(s => s[lang]),
                    lang: doc.lang,
                }
            });

        });
    } else {
        Courses.find({}, (err, docs) => {

            if (err) {
                return error(err, 500, req, res);
            }

            res.status(200).json({
                status: true,
                msg: 'Success',
                data: docs.map(d => (
                    {
                        slug: d.slug,
                        title: d.title[lang],
                        desc: d.desc[lang],
                        image: d.image,
                        status: d.status,
                        lang: d.lang,
                    }
                ))
            });

        });
    }

});

router.patch('', verifyToken, checkToken, upload.none(), (req, res, next) => {

    if (!req.body.id) {
        return error(null, 400, req, res);
    }

    const updated = { ...req.body };

    Courses.findOneAndUpdate({ _id: req.body.id }, { ...updated }, { new: true }, (err, result) => {

        if (err) return error(err, 400, req, res);

        res.status(201).json({
            status: true,
            msg: 'Updated',
            data: {
                id: result._id,
                slug: result.slug,
                title: result.title,
                desc: result.desc,
                image: result.image,
                infoBlocks: result.infoBlocks,
                discountBlocks: result.discountBlocks,
                instructors: result.instructors,
                whoCanAttend: result.whoCanAttend,
                administrative: result.administrative,
                opportunities: result.opportunities,
                status: result.status,
                syllabus: result.syllabus,
                lang: result.lang,
            }
        });

    });

});

router.delete('', verifyToken, checkToken, upload.none(), (req, res, next) => {

    Courses.findByIdAndDelete({ _id: req.body.id }, (err, doc) => {

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
