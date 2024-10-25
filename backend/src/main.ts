import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';

async function bootstrap() {
  // Create the NestJS application as an Express application
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  // Serve static files (such as uploaded images) from the 'uploads' directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
    index: false, // Prevent serving index.html by default
    fallthrough: false, // Do not continue to other middlewares if file is not found
  });

  // Use Helmet for security configurations
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'http://localhost:3002'], // Allow images from your backend server
          styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles (needed for MUI)
          scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts
        },
      },
      crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow images and media to be shared across origins
    }),
  );

  // Enable CORS to allow requests from your frontend
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from the frontend (React app)
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allow the HTTP methods
    credentials: true, // Allow credentials such as cookies and authorization headers
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'], // Add any other headers if needed
  });

  // Start the NestJS server on port 3002
  await app.listen(3002);
}

bootstrap();
