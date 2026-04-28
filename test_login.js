const { login } = require('./server/controllers/auth.controller');

async function test() {
  const req = {
    body: {
      email: 'somchai@email.com',
      password: 'password'
    }
  };
  const res = {
    statusCode: null,
    jsonData: null,
    status: function(code) {
      this.statusCode = code;
      return this;
    },
    json: function(data) {
      this.jsonData = data;
      return this;
    }
  };
  
  try {
    await login(req, res);
    console.log('Status code:', res.statusCode);
    console.log('Data:', res.jsonData);
  } catch (e) {
    console.log('Caught exception in test:', e);
  }
}
test();
