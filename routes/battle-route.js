import async from 'async';
import express from 'express';
import Battle from '../models/battle';

const battleRouter = express.Router();

// Return list of all the places where battle has taken place
battleRouter.route('/list').get((req, res) => {
  Battle.distinct('location', { location: { $ne: '' } }, (err, list) => {
    if (err) {
      return res.status(500).send('Something got broke, We are working on it.');
    }
    return res.status(200).json(list);
  });
});

// Return total number of battle occurred
battleRouter.route('/count').get((req, res) => {
  Battle.countDocuments({}, (err, count) => {
    if (err) {
      return res.status(500).send('Something got broke, We are working on it.');
    }
    console.log(count);
    return res.json({ total: count });
  });
});

// Return searched data based on search params
battleRouter.route('/search').get((req, res) => {
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

  Battle.find({ $and: resultantQuery }, (err, result) => {
    if (err) {
      return res.status(500).send('Something got broke, We are working on it.');
    }
    return res.json(result);
  });
});

battleRouter.route('/stats').get((req, res) => {
  const stats = { most_active: {}, attacker_outcome: {} };

  async.waterfall(
    [
      (callback) => {
        Battle.findMostActiveData((err, result) => {
          stats.most_active.attacker_king = result.AttackerKing[0]._id;
          stats.most_active.defender_king = result.DefenderKing[0]._id;
          stats.most_active.region = result.Region[0]._id;
          stats.most_active.name = result.Name[0]._id;
          stats.attacker_outcome.win = result.AttackerOutcome[0].total;
          stats.attacker_outcome.loss = result.AttackerOutcome[1].total;
          callback(err);
        });
      },
      (callback) => {
        Battle.defenderSize((err, defenderSize, battleType) => {
          stats.defender_size = defenderSize;
          stats.battle_type = battleType;
          callback(err);
        });
      }
    ],
    (err) => {
      if (err) {
        return res
          .status(500)
          .send('Something got broke, We are working on it.');
      }
      return res.json(stats);
    }
  );
});

export default battleRouter;
