const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const auth = require("./auth.js");
const bcrypt = require("bcrypt");
const db = require("./db");
const reports = require('./reports')
require("dotenv").config();

app = express();
PORT = process.env.PORT || 3001;

// Express Use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
db.connDB();

// Auth assets
const authenticateToken = auth.authenticateToken;
const createToken = auth.createTokens;
const saltRound = 10;

app.get("/", (req, res) => {
  res.sendStatus(418);
});

// Authorization Test...
app.get("/users", authenticateToken, (req, res) => {
  res.json({ userID: "something", status: "success" });
});

app.post("/posts", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// Authorized Operations
app.post("/spendMoney", authenticateToken, (req, res) => {
  const expenseData = { username: req.user.name, amount: req.body.amount };
  const updateFilter = {
    userName: req.user.name,
    dateAdded: new Date().toDateString(),
  };

  db.expense
    .getLastDayExpense(expenseData.username)
    .then((exists) =>
      !exists ? db.expense.create(expenseData) : db.expense.update(expenseData)
    ).then(response => res.json(response))
});

app.post("/got-income", authenticateToken, (req, res) => {
  const username = req.user.name;
  const amount = req.body.amount;

  if (!amount) res.sendStatus(400);

  // save to database
  db.income
    .addIncome({ username: username, amount: amount })
    .then((response) => res.json(response))
});

app.post("/plan/make-plan", authenticateToken, (req, res) => {
  const { amount, duration } = req.body;
  if (!amount || !duration) res.sendStatus(400);

  const username = req.user.name;

  db.plan
    .makePlan({ username: username, amount: amount, duration: duration })
    .then((response) => {
      res.json(response);
    });
});

app.delete("/plan/remove-plan", authenticateToken, (req, res) => {
  const username = req.user.name;

  db.plan.removePlan(username).then((response) => {
    res.json(response);
  });
});

app.post("/loan/make-loan", authenticateToken, (req, res) => {
  const { amount, duration, isDebt } = req.body;
  if (!amount || !duration || isDebt === undefined) return res.sendStatus(400);

  const username = req.user.name;

  db.loan.makeLoan({
    username: username,
    amount: amount,
    duration: duration,
    isDebt: isDebt,
    toPerson: req.body.toPerson
  }).then((dbResponse) => {res.json(dbResponse)})
});

app.patch('/loan/set-loan-inactive', authenticateToken, (req, res) => {
  const loanID = req.body.loanID
  const username = req.user.name

  if(!loanID) return res.sendStatus(400)

  db.loan.setLoanInactive(loanID, username)
  .then((response) => res.json(response))
})

// Report API
app.get('/report/expense-report', authenticateToken, (req, res) => {
  reports.wholeReport(req.user.name)
  .then((response) => res.json(response))
})

app.get('/report/profile-report', authenticateToken, (req, res) => {
  reports.profileReport(req.user.name)
  .then((response) => res.json(response))
})

app.get('/report/debt-report', authenticateToken, (req, res) => {
  reports.debtReport(req.user.name)
  .then((response) => res.json(response))
})

// Authentication routes
app.post("/login", (req, res) => {
  const user = req.body;

  if (!user) return res.sendStatus(400);

  //User authentication
  auth.authenticateUser(user).then((result) => {
    if (!result) return res.sendStatus(400);

    //Token Creation
    const userName = user.username;
    const User = { name: userName };

    const accessToken = createToken(User);
    const refreshToken = jwt.sign(
      User,
      process.env.REFRESH_ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  });
});

app.post("/signup", (req, res) => {
  const userData = req.body;

  if (!userData) return res.sendStatus(400);

  const password = userData.password;
  const username = userData.username;
  if (!password || db.user.getUser(username)) return res.sendStatus(400);

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }

    // Saving new user to database
    userData.password = hash;
    db.user.createUser(userData);

    // create jwt token
    const User = { name: username };
    const accessToken = createToken(User);
    const refreshToken = jwt.sign(
      User,
      process.env.REFRESH_ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
  });
});

app.post("/refresh-token", (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken) return res.sendStatus(401);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_ACCESS_TOKEN_SECRET,
    (err, user) => {
      if (err) return res.sendStatus(403);
      const accessToken = createToken({ name: user.name });
      return res.json({ token: accessToken });
    }
  );
});

// Listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
