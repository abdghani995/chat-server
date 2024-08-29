const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const pool = require('./dbConnect')

const createApis = app => {
  app.get('/', async (req, res) => res.send("Working"))

  app.post('/api/groups', async (req, res) => {
    try {
      const { name } = req.body;
      const grpId = uuidv4().toString();
      const key128 = crypto.randomBytes(16);  // 128-bit key
      const query = 'INSERT INTO groups (Name, Key, groupId) VALUES ($1, $2, $3) RETURNING *';
      const values = [name, key128.toString('hex'), grpId];
      const result = await pool.query(query, values);
  
      res.status(201).send(result.rows[0]);
    } catch (err) {
      console.error('PostgreSQL error', err);
      res.status(500).send({ message: 'Error creating group' });
    }
  });
  
  app.get('/api/group/:groupId', async (req, res) => {
    try {
      const { groupId } = req.params;
      const query = 'Select * from groups where groupId = $1';
      const values = [groupId];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        return res.status(404).send({ message: 'Chat Group not found' });
      } else {
        res.status(201).send(result.rows[0]);
      }
    } catch (err) {
      console.error('PostgreSQL error', err);
      res.status(500).send({ message: 'Error creating group' });
    }
  });
}

module.exports = createApis