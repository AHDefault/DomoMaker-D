const makerPage = (req, res) => {
  Domo.DomoModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }
    if (docs.length == 5) {
      return res.render('dance', {domos: docs});
    }
    return res.render('app', { csrfToken: req.csrfToken(), domos: docs });
  });
};

const models = require('../models');

const Domo = models.Domo;

const makeDomo = (req, res) => {
  if (!req.body.name || !req.body.age || !req.body.color) {
    return res.status(400).json({ error: 'RAWR! Both name and age and color are required' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    color: req.body.color,
    owner: req.session.account._id,
  };

  const newDomo = new Domo.DomoModel(domoData);

  return newDomo.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ redirect: '/maker' });
  });
};

module.exports.makerPage = makerPage;
module.exports.make = makeDomo;
