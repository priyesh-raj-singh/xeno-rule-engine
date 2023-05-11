
//Importing dependencies
const express = require("express");
require("dotenv").config({ path: "./.env" });
const app = express();
const database = require("./configuration/databaseConfig");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//creating database connection
database()
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Connection to database failed"));
const ruleDatabase = require("./models/ruleModel");


//creating rule
app.post("/rule", async (req, res) => {
  const toSave = {
    rule: JSON.stringify(req.body)
  }
  return res.status(201).json(await ruleDatabase.create(toSave));
});

//verifying rule 
app.post("/rule/verify", async (req, res) => {
  try {
    const operationsObject = {
      equals: '===',
      greaterThan: '>',
      lessThan: '<'
    }
    console.log(req.body.ruleId);
    let rules = await ruleDatabase.findById(req.body.ruleId);
    rules = JSON.parse(rules.rule);

    console.log(rules)
    const result = []
    console.log(req.body)
    for (const [key, value] of Object.entries(req.body)) {
      if (key === 'ruleId')
        continue;
      const ruleAssociatedWithKey = rules.filter(val => Object.keys(val)[0] === key)[0];
      console.log(ruleAssociatedWithKey);
      const evalString = `'${ruleAssociatedWithKey[key]}' ${operationsObject[ruleAssociatedWithKey['operation']]} '${value}'`
      console.log(evalString)
      if (!eval(evalString))
        throw new Error("Condition Failed");
      result.push(ruleAssociatedWithKey['effect']);
    }
    return res.status(200).json(result);
  } catch (e) {
    return res.status(400).json(e.message);
  }
})

//starting server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server started"));