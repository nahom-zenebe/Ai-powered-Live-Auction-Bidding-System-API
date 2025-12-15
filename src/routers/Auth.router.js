import express from 'express'
import { login, signup,statsInfo, CountNumberofUser, VerifyUser } from '../controllers/Auth.controller.js'
import {registerSchema,loginSchema} from '../validators/auth.schema.js'
import {validatorMiddleware} from '../middlewares/validator.middleware.js'

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/signup",validatorMiddleware(registerSchema), signup)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login",validatorMiddleware(loginSchema), login)

/**
 * @swagger
 * /api/auth/verify/{id}:
 *   get:
 *     summary: Verify account
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Verification success
 */
router.get("/statsinfo",statsInfo)
router.put("/verify/:userId", VerifyUser)
router.get("/numberofUser", CountNumberofUser)
export default router;
