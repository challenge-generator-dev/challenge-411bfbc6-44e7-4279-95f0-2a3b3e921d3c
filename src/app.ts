import express, { Express, Request, Response, NextFunction } from 'express';
import * as http from 'http';
import dotenv from 'dotenv';
import { productRoutes } from './routes/productRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

export class App {
    private app: Express;
    private server: http.Server | null = null;
    private port: number;

    constructor() {
        this.app = express();
        this.port = this.parsePort();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private parsePort(): number {
        const portEnv = process.env.PORT;
        if (!portEnv) {
            return 3000;
        }
        const parsed = parseInt(portEnv, 10);
        if (isNaN(parsed) || parsed < 1 || parsed > 65535) {
            console.warn(`Puerto inválido '${portEnv}', usando 3000 por defecto`);
            return 3000;
        }
        return parsed;
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
            next();
        });
    }

    private initializeRoutes(): void {
        this.app.get('/health', (req: Request, res: Response) => {
            res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
        });
        this.app.use('/product-catalog', productRoutes);
    }

    private initializeErrorHandling(): void {
        this.app.use(errorHandler);
    }

    public start(): void {
        this.server = http.createServer(this.app);
        this.server.listen(this.port, () => {
            console.log(`Servidor iniciado en puerto ${this.port}`);
            console.log(`Endpoints disponibles:`);
            console.log(`  GET    /product-catalog`);
            console.log(`  GET    /product-catalog/:id`);
            console.log(`  POST   /product-catalog`);
            console.log(`  PUT    /product-catalog/:id`);
            console.log(`  DELETE /product-catalog/:id`);
        });
    }

    public stop(): void {
        if (this.server) {
            this.server.close(() => {
                console.log('Servidor detenido');
            });
        }
    }

    public getApp(): Express {
        return this.app;
    }
}

const appInstance = new App();
export default appInstance;