import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';




const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation using Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./routes/register.js',
    './routes/login.js',
    './routes/getUsers.js',
    './routes/updateUsername.js',
    './routes/updatePassword.js',
  
    ], // replace with the path to your API routes
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  
   function setupSwagger(app) {

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
  export default setupSwagger









