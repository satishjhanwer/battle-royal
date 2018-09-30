import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BattleSchema = new Schema(
  {
    name: { type: String },
    year: { type: Number },
    battle_number: { type: Number },
    attacker_king: { type: String },
    defender_king: { type: String },
    attacker_1: { type: String },
    attacker_2: { type: String },
    attacker_3: { type: String },
    attacker_4: { type: String },
    defender_1: { type: String },
    defender_2: { type: String },
    defender_3: { type: String },
    defender_4: { type: String },
    attacker_outcome: { type: String },
    battle_type: { type: String },
    major_death: { type: Number },
    major_capture: { type: Number },
    attacker_size: { type: String },
    defender_size: { type: Number },
    attacker_commander: { type: String },
    defender_commander: { type: String },
    summer: { type: Number },
    location: { type: String },
    region: { type: String },
    note: { type: String }
  },
  {
    timestamps: true
  }
);

// Return data for defender size based on min, max and avg
BattleSchema.statics.defenderSize = function(callback) {
  const Battle = this;
  const defender_size = {};
  Battle.aggregate(
    [
      {
        $match: {
          defender_size: { $ne: '' }
        }
      },
      {
        $group: {
          _id: '',
          min: { $min: '$defender_size' },
          max: { $max: '$defender_size' },
          avg: { $avg: '$defender_size' },
          battleType: { $addToSet: '$battle_type' }
        }
      }
    ],
    (err, data) => {
      if (err) {
        return callback(err);
      }
      defender_size.min = data[0] ? data[0].min : '';
      defender_size.max = data[0] ? data[0].max : '';
      defender_size.avg = data[0] ? data[0].avg : '';
      const battleType = data[0] ? data[0].battleType : '';
      callback(null, defender_size, battleType);
    }
  );
};

// Return data for most active king data
BattleSchema.statics.findMostActiveData = function(callback) {
  const Battle = this;
  Battle.aggregate(
    [
      {
        $facet: {
          AttackerKing: [
            { $group: { _id: '$attacker_king', total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $project: { attacker_king: 1 } },
            { $limit: 1 }
          ],
          DefenderKing: [
            { $group: { _id: '$defender_king', total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $project: { defender_king: 1 } },
            { $limit: 1 }
          ],
          Region: [
            { $group: { _id: '$region', total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $project: { region: 1 } },
            { $limit: 1 }
          ],
          Name: [
            { $group: { _id: '$name', total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $project: { name: 1 } },
            { $limit: 1 }
          ],
          AttackerOutcome: [
            { $group: { _id: '$attacker_outcome', total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $project: { total: 1 } }
          ]
        }
      }
    ],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result[0]);
    }
  );
};

export default mongoose.model('battle', BattleSchema, 'battle');
