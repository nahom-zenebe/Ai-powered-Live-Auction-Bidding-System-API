// import Category from "../models/Category.model.js";
// import request from "supertest";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import app from "../../server.js"; // adjust path if needed

// dotenv.config();

// // Connect to MongoDB before running tests
// beforeAll(async () => {
//   const MONGO_URI = process.env.MONGO_URI;
//   await mongoose.connect(MONGO_URI);
// });

// // Cleanup DB after each test
// afterEach(async () => {
//   await Category.deleteMany({});
// });

// // Close DB after ALL tests
// afterAll(async () => {
//   await mongoose.connection.db.dropDatabase();
//   await mongoose.connection.close();
// });


// // ------------------------------------------------------
// //               CATEGORY TEST SUITE
// // ------------------------------------------------------

// // CREATE CATEGORY
// describe("POST /api/category", () => {
//   it("should create a category", async () => {
//     const res = await request(app)
//       .post("/api/category")
//       .send({
//         name: "Tech",
//         description: "electronics devices",
//       });

//     expect(res.statusCode).toBe(201);
//     expect(res.body).toHaveProperty("category");
//     expect(res.body.category.name).toBe("Tech");
//   });
// });

// // GET ALL CATEGORIES
// describe("GET /api/category", () => {
//   it("should return all categories", async () => {
//     await Category.create({ name: "Tech", description: "devices" });

//     const res = await request(app).get("/api/category");

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//     expect(res.body.length).toBeGreaterThan(0);
//   });
// });

// // GET CATEGORY BY ID
// describe("GET /api/category/:id", () => {
//   it("should return a category by id", async () => {
//     const category = await Category.create({
//       name: "Tech",
//       description: "electronics",
//     });

//     const res = await request(app).get(`/api/category/${category._id}`);

//     expect(res.statusCode).toBe(200);
//     expect(res.body.name).toBe("Tech");
//   });
// });
