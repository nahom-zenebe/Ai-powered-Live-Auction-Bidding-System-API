import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "../../server.js";    // Ensure this is correct path
import User from "../models/user.model.js";

dotenv.config();

// Connect before all tests
beforeAll(async () => {
  const MONGO_URI = process.env.MONGO_URI;
  await mongoose.connect(MONGO_URI);
});

// Clean users after each test
afterEach(async () => {
  await User.deleteMany({});
});

// Disconnect after all tests
afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});


// ----------------------------
//  AUTH SIGNUP TESTS
// ----------------------------
describe("POST /api/auth/signup", () => {
  it("should create a new user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Abebe Tesma",
        email: "AbebeTesma@123gmail.com",
        role: "User",
        passwordHash: "password123",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user");
    expect(res.body.user.email).toBe("AbebeTesma@123gmail.com");
  });

  it("should not create a user with existing email", async () => {
    // Create existing user
    await User.create({
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      passwordHash: "hashedpassword",
    });

    // Try signup with same email
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "Jane Doe",
        email: "john@example.com",
        role: "user",
        passwordHash: "password123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it("should return 400 if required fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        email: "test@example.com",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
