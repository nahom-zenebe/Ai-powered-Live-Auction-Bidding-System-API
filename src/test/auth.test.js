import  User from '../models/user.model'
import request from 'supertest'
import mongoose from 'mongoose'
import dotnet from 'dotent'


dotnet.config()


beforeAll(async()=>{
    const MONGO_URI=process.env.MONGO_URI
    await mongoose.connect(MONGO_URI)
})

afterall(async()=>{
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close()
})

afterEach(async()=>{
    await User.deleteMany({});
})


describe("POST /api/auth/signup",()=>{
    it("should create new user ",async()=>{
        const res=await request(app)
        .post('/api/auth/signup')
        .send({
            name:"Abebe Tesma",
            email:"AbebeTesma@123gmail.com",
            role:"User",
            password: 'password123'
        })

        expect(res.statusCode).toBe(201)
        expect(res.body).toHaveProperty('user');
    })

    it('should not create user with existing email', async () => {
        await User.create({
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          password: 'hashedpassword'
        });
    
        const res = await request(app)
          .post('/api/auth/signup')
          .send({
            name: 'Jane Doe',
            email: 'john@example.com',
            role: 'user',
            password: 'password123'
          });
    
        expect(res.statusCode).toBe(400);
      
      });
    
      it('should return 400 if fields are missing', async () => {
        const res = await request(app)
          .post('/api/auth/signup')
          .send({ email: 'test@example.com' });
    
        expect(res.statusCode).toBe(400);
       
      });
    });
    



    describe("abej jw",async()=>{
        it("abeeqwe",async()=>{
            expect(dats).toBe(3)
            expect("hello").toContain(2001)
        })
    })