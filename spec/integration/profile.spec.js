const request = require("request");

const server = require("../../server");
const base = "http://localhost:3000/profile/";

const Profile = require("../../src/models").Profile;

describe("routes: Profile", () => {
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

  describe("POST", () => {
    it("should create a profile", (done) => {
      let options = {
        url: base,
        form: this.profile
      };

      request.post(options, (err, res, body) => {
        Profile.findOne({ name: "Tom Brady" })
        .then(profile => {
          expect(profile).not.toBeNull();
          expect(profile.sports.includes("football")).toBe(true);
          done();
        })
      })
    });
  });

  describe("PUT", () => {
    it("should update a profile", (done) => {
      const newProf = new Profile(this.profile)
      newProf.save()
      .then(() => {
        let update = this.profile;
        update.name = "Rob Gronkowski";
        update.sports = "football, baseball";

        let options = {
          url: base,
          form: { id: newProf._id.toString(), update }
        };

        request.put(options, (err, res, body) => {
          Profile.findOne({ name: "Rob Gronkowski" })
          .then(profile => {
            expect(profile).not.toBeNull();
            expect(profile.sports.includes("baseball")).toBe(true);
            done();
          })
        })
      })
    });
  });

});
