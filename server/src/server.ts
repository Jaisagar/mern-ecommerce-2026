
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { connectDB } from './db';
import { notFound } from './middleware/notFound';
import { errorhandler } from './middleware/errorhandler';
import { clerkMiddleware } from '@clerk/express';
import { authRouter } from './routes/auth/auth.routes';

async function mainEntryFunction() {
    // 1. Connect database
    await connectDB();

    // 2. Initialize Express
    const app = express();

    // 3. Configure CORS
    const corsOrigins = (
        process.env.CORS_ORIGINS ||
        'http://localhost:3000'
    )
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

    app.use(
        cors({
            origin: corsOrigins,
            credentials: true,
        })
    );

    // 4. Middleware
    app.use(express.json());
    app.use(morgan('dev'));

    app.use(clerkMiddleware())

    // 5. Health check API
    app.get('/health', (_req, res) => {
        res.status(200).json({
            success: true,
            message: 'Server is healthy and running',
        });
    });

//Auth Route
app.use("/auth",authRouter)

    // 6. Handle unknown routes
    app.use(notFound);

    // 7. Handle application errors
    app.use(errorhandler);

    // 8. Start server
    const port = Number(process.env.PORT || 5000);

    app.listen(port, () => {
        console.log(`Server is now listening on port ${port}`);
    });
}

mainEntryFunction().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
