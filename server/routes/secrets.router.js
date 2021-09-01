const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

router.get('/', (req, res) => {
  // what is the value of req.user????
  console.log('req.user:', req.user);
  console.log('id is', req.user.id);
  


      if(!req.user) {
        res.sendStatus(403);
        return
    }

    let queryText = `SELECT * FROM "secret";`
    
    if (req.user.clearance_level <= 10) {
      queryText = `SELECT * FROM "secret"
                  WHERE secrecy_level < 10
      ;`
    }

  // let queryParams = [req.user.id];

  pool.query(queryText)
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
