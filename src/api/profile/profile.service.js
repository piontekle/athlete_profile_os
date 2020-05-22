const Profile = require("../../models").Profile;

module.exports = {
  async findAll() {
    return await Profile.find({});
  },
  async create(profile) {
    try {
      const newProf = await new Profile(profile);
      newProf.save();

      return newProf;
    } catch(err) {
      console.log(err);
      return null;
    }
  },
  async update(id, newProfile) {
    try {
      const updated = await Profile.findByIdAndUpdate(
        id,
        newProfile,
        { new: true }
      );

      if (!updated) return false;

      return true;
    } catch(err) {
      console.log(err);
      return null;
    }
  }
}
