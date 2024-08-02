const request = require('supertest');
const express = require('express');
const Joi = require('joi');
const pool = require('../db');
const app = express();

app.use(express.json());

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
});

app.post('/users', async (req, res) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

describe('POST /users', () => {
    beforeAll(async () => {
        await pool.query(`CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        )`);
    });

    afterAll(async () => {
        await pool.query('DROP TABLE IF EXISTS users');
        await pool.end();
    });

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'John Doe', email: 'john.doe@example.com' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('name', 'John Doe');
        expect(res.body).toHaveProperty('email', 'john.doe@example.com');
    });

    it('should return 400 for invalid input', async () => {
        const res = await request(app)
            .post('/users')
            .send({ name: 'JD', email: 'invalid-email' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});
