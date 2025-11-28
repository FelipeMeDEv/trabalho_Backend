const request = require('supertest');
const app = require('../src/app');
const mongoose = require('mongoose');
const Tarefa = require('../src/models/Tarefa');

describe('API Tarefas', () => {
    let token;
    let tarefaId;

    beforeAll(async () => {
        const res = await request(app).post('/auth/login');
        token = res.body.token;
    });

    afterAll(async () => {
        await Tarefa.deleteMany({});
        await mongoose.connection.close();
    });

    it('Deve criar uma tarefa (POST)', async () => {
        const res = await request(app)
            .post('/tarefas')
            .set('Authorization', `Bearer ${token}`)
            .send({ nome: "Estudar Node.js" });
        
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        tarefaId = res.body.id;
    });

    it('Deve retornar erro 422 ao criar sem nome', async () => {
        const res = await request(app)
            .post('/tarefas')
            .set('Authorization', `Bearer ${token}`)
            .send({});
        expect(res.statusCode).toEqual(422);
    });

    it('Deve listar tarefas (GET)', async () => {
        const res = await request(app).get('/tarefas');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Deve atualizar uma tarefa (PUT)', async () => {
        const res = await request(app)
            .put(`/tarefas/${tarefaId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({ concluida: true });
        
        expect(res.statusCode).toEqual(200);
        expect(res.body.concluida).toBe(true);
    });
});