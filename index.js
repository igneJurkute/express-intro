import express from 'express';
import birds from './routes/birds.js';

const app = express();
const port = 3000;

// ###########################################################

function beforeAnything(req, res, next) {
    req.timeStart = Date.now();
    next();
}

function beforeAnything2(req, res, next) {
    req.middlewareText = 'Hello from the middle... :P';
    next();
}

app.use(beforeAnything);
app.use(beforeAnything2);

// ###########################################################

app.use(express.static('public'));

app.post('/', (req, res) => {
    res.send('Got a POST request');
});

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <link rel="stylesheet" href="/css/main.css">
            <link rel="stylesheet" href="/css/button.css">
            <link rel="stylesheet" href="/css/error.css">
        </head>
        <body>
            <h1>HOME PAGE CONTENT</h1>
            <button class="btn">Click me</button>
        </body>
        </html>`);
});

// ###########################################################

app.get('/middle', (req, res) => {
    console.log('Uztruko (ms):', Date.now() - req.timeStart);

    res.json({
        time: req.timeStart,
        end: Date.now(),
        diff: Date.now() - req.timeStart,
        text: req.middlewareText,
    });
});

// ###########################################################

app.use('/birds', birds);

// ###########################################################

function pirmas(req, res, next) {
    console.log('pirma console...');
    if (Math.random() > 0.2) {
        next();
    } else {
        next('route');
    }
}

function antras(req, res, next) {
    console.log('antra console...');
    if (Math.random() > 0.2) {
        next();
    } else {
        next('route');
    }
}

function trecias(req, res, next) {
    console.log('trecia console...');
    if (Math.random() > 0.2) {
        next();
    } else {
        next('route');
    }
}

function ketvirtas(req, res, next) {
    console.log('ketvirta console...');
    if (Math.random() > 0.2) {
        next();
    } else {
        next('route');
    }
}

function nuoIki(req, res, next) {
    console.log('PIRMAS');
    if (Math.random() > 0.9) {
        return next();
    }

    console.log('ANTRAS');
    if (Math.random() > 0.8) {
        return next();
    }

    console.log('TRECIAS');
    if (Math.random() > 0.7) {
        return next();
    }

    console.log('KETVIRTAS');
    if (Math.random() > 0.6) {
        return next();
    }

    return next();
}

function penktas(req, res, next) {
    console.log('penkta console...');
    res.send('penktas responsive...');
}

const kaDaryti = [pirmas, antras];

app.get('/pirmadienis', kaDaryti, trecias, ketvirtas);
app.get('/pirmadienis', nuoIki);
app.get('/pirmadienis', penktas);

// ###########################################################

app.get('/about', (req, res) => {
    res.send('About page!');
});

// ###########################################################

const gautiKebaba = (req, res) => res.send('Stai tavo kebabas!');
const pagamintiKebaba = (req, res) => res.send('Tavo kebabas pagamintas!');
const pasildytiKebaba = (req, res) => res.send('Tavo kebabas pasildytas!');
const ismestiKebaba = (req, res) => res.send('😬😬😬');

app.route('/kebabas')
    .get(gautiKebaba)
    .post(pagamintiKebaba)
    .put(pasildytiKebaba)
    .delete(ismestiKebaba);

// app.get('/kebabas', gautiKebaba);
// app.post('/kebabas', pagamintiKebaba);
// app.put('/kebabas', pasildytiKebaba);
// app.delete('/kebabas', ismestiKebaba);

// ###########################################################

app.all('/secret', (req, res, next) => {
    console.log('Accessing the secret section ...');
    console.log(req.method);
    res.send('SECRET!!!');
});

app.get('/services?', (req, res) => {
    res.send('Services list page!');
});

app.get('/users/:userId/books/:bookId', (req, res) => {
    console.log(req.params);
    if (req.params.bookId > 1000) {
        res.send('ERROR: tokia knyga neegzistuoja');
    }
    res.send(req.params);
});

app.get('*', (req, res) => {
    res.send('404 page!');
});

app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});