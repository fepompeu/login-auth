const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;

const User = require("../models/User");
const database = require("../database/models");

const { InvalidArgumentErrorr } = require("../utils/errors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// const blacklist = require('../../redis/manipula-blacklist');

function verifyUser(user) {
  if (!user) {
    throw new InvalidArgumentError("Email not found!");
  }
}

// async function verifyTokenNaBlacklist(token) {
//   const tokenNaBlacklist = await blacklist.contemToken(token);
//   if (tokenNaBlacklist) {
//     throw new jwt.JsonWebTokenError('Invalid Token per logout!');
//   }
// }

async function verifyPassword(password, passwordHash) {
  const passwordValida = await bcrypt.compare(password, passwordHash);
  if (!passwordValida) {
    throw new InvalidArgumentError("Password or email wrong!");
  }
}

passport.use(
  new LocalStrategy(
    {
      emailField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await database.Users.findOne({
          where: {
            email: email,
          },
        });

        verifyUser(user);
        await verifyPassword(password, user.passwordHash);

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      await verificaTokenNaBlacklist(token);
      const payload = jwt.verify(token, process.env.CHAVE_JWT);
      const user = await database.Users.findOne({ where: { id: payload.id } });
      done(null, user, { token: token });
    } catch (error) {
      done(error);
    }
  })
);
