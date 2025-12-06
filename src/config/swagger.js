import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "My API Description",
    },
    servers: [
      {
        url: "http://localhost:5002",
        description: "Local server",
      },
    ],
  },

  
  apis: ["./src/routers/*.js", "./src/models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
