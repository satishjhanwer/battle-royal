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
  .post(async (req, res, next) => {
    const body = pick(req.body, ['email', 'password', 'name']);
    const user = new User(body);
    try {
      await user.save();
      res.json({ message: 'User added successfully!!!' });
    } catch (err) {
      next(err);
    }
  });

userRouter.route('/login').post(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = createJWT({ id: user._id });
      return res.json({ token: token });
    }
    return res.status(500).send('Something got broke, We are working on it.');
  } catch (err) {
    return next(err);
  }
});

export default userRouter;
