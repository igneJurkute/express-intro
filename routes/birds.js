import express from 'express';
const router = express.Router();

const getBird = (req, res) => res.send('Paukstis: gauta.');
const postBird = (req, res) => res.send('Paukstis: sukurta.');

const aboutBirds = (req, res) => res.send('About birds page from "birds" router...')
const countBirds = (req, res) => res.json({ count: 0 });

router.get('/', getBird);
router.post('/', postBird);

router.get('/about', aboutBirds);
router.get('/count', countBirds);

export default router;