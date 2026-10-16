import express from 'express';
import Battle from '../models/battle';

const battleRouter = express.Router();

// Return list of all the places where battle has taken place
battleRouter.route('/list').get(async (req, res) => {
  try {
    const list = await Battle.distinct('location', { location: { $ne: '' } });
    return res.status(200).json(list);
  } catch {
    return res.status(500).send('Something got broke, We are working on it.');
  }
});

// Return total number of battle occurred
battleRouter.route('/count').get(async (req, res) => {
  try {
    const count = await Battle.countDocuments({});
    console.log(count);
    return res.json({ total: count });
  } catch {
    return res.status(500).send('Something got broke, We are working on it.');
  }
});

// Return searched data based on search params
battleRouter.route('/search').get(async (req, res) => {
  const query = req.query;
  const resultantQuery = [];
  for (const key in query) {
    if (key === 'king') {
      resultantQuery.push({
        $or: [{ attacker_king: query[key] }, { defender_king: query[key] }]
      });
    } else {
      resultantQuery.push({ [key]: query[key] });
    }
  }

  try {
    const result = await Battle.find({ $and: resultantQuery });
    return res.json(result);
  } catch {
    return res.status(500).send('Something got broke, We are working on it.');
  }
});

battleRouter.route('/stats').get(async (req, res) => {
  try {
    const [result, size] = await Promise.all([
      Battle.findMostActiveData(),
      Battle.defenderSize()
    ]);
    const stats = {
      most_active: {
        attacker_king: result.AttackerKing[0]._id,
        defender_king: result.DefenderKing[0]._id,
        region: result.Region[0]._id,
        name: result.Name[0]._id
      },
      attacker_outcome: {
        win: result.AttackerOutcome[0].total,
        loss: result.AttackerOutcome[1].total
      },
      defender_size: size.defender_size,
      battle_type: size.battle_type
    };
    return res.json(stats);
  } catch {
    return res.status(500).send('Something got broke, We are working on it.');
  }
});

export default battleRouter;
