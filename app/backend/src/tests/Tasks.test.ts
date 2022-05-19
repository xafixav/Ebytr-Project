import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Tasks from '../database/models/Tasks';
import Users from '../database/models/Users';
import { allTasksMock, adminCorrect } from './Mocks/tasks';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the sucess cases for get method /tasks', () => {
// Exemplo do uso de stubs com tipos
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Tasks, "findAll")
      .resolves(allTasksMock as any);
    sinon
      .stub(Users, "findOne")
      .resolves(adminCorrect as any);
  });

  after(()=>{
    (Tasks.findAll as sinon.SinonStub).restore();
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('When made a get request into /tasks, respond with all Tasks in DB', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
         user: 'xafixav',
         password: 'secret_xafixav'
       })
       .then(async (res) => {
          return chai
          .request(app)
          .get('/tasks')
          .set('Authorization', res.body.token)
          .then((response) => {
             return response;
           });
       });
    expect(chaiHttpResponse.status).to.deep.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(allTasksMock);
  });

});