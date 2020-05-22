const service = require("./profile.service");

module.exports = {
  getAll(req, res, next) {
    service.findAll()
    .then(profiles => {
      profiles
      ? res.status(200).json(profiles)
      : res.status(500).json({ msg: "failed getting" })
    })
    .catch(err => {
      next(err);
    })
  },
  submit(req, res, next) {
    const profile = req.body;

    service.create(profile)
    .then(prof => {
      prof
      ? res.status(200).json({ msg: "success creating", profile: prof })
      : res.status(500).json({ msg: "failed creating" })
    })
    .catch(err => {
      next(err);
    })
  },
  update(req, res, next) {
    const { id, update } = req.body;

    service.update(id, update)
    .then(success => {
      success
      ? res.status(200).json({ msg: "success updating" })
      : res.status(500).json({ msg: "failed updating" })
    })
    .catch(err => {
      console.log("CONTROLLER ERR: ", err)
      next(err);
    })
  }
}
