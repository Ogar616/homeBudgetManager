const mongoose = require("mongoose");
const userSchema = require("./data/models/user");
const { mongoUrl } = require("./config");
const fn = require("./functions");

const url = mongoUrl;

const appRouter = app => {
  app.all("/*", (req, res, next) => {
    mongoose.connect(url, {
      useNewUrlParser: true
    });
    const db = mongoose.connection;
    const UserModel = mongoose.model("users", userSchema);
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      res.users = UserModel;
      res.db = db;
      next();
    });
    db.on("close", () => {
      mongoose.disconnect();
      db.removeAllListeners();
    });
    db.on("disconnected", () => {
      console.log("Mongoose default connection is disconnected");
    });
    process.on("SIGINT", () => {
      db.close(() => {
        console.log(
          "Mongoose default connection is disconnected due to application termination"
        );
        process.exit(0);
      });
    });
    process.setMaxListeners(0);
  });

  app
    .route("/store/items")
    .get((req, res) => {
      const users = res.users;

      users.findOne({ usr: req.headers.id }).exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          res.status(500);
          return;
        }
        if (!resp) {
          const newUser = new users(fn.newUserProfile(req.headers.id));
          newUser.save(err => {
            if (err) return handleError(err);
          });
          res.status(200).send(newUser.items);
        } else {
          res.status(200).send(fn.sortByName(resp.items));
        }
      });
    })
    .post((req, res) => {
      const users = res.users;

      users
        .findOneAndUpdate(
          { usr: req.headers.id },
          { $push: { items: req.body.item } },
          { useFindAndModify: false }
        )
        .exec((err, resp) => {
          if (err) {
            console.log("error ", err);
            res.status(500);
            return;
          }
        });

      res.status(200).send({});
    })
    .put((req, res) => {
      const users = res.users;
      const { oldItem, newItem } = req.body;

      users.updateOne(
        { usr: req.headers.id, "items.name": oldItem.name },
        {
          $set: {
            "items.$.name": newItem.name,
            "items.$.info": newItem.info
          }
        },
        (err, data) => {
          if (err) {
            console.log("error ", err);
            res.status(500);
            return;
          }
        }
      );
      res.status(200).send({});
    })
    .delete((req, res) => {
      const users = res.users;

      users
        .updateOne(
          { usr: req.headers.id },
          { $pull: { items: { name: req.body.name, info: req.body.info } } }
        )
        .exec((err, resp) => {
          if (err) {
            console.log("error ", err);
            res.status(500);
            return;
          }
        });
      res.status(200).send({});
    });

  app
    .route("/store/selected")
    .get((req, res) => {
      const users = res.users;

      users.findOne({ usr: req.headers.id }).exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          res.status(500);
          return;
        }
        if (!resp) {
          const newUser = new users(fn.newUserProfile(req.headers.id));
          newUser.save(err => {
            if (err) return handleError(err);
          });
          res.status(200).send(newUser.selected);
        } else {
          res.status(200).send(fn.sortByCheckedValue(resp.selected));
        }
      });
    })
    .put((req, res) => {
      const users = res.users;
      const { oldItem, newItem } = req.body;

      users.updateOne(
        { usr: req.headers.id, "selected.name": oldItem.name },
        {
          $set: {
            "selected.$.name": newItem.name,
            "selected.$.info": newItem.info
          }
        },
        (err, data) => {
          if (err) {
            console.log("error ", err);
            res.status(500);
            return;
          }
        }
      );
      res.status(200).send({});
    });

  app.put("/store/checked", (req, res) => {
    const users = res.users;
    const { item } = req.body;

    users.updateOne(
      { usr: req.headers.id, "selected.name": item.name },
      {
        $set: {
          "selected.$.checked": item.checked
        }
      },
      (err, data) => {
        if (err) {
          console.log("error ", err);
          res.status(500);
          return;
        }
      }
    );
    res.status(200).send({});
  });

  app
    .route("/store/costs")
    .get((req, res) => {
      const users = res.users;

      users.findOne({ usr: req.headers.id }).exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          res.status(500);
          return;
        }

        res.status(200).send(resp.costs);
      });
    })
    .post((req, res) => {
      const users = res.users;

      users
        .findOneAndUpdate(
          { usr: req.headers.id },
          { $push: { costs: req.body.cost } },
          { useFindAndModify: false }
        )
        .exec((err, resp) => {
          if (err) {
            console.log("error ", err);
            res.status(500);
            return;
          }
        });
      res.status(200).send({});
    })
    .delete((req, res) => {
      const users = res.users;
      const { cost } = req.body;

      users
        .updateOne(
          { usr: req.headers.id },
          {
            $pull: {
              costs: {
                count: cost.count,
                date: cost.date,
                category: cost.category,
              }
            }
          }
        )
        .exec((err, resp) => {
          if (err) {
            console.log("error ", err);
            res.status(500);
            return;
          }
        });
      res.status(200).send({});
    })
    .put((req, res) => {
      const users = res.users;
      const { oldCost, newCost } = req.body;

      users
        .updateOne(
          { usr: req.headers.id },
          {
            $pull: {
              costs: {
                count: oldCost.count,
                date: oldCost.date,
                category: oldCost.category,
                chosenItems: oldCost.chosenItems
              }
            }
          }
        )
        .exec((err, resp) => {
          if (err) {
            console.log("error ", err);
            res.status(500);
            return;
          }
        });

      users
        .updateOne(
          { usr: req.headers.id },
          {
            $push: {
              costs: newCost
            }
          }
        )
        .exec((err, resp) => {
          if (err) {
            console.log("error ", err);
            res.status(500);
            return;
          }
        });

      res.status(200).send({});
    });

  app.put("/store", (req, res) => {
    const { items, selected } = req.body;
    const users = res.users;

    users
      .findOneAndUpdate(
        { usr: req.headers.id },
        { $pull: { items: {} } },
        { useFindAndModify: false }
      )
      .exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          res.status(500);
          return;
        }
      });

    users
      .findOneAndUpdate(
        { usr: req.headers.id },
        { $push: { items } },
        { useFindAndModify: false }
      )
      .exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          res.status(500);
          return;
        }
      });

    users
      .findOneAndUpdate(
        { usr: req.headers.id },
        { $pull: { selected: {} } },
        { useFindAndModify: false }
      )
      .exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          res.status(500);
          return;
        }
      });

    users
      .findOneAndUpdate(
        { usr: req.headers.id },
        { $push: { selected } },
        { useFindAndModify: false }
      )
      .exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          res.status(500);
          return;
        }
      });
    res.status(200).send({});
  });

  app
    .route("/store/incomes")
    .get((req, res) => {
      const users = res.users;

      users.findOne({ usr: req.headers.id }).exec((err, resp) => {
        if (err) {
          console.log("error ", err);
          res.status(500);
          return;
        }

        res.status(200).send(resp.incomes);
      });
    })
    .post((req, res) => {
      const users = res.users;

      users
        .findOneAndUpdate(
          { usr: req.headers.id },
          { $push: { incomes: req.body.income } },
          { useFindAndModify: false }
        )
        .exec((err, resp) => {
          if (err) {
            console.log("error ", err);
            res.status(500);
            return;
          }
        });
      res.status(200).send({});
    })
    .delete((req, res) => {
      const users = res.users;
      const { income } = req.body;

      users
        .updateOne(
          { usr: req.headers.id },
          {
            $pull: {
              incomes: {
                count: income.count,
                date: income.date,
                category: income.category
              }
            }
          }
        )
        .exec((err, resp) => {
          if (err) {
            console.log("error ", err);
            res.status(500);
            return;
          }
        });
      res.status(200).send({});
    });
};

module.exports = appRouter;
