import { pick } from 'lodash';
import bcrypt from 'bcryptjs';
import express from 'express';
import User from '../models/user';
import { createJWT } from '../utils/token-generator';

const userRouter = express.Router();

userRouter
  .route('/')
  .get((req, res) => {
    User.find({})
      .then(
        (doc) => res.status(200).json(doc),
        (err) => res.status(400).send(err)
      )
      .catch((err) => res.status(400).send(err));
  })
  .post((req, res, next) => {
    const body = pick(req.body, ['email', 'password', 'name']);
    const user = new User(body);
    user.save((err) => {
      if (err) next(err);
      res.json({ message: 'User added successfully!!!' });
    });
  });

userRouter.route('/login').post((req, res, next) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) next(err);
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = createJWT({ id: user._id });
      res.json({ token: token });
    } else {
      res.status(500).send('Something got broke, We are working on it.');
    }
  });
});

export default userRouter;
