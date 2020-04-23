const bcrypt = require('bcryptjs');

const router = require("express").Router();
const Users = require("../endpoints/user-model.js");

router.post("/register", (req, res) => {

  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 16);

  user.password = hash;

  Users.add(user)
    .then(creds => {
      res.status(201).json({creds});
    })
    .catch(err => res.send({message: 'There was a problem with the db', err}));
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  Users.findBy({username})
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = username;
        res.status(200).json({message: `Welcome ${username}!`})
      } else {
        res.status(401).json({message: 'Invalid Credentials'})
      }
    })
    .catch(err => {
      res.status(500).json({message: 'There was a problem with the db', err})
    })
})

module.exports = router;