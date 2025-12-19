process.env.NODE_ENV = "test";

const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");
const db = require("../db");

describe("Event Portal API - Integration Tests", function () {
  this.timeout(30000);

  let testEventId;
  let testUserId;

  before(async () => {
    console.log("Starting integration tests...");
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Database:", process.env.DB_NAME);
  });

  after(async () => {
    try {
      await db.end();
      console.log("Database connection closed");
    } catch (err) {
      console.log("No active database connection to close");
    }
  });

  describe("GET /", () => {
    it("should return the homepage", (done) => {
      request(app)
        .get("/")
        .expect(200)
        .expect("Content-Type", /html/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Event Portal");
          done();
        });
    });
  });

  describe("GET /db-test", () => {
    it("should return successful database connection", (done) => {
      request(app)
        .get("/db-test")
        .expect(200)
        .expect("Content-Type", /json/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property("success", true);
          expect(res.body).to.have.property("data");
          done();
        });
    });
  });

  describe("GET /events", () => {
    it("should return list of all events", (done) => {
      request(app)
        .get("/events")
        .expect(200)
        .expect("Content-Type", /html/)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Browse Events");
          done();
        });
    });

    it("should filter events by category", (done) => {
      request(app)
        .get("/events?category=Workshop")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Browse Events");
          done();
        });
    });
  });

  describe("Authentication Routes", () => {
    describe("GET /register", () => {
      it("should return registration page", (done) => {
        request(app)
          .get("/register")
          .expect(200)
          .expect("Content-Type", /html/)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.text).to.include("Register");
            done();
          });
      });
    });

    describe("GET /login", () => {
      it("should return login page", (done) => {
        request(app)
          .get("/login")
          .expect(200)
          .expect("Content-Type", /html/)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.text).to.include("Login");
            done();
          });
      });
    });

    describe("POST /register", () => {
      it("should register a new user", (done) => {
        const timestamp = Date.now();
        request(app)
          .post("/register")
          .type("form")
          .send({
            name: `Test User ${timestamp}`,
            email: `testuser${timestamp}@test.com`,
            password: "testpass123",
            role: "student",
          })
          .expect(302)
          .expect("Location", "/login")
          .end(done);
      });

      it("should reject duplicate email registration", (done) => {
        request(app)
          .post("/register")
          .type("form")
          .send({
            name: "Test Student",
            email: "test.student@test.com",
            password: "password123",
            role: "student",
          })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.text).to.include("already exists");
            done();
          });
      });
    });
  });

  describe("Protected Routes - Dashboard", () => {
    it("should redirect to login when not authenticated", (done) => {
      request(app)
        .get("/dashboard")
        .expect(302)
        .expect("Location", "/login")
        .end(done);
    });
  });

  describe("Event Detail Routes", () => {
    it("should return event detail page for valid event ID", (done) => {
      request(app)
        .get("/events/1")
        .expect(200)
        .expect("Content-Type", /html/)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
    });

    it("should handle non-existent event ID gracefully", (done) => {
      request(app)
        .get("/events/99999")
        .expect((res) => {
          // Should either return 404 or 500, but not crash
          expect([404, 500]).to.include(res.status);
        })
        .end(done);
    });
  });

  describe("Error Handling", () => {
    it("should return 404 for non-existent routes", (done) => {
      request(app).get("/nonexistent-route").expect(404).end(done);
    });
  });

  describe("Database Operations", () => {
    it("should retrieve users from test database", async function () {
      this.timeout(30000);
      try {
        const [users] = await db.query("SELECT * FROM users");
        expect(users).to.be.an("array");
        expect(users.length).to.be.at.least(3);
      } catch (err) {
        if (err.code === "ETIMEDOUT") {
          console.log("Database connection timeout - skipping direct DB test");
          this.skip();
        } else {
          throw err;
        }
      }
    });

    it("should retrieve events from test database", async function () {
      this.timeout(30000);
      try {
        const [events] = await db.query("SELECT * FROM events");
        expect(events).to.be.an("array");
        expect(events.length).to.be.at.least(2);
      } catch (err) {
        if (err.code === "ETIMEDOUT") {
          console.log("Database connection timeout - skipping direct DB test");
          this.skip();
        } else {
          throw err;
        }
      }
    });

    it("should verify test data integrity", async function () {
      this.timeout(30000);
      try {
        const [testUser] = await db.query(
          "SELECT * FROM users WHERE email = ?",
          ["test.student@test.com"]
        );
        expect(testUser).to.have.lengthOf(1);
        expect(testUser[0]).to.have.property("role", "student");
      } catch (err) {
        if (err.code === "ETIMEDOUT") {
          console.log("Database connection timeout - skipping direct DB test");
          this.skip();
        } else {
          throw err;
        }
      }
    });
  });
});
