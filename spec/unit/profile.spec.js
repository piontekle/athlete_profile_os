const Profile = require("../../src/models/profile");

describe("Profile", () => {
  beforeEach(async (done) => {
    this.profile;

    const profile = {
      name: "Tom Brady",
      dob: "08/03/1977",
      location: "Tampa Bay, FL",
      association: "NFL",
      team: "Buccaneers",
      gender: "male",
      sports: "football"
    }
    this.profile = profile;

    await Profile.deleteMany({});
    done();
  });

  describe("#create()", () => {
    it("should create a profile", async (done) => {
      const profile_obj = this.profile;

      const prof = await new Profile(profile_obj);
      prof.save();

      expect(prof.name).toBe("Tom Brady")
      expect(prof.sports.includes("football")).toBe(true);
      done();
    });
  });

  describe("#update", () => {
    it("should update a profile", async (done) => {
      const profile_obj = this.profile;

      const prof = await new Profile(profile_obj);
      prof.save()
      .then(() => {
        Profile.findByIdAndUpdate(
          prof._id,
          { name: "Rob Gronkowski" },
          { new: true }
        ).then(updated => {
          expect(updated.name).toBe("Rob Gronkowski");
          done();
        });
      });
    });
  });

  describe("#remove", () => {
    it("should remove a profile", async (done) => {
      const profile_obj = this.profile;

      const prof = await new Profile(profile_obj);
      prof.save()
      .then(() => {
        Profile.find({})
        .then(beforeDelete => {
          expect(beforeDelete.length).toBe(1);

          Profile.findByIdAndDelete(prof._id)
          .then(() => {
            Profile.find({})
            .then(profiles => {
              expect(profiles.length).toBe(0);
              done();
            })
          })
        })
      })
    })
  })

});
