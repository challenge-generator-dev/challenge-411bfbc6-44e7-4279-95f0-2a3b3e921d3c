import express, { Express } from 'express';
import * as http from 'http';
import dotenv from 'dotenv';
import { productRoutes } from './routes/productRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { validateEnvironment } from './utils/envValidator';

dotenv.config();

validateEnvironment(['PORT']);

class App {
    public app: Express;
    private server: http.Server | null = null;
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '3000', 10);
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(): void {
        this.app.use('/product-catalog', productRoutes);
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public start(): void {
        this.server = http.createServer(this.app);
        this.server.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        }).on('error', (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`Port ${this.port} is already in use`);
            } else {
                console.error(`Failed to start server: ${err.message}`);
            }
            process.exit(1);
        });
    }

    public stop(): void {
        if (this.server) {
            this.server.close(() => {
                console.log('Server stopped');
            });
        }
    }

    public getApp(): Express {
        return this.app;
    }
}

const appInstance = new App();
const app = appInstance.getApp();
export { app, appInstance };

if (process.env.NODE_ENV !== 'test') {
    appInstance.start();
}