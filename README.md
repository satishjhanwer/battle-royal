# Battle Royal API

## Heroku and MLab

1. Configured database on MLab and provided the env variable
2. Configure `DB_URL`, `TOKEN_SECRET`, `PORT` env variables on heroku

## APIs

Steps to generate JWT token

### Create New User

- URL - `https://battle-royal-api.herokuapp.com/user/` (POST)
- Payload

  ```bash
    email:satish.jhanwer@gmail.com
    password:Satish@123
    name:Satish Jhanwer
  ```

- Returns

  ```bash
    {
      "message": "User added successfully!!!"
    }
  ```

### Login and Get JWT Token

- URL - `https://battle-royal-api.herokuapp.com/user/login` (POST)
- Payload

  ```bash
    email:satish.jhanwer@gmail.com
    password:Satish@123
  ```

- Returns

  ```bash
    {
      "token": <token value>
    }
  ```

Use token which is generated from previous step for further api calls

### Get Locations

- URL - `https://battle-royal-api.herokuapp.com/api/list` (GET)
- Header

  ```bash
    x-access-token: <token value>
  ```

- Returns list of distinct battle locations

### Get Battle Count

- URL - `https://battle-royal-api.herokuapp.com/api/count` (GET)
- Header

  ```bash
    x-access-token: <token value>
  ```

- Returns total no. of battles.

### Search

- URL - `https://battle-royal-api.herokuapp.com/api/search` (GET)
- Header

  ```bash
    x-access-token: <token value>
  ```

- Eg: `/api/search?king=Robb Stark&location=Golden Tooth&battle_type=pitched battle`

### Get Stats

- URL - `https://battle-royal-api.herokuapp.com/api/stats` (GET)
- Header

  ```bash
    x-access-token: <token value>
  ```

- Returns Battle stats.
- Response

  ```bash
  {
    "most_active": {
      "attacker_king": "Joffrey/Tommen Baratheon",
      "defender_king": "Robb Stark",
      "region": "The Riverlands",
      "name": "Siege of Winterfell"
    },
    "attacker_outcome": {
      "win": 32,
      "loss": 5
    },
    "defender_size": {
      "min": 100,
      "max": 20000,
      "avg": 6428.1578947368425
    },
    "battle_type": [
      "",
      "siege",
      "ambush",
      "pitched battle"
    ]
  }
  ```
