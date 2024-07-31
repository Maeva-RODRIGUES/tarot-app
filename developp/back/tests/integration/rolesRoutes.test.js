// rolesRoutes.test.js

const request = require('supertest');
const app = require('../../server');

describe('Tests pour les routes des rôles', () => {
  let roleId; // Variable pour stocker l'ID du rôle créé pour les tests suivants

  // Test pour récupérer tous les rôles
  it('GET /roles renvoie tous les rôles', async () => {
    const response = await request(app).get('/roles');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // Test pour créer un nouveau rôle
  it('POST /roles crée un nouveau rôle', async () => {
    const newRole = { name: 'Utilisateur' };
    const response = await request(app).post('/roles').send(newRole);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    roleId = response.body.id; // Stockez l'ID pour les tests suivants
  });

  // Test pour récupérer un rôle par son ID
  it('GET /roles/:id renvoie un rôle spécifique', async () => {
    const response = await request(app).get(`/roles/${roleId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', roleId);
  });

  // Test pour mettre à jour un rôle par son ID
  it('PUT /roles/:id met à jour un rôle', async () => {
    const updatedRole = { name: 'Administrateur' };
    const response = await request(app).put(`/roles/${roleId}`).send(updatedRole);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Administrateur');
  });

  // Test pour supprimer un rôle par son ID
  it('DELETE /roles/:id supprime un rôle', async () => {
    const response = await request(app).delete(`/roles/${roleId}`);
    expect(response.statusCode).toBe(204);
  });
});
