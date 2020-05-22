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
    interests: { type: Array },
    charities: { type: Array },
    pets: { type: Array },
    alcohol: { type: Boolean, default: false },
    married: { type: Boolean, default: false },
    email: { type: String },
    social: { type: Array }
  }
);

schema.pre('save', function(next) {
  const self = this;
  const arrays = [
    this.sports, this.interests, this.charities, this.pets, this.social
  ]
  for (let i = 0; i < arrays.length; i++) {
    if (typeof arrays[i] === "string") {
      arrays[i] = arrays[i].replace(/\s/g, '').split(",");
    }
  }
  next();
})

schema.pre('findOneAndUpdate', function(next) {
  try {
    const arrays = ["sports", "interests", "charities", "pets", "social"];

    for (let i = 0; i < arrays.length; i++) {
      if (this._update[arrays[i]].length && typeof this._update[arrays[i]] === "string") {
        this._update[arrays[i]] =
          this._update[arrays[i]].replace(/\s/g, '').split(",");
      }
    }
    next();
  } catch(err) {
    console.log(err)
    next()
  }
})

const Profile = mongoose.model("Profiles", schema);

module.exports = Profile;
