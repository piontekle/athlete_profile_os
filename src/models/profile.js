const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: { type: String },
    dob: { type: String },
    nationality: { type: String },
    location: { type: String },
    association: { type: String },
    team: { type: String },
    gender: { type: String },
    sports: { type: Array },
    about: { type: String },
    interests: { type: Array },
    charities: { type: Array },
    social: { type: Array },
    pets: { type: Array },
    alcohol: { type: Boolean },
    married: { type: Boolean }
  }
);

const Profile = mongoose.model("Profile", schema);

module.exports = Profile;
