# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/app.module.ts** — Sin el modulo raiz, Nest no tiene arbol de dependencias que resolver y el bootstrap falla.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/repositories/productRepository.ts` — `Product.map`: Se invoca `map` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/productRepository.ts` — `Product.find`: Se invoca `find` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/productRepository.ts` — `Product.push`: Se invoca `push` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/productRepository.ts` — `Product.findIndex`: Se invoca `findIndex` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/productRepository.ts` — `Product.filter`: Se invoca `filter` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/repositories/productRepository.ts` — `Product.some`: Se invoca `some` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
Construir endpoints REST con validacion y manejo de errores (corrida e2e 20261109193147506), Expone endpoints REST con validacion de entrada y manejo centralizado de errores

### Misión / candidato
Exponer el catalogo de productos

### Reto
- Tema: Construccion de APIs REST con Express
- Seniority: advanced-l2
- Tipo: practical
- Título: Exposición del Catálogo de Productos
- Tiempo estimado: 4 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición de Endpoints — objetivo: Definir los endpoints necesarios para exponer el catálogo de productos. — entregable (NO resolver): Descripción de los endpoints y sus métodos HTTP.
- Fase 2: Validación de Entrada — objetivo: Implementar la validación de entrada para los endpoints. — entregable (NO resolver): Implementación de la validación de entrada en los endpoints.
- Fase 3: Manejo Centralizado de Errores — objetivo: Implementar un manejo centralizado de errores para la API. — entregable (NO resolver): Middleware de manejo de errores implementado.
- Fase 4: Exposición del Catálogo — objetivo: Exponer el catálogo de productos a través de la API. — entregable (NO resolver): API REST funcional que expone el catálogo de productos.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: src/main.ts ===
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

// === ARCHIVO: package.json ===
{
  "name": "product-catalog-api",
  "version": "1.0.0",
  "description": "API REST para gestión de catálogo de productos",
  "main": "src/main.ts",
  "scripts": {
    "build": "tsc",
    "start": "ts-node src/main.ts",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.4.5",
    "express": "4.21.0",
    "express-validator": "7.2.0"
  },
  "devDependencies": {
    "@types/express": "4.17.21",
    "@types/jest": "29.5.12",
    "@types/node": "^22.5.4",
    "@types/supertest": "2.0.16",
    "jest": "29.7.0",
    "supertest": "6.3.4",
    "ts-jest": "29.2.5",
    "ts-node": "10.9.2",
    "typescript": "^5.7.3"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node",
    "testMatch": [
      "**/*.spec.ts"
    ],
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}

// === ARCHIVO: src/models/productModel.ts ===
import { randomUUID } from 'crypto';

export class Product {
    public readonly id: string;
    public name: string;
    public price: number;
    public stock: number;
    public category: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(
        name: string,
        price: number,
        stock: number,
        category: string,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date
    ) {
        if (price < 0) {
            throw new Error('Price cannot be negative');
        }
        if (stock < 0) {
            throw new Error('Stock cannot be negative');
        }
        if (!name || name.trim().length === 0) {
            throw new Error('Name is required');
        }

        this.id = id || randomUUID();
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
    }

    public updateDetails(name: string, price: number, stock: number, category: string): void {
        if (price < 0) {
            throw new Error('Price cannot be negative');
        }
        if (stock < 0) {
            throw new Error('Stock cannot be negative');
        }
        if (!name || name.trim().length === 0) {
            throw new Error('Name is required');
        }

        this.name = name;
        this.price = price;
        this.stock = stock;
        this.category = category;
        this.updatedAt = new Date();
    }
}

// === ARCHIVO: src/dto/productDTO.ts ===
export interface ProductDTO {
    id: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateProductDTO {
    name: string;
    price: number;
    stock: number;
    category: string;
}

export interface UpdateProductDTO {
    name?: string;
    price?: number;
    stock?: number;
    category?: string;
}

// === ARCHIVO: src/repositories/productRepository.ts ===
import { Product } from '../models/productModel';
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from '../dto/productDTO';

export interface IProductRepository {
    getAll(): Promise<ProductDTO[]>;
    getById(id: string): Promise<ProductDTO | null>;
    create(productData: CreateProductDTO): Promise<ProductDTO>;
    update(id: string, productData: UpdateProductDTO): Promise<ProductDTO | null>;
    delete(id: string): Promise<void>;
    existsByName(name: string, excludeId?: string): Promise<boolean>;
}

export class InMemoryProductRepository implements IProductRepository {
    private products: Product[] = [];

    async getAll(): Promise<ProductDTO[]> {
        return this.products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        }));
    }

    async getById(id: string): Promise<ProductDTO | null> {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            return null;
        }
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }

    async create(productData: CreateProductDTO): Promise<ProductDTO> {
        const product = new Product(
            productData.name,
            productData.price,
            productData.stock,
            productData.category
        );
        this.products.push(product);
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: product.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt
        };
    }

    async update(id: string, productData: UpdateProductDTO): Promise<ProductDTO | null> {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            return null;
        }

        const existingProduct = this.products[productIndex];
        const updatedName = productData.name !== undefined ? productData.name : existingProduct.name;
        const updatedPrice = productData.price !== undefined ? productData.price : existingProduct.price;
        const updatedStock = productData.stock !== undefined ? productData.stock : existingProduct.stock;
        const updatedCategory = productData.category !== undefined ? productData.category : existingProduct.category;

        existingProduct.updateDetails(updatedName, updatedPrice, updatedStock, updatedCategory);

        return {
            id: existingProduct.id,
            name: existingProduct.name,
            price: existingProduct.price,
            stock: existingProduct.stock,
            category: existingProduct.category,
            createdAt: existingProduct.createdAt,
            updatedAt: existingProduct.updatedAt
        };
    }

    async delete(id: string): Promise<void> {
        this.products = this.products.filter(p => p.id !== id);
    }

    async existsByName(name: string, excludeId?: string): Promise<boolean> {
        return this.products.some(p => p.name === name && p.id !== excludeId);
    }
}

// === ARCHIVO: src/app.ts ===
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

// === ARCHIVO: src/routes/productRoutes.ts ===
import { Router, Request, Response, NextFunction } from 'express';
import { ProductController } from '../controllers/productController';
import { ValidationMiddleware } from '../middlewares/validationMiddleware';
import { param } from 'express-validator';

export const productRoutes = Router();

const productController = new ProductController();

const validateProductId = [
    param('id')
        .isString()
        .withMessage('El ID del producto debe ser una cadena')
        .notEmpty()
        .withMessage('El ID del producto es requerido')
        .isUUID()
        .withMessage('El ID del producto debe ser un UUID válido')
];

productRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productController.getAllProducts(req, res);
    } catch (error) {
        next(error);
    }
});

productRoutes.get('/:id', ValidationMiddleware.validateRequest(validateProductId), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productController.getProductById(req, res);
    } catch (error) {
        next(error);
    }
});

productRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productController.createProduct(req, res);
    } catch (error) {
        next(error);
    }
});

productRoutes.put('/:id', ValidationMiddleware.validateRequest(validateProductId), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productController.updateProduct(req, res);
    } catch (error) {
        next(error);
    }
});

productRoutes.delete('/:id', ValidationMiddleware.validateRequest(validateProductId), async (req: Request, res: Response, next: NextFunction) => {
    try {
        await productController.deleteProduct(req, res);
    } catch (error) {
        next(error);
    }
});

// === ARCHIVO: src/controllers/productController.ts ===
import { Request, Response } from 'express';
import { ProductService } from '../services/productService';
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from '../dto/productDTO';
import { BadRequestError, NotFoundError } from '../exceptions/httpExceptions';
import { InMemoryProductRepository } from '../repositories/productRepository';

export class ProductController {
    private productService: ProductService;

    constructor() {
        const repository = new InMemoryProductRepository();
        this.productService = new ProductService(repository);
    }

    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products: ProductDTO[] = await this.productService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            throw error;
        }
    }

    public async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            if (!id) {
                throw new BadRequestError('El ID del producto es requerido');
            }

            const product: ProductDTO | null = await this.productService.getProductById(id);
            
            if (!product) {
                throw new NotFoundError(`Producto con ID '${id}' no encontrado`);
            }

            res.status(200).json(product);
        } catch (error) {
            throw error;
        }
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const productData: CreateProductDTO = req.body;

            if (!productData.name || productData.name.trim() === '') {
                throw new BadRequestError('El nombre del producto es requerido');
            }

            if (productData.price === undefined || productData.price === null) {
                throw new BadRequestError('El precio del producto es requerido');
            }

            if (typeof productData.price !== 'number' || productData.price < 0) {
                throw new BadRequestError('El precio debe ser un número no negativo');
            }

            if (productData.stock !== undefined && (typeof productData.stock !== 'number' || productData.stock < 0)) {
                throw new BadRequestError('El stock debe ser un número no negativo');
            }

            const newProduct: ProductDTO = await this.productService.createProduct(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            throw error;
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const productData: UpdateProductDTO = req.body;

            if (!id) {
                throw new BadRequestError('El ID del producto es requerido');
            }

            const existingProduct = await this.productService.getProductById(id);
            if (!existingProduct) {
                throw new NotFoundError(`Producto con ID '${id}' no encontrado`);
            }

            if (productData.name !== undefined) {
                if (productData.name.trim() === '') {
                    throw new BadRequestError('El nombre del producto no puede estar vacío');
                }
            }

            if (productData.price !== undefined) {
                if (typeof productData.price !== 'number' || productData.price < 0) {
                    throw new BadRequestError('El precio debe ser un número no negativo');
                }
            }

            if (productData.stock !== undefined && (typeof productData.stock !== 'number' || productData.stock < 0)) {
                throw new BadRequestError('El stock debe ser un número no negativo');
            }

            const updatedProduct: ProductDTO | null = await this.productService.updateProduct(id, productData);
            
            if (!updatedProduct) {
                throw new NotFoundError(`Producto con ID '${id}' no encontrado`);
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            throw error;
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;

            if (!id) {
                throw new BadRequestError('El ID del producto es requerido');
            }

            const existingProduct = await this.productService.getProductById(id);
            if (!existingProduct) {
                throw new NotFoundError(`Producto con ID '${id}' no encontrado`);
            }

            await this.productService.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            throw error;
        }
    }
}

// === ARCHIVO: src/services/productService.ts ===
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from '../dto/productDTO';
import { IProductRepository } from '../repositories/productRepository';
import { BadRequestError, NotFoundError } from '../exceptions/httpExceptions';

export class ProductService {
  constructor(private readonly productRepository: IProductRepository) {}

  async getAllProducts(): Promise<ProductDTO[]> {
    return await this.productRepository.getAll();
  }

  async getProductById(id: string): Promise<ProductDTO> {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return product;
  }

  async createProduct(productData: CreateProductDTO): Promise<ProductDTO> {
    this.validateProductData(productData);
    await this.validateUniqueName(productData.name);
    return await this.productRepository.create(productData);
  }

  async updateProduct(id: string, productData: UpdateProductDTO): Promise<ProductDTO> {
    const existingProduct = await this.productRepository.getById(id);
    if (!existingProduct) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    if (productData.name && productData.name !== existingProduct.name) {
      await this.validateUniqueName(productData.name, id);
    }
    const validatedData = this.sanitizeUpdateData(productData, existingProduct);
    const updatedProduct = await this.productRepository.update(id, validatedData);
    if (!updatedProduct) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.getById(id);
    if (!product) {
      throw new NotFoundError(`Product with id ${id} not found`);
    }
    await this.productRepository.delete(id);
  }

  private validateProductData(productData: CreateProductDTO): void {
    if (productData.price < 0) {
      throw new BadRequestError('Price cannot be negative');
    }
    if (productData.stock < 0) {
      throw new BadRequestError('Stock cannot be negative');
    }
    if (!productData.name || productData.name.trim().length === 0) {
      throw new BadRequestError('Product name is required');
    }
    if (!productData.category || productData.category.trim().length === 0) {
      throw new BadRequestError('Product category is required');
    }
  }

  private async validateUniqueName(name: string, excludeId?: string): Promise<void> {
    const exists = await this.productRepository.existsByName(name, excludeId);
    if (exists) {
      throw new BadRequestError(`Product with name '${name}' already exists`);
    }
  }

  private sanitizeUpdateData(
    updateData: UpdateProductDTO,
    existingProduct: ProductDTO
  ): UpdateProductDTO {
    const sanitized: UpdateProductDTO = {};
    if (updateData.name !== undefined) {
      if (updateData.name.trim().length === 0) {
        throw new BadRequestError('Product name cannot be empty');
      }
      sanitized.name = updateData.name.trim();
    }
    if (updateData.price !== undefined) {
      if (updateData.price < 0) {
        throw new BadRequestError('Price cannot be negative');
      }
      sanitized.price = updateData.price;
    }
    if (updateData.stock !== undefined) {
      if (updateData.stock < 0) {
        throw new BadRequestError('Stock cannot be negative');
      }
      sanitized.stock = updateData.stock;
    }
    if (updateData.category !== undefined) {
      if (updateData.category.trim().length === 0) {
        throw new BadRequestError('Product category cannot be empty');
      }
      sanitized.category = updateData.category.trim();
    }
    return sanitized;
  }
}

// === ARCHIVO: src/middlewares/errorHandler.ts ===
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpException } from '../exceptions/httpExceptions';

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.statusCode,
        message: err.message,
      },
    });
    return;
  }
  if (err.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: 'Validation error',
        details: err.message,
      },
    });
    return;
  }
  if (err.name === 'CastError' && err.message.includes('ObjectId')) {
    res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: 'Invalid ID format',
      },
    });
    return;
  }
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: {
      code: 500,
      message: 'Internal server error',
    },
  });
};

// === ARCHIVO: src/middlewares/validationMiddleware.ts ===
import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain, param } from 'express-validator';

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await Promise.all(validations.map((validation) => validation.run(req)));
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }
    const extractedErrors = errors.array().map((err) => ({
      field: 'path' in err ? err.path : 'unknown',
      message: 'msg' in err ? err.msg : 'Invalid value',
    }));
    res.status(400).json({
      success: false,
      error: {
        code: 400,
        message: 'Validation failed',
        details: extractedErrors,
      },
    });
  };
};

export const validateProductCreation = validate([]);
export const validateProductUpdate = validate([]);

export const validateProductId = [
  param('id')
    .notEmpty()
    .withMessage('El ID del producto es requerido')
    .isString()
    .withMessage('El ID debe ser una cadena de texto')
    .trim()
    .isLength({ min: 1 })
    .withMessage('El ID no puede estar vacío'),
];

export class ValidationMiddleware {
  static validateRequest(validations: ValidationChain[]): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await Promise.all(validations.map((validation) => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          next();
          return;
        }
        const formattedErrors = errors.array().map((err) => {
          if ('path' in err && 'msg' in err) {
            return { field: err.path, message: err.msg };
          }
          return { field: 'unknown', message: String(err) };
        });
        res.status(400).json({
          success: false,
          error: {
            code: 400,
            message: 'Request validation failed',
            details: formattedErrors,
          },
        });
        return;
      } catch (error) {
        next(error);
      }
    };
  }

  static extractValidationErrors(req: Request): { field: string; message: string }[] {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errors.array().map((err) => ({
        field: 'path' in err ? err.path : 'unknown',
        message: 'msg' in err ? err.msg : 'Invalid value',
      }));
    }
    return [];
  }

  static hasValidationErrors(req: Request): boolean {
    return !validationResult(req).isEmpty();
  }

  static getFirstError(req: Request): { field: string; message: string } | null {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return null;
    }
    const firstError = errors.array()[0];
    if (firstError && 'path' in firstError && 'msg' in firstError) {
      return { field: firstError.path, message: firstError.msg };
    }
    return { field: 'unknown', message: 'Unknown validation error' };
  }
}

// === ARCHIVO: src/validators/productValidator.ts ===
import { body, param, ValidationChain } from 'express-validator';

export const createProductValidationRules: ValidationChain[] = [
  body('name')
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres'),

  body('price')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),

  body('stock')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),

  body('category')
    .isString()
    .withMessage('La categoría debe ser una cadena de texto')
    .notEmpty()
    .withMessage('La categoría es requerida')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('La categoría debe tener entre 1 y 50 caracteres'),
];

export const updateProductValidationRules: ValidationChain[] = [
  param('id')
    .isString()
    .withMessage('El ID debe ser una cadena de texto')
    .notEmpty()
    .withMessage('El ID es requerido')
    .trim()
    .isUUID()
    .withMessage('El ID debe ser un UUID válido'),

  body('name')
    .optional()
    .isString()
    .withMessage('El nombre debe ser una cadena de texto')
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('El nombre debe tener entre 1 y 100 caracteres'),

  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0'),

  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número entero mayor o igual a 0'),

  body('category')
    .optional()
    .isString()
    .withMessage('La categoría debe ser una cadena de texto')
    .notEmpty()
    .withMessage('La categoría no puede estar vacía')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('La categoría debe tener entre 1 y 50 caracteres'),
];

export const productIdValidationRule: ValidationChain = param('id')
  .isString()
  .withMessage('El ID debe ser una cadena de texto')
  .notEmpty()
  .withMessage('El ID es requerido')
  .trim()
  .isUUID()
  .withMessage('El ID debe ser un UUID válido');

// === ARCHIVO: src/exceptions/httpExceptions.ts ===
export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, HttpException.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = 'Solicitud incorrecta') {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Recurso no encontrado') {
    super(message, 404);
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string = 'Conflicto de datos') {
    super(message, 409);
    Object.setPrototypeOf(this, ConflictException.prototype);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = 'Error interno del servidor') {
    super(message, 500);
    Object.setPrototypeOf(this, InternalServerErrorException.prototype);
  }
}

export class ValidationException extends HttpException {
  public readonly errors: Array<{ field: string; message: string }>;

  constructor(errors: Array<{ field: string; message: string }>) {
    super('Error de validación', 422);
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'No autorizado') {
    super(message, 401);
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string = 'Acceso prohibido') {
    super(message, 403);
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}

export const BadRequestError = BadRequestException;
export const NotFoundError = NotFoundException;
export const ValidationError = ValidationException;

// === ARCHIVO: tests/productController.spec.ts ===
import { Request, Response, NextFunction } from 'express';
import request from 'supertest';
import { ProductController } from '../src/controllers/productController';
import { ProductService } from '../src/services/productService';
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from '../src/dto/productDTO';

describe('ProductController', () => {
    let controller: ProductController;
    let mockService: jest.Mocked<ProductService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    const mockProduct: ProductDTO = {
        id: '123',
        name: 'Laptop',
        price: 999.99,
        stock: 10,
        category: 'Electronics',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    beforeEach(() => {
        mockService = {
            getAllProducts: jest.fn(),
            getProductById: jest.fn(),
            createProduct: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn()
        } as any;

        controller = new ProductController(mockService);

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };

        mockNext = jest.fn();
    });

    describe('getAllProducts', () => {
        it('debe retornar todos los productos cuando existen', async () => {
            const products: ProductDTO[] = [mockProduct];
            mockService.getAllProducts.mockResolvedValue(products);

            await controller.getAllProducts(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockService.getAllProducts).toHaveBeenCalledTimes(1);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(products);
        });

        it('debe retornar array vacio cuando no hay productos', async () => {
            mockService.getAllProducts.mockResolvedValue([]);

            await controller.getAllProducts(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith([]);
        });

        it('debe llamar a next con error cuando falla el servicio', async () => {
            const error = new Error('Error de base de datos');
            mockService.getAllProducts.mockRejectedValue(error);

            await controller.getAllProducts(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('getProductById', () => {
        it('debe retornar producto cuando existe', async () => {
            mockRequest.params = { id: '123' };
            mockService.getProductById.mockResolvedValue(mockProduct);

            await controller.getProductById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockService.getProductById).toHaveBeenCalledWith('123');
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockProduct);
        });

        it('debe retornar 404 cuando producto no existe', async () => {
            mockRequest.params = { id: 'inexistente' };
            mockService.getProductById.mockResolvedValue(null);

            await controller.getProductById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
        });

        it('debe llamar a next con error cuando falla el servicio', async () => {
            mockRequest.params = { id: '123' };
            const error = new Error('Error de conexion');
            mockService.getProductById.mockRejectedValue(error);

            await controller.getProductById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('createProduct', () => {
        it('debe crear producto cuando datos son validos', async () => {
            const createData: CreateProductDTO = {
                name: 'Nueva Laptop',
                price: 1500,
                stock: 5,
                category: 'Electronics'
            };
            mockRequest.body = createData;
            mockService.createProduct.mockResolvedValue({ ...mockProduct, ...createData });

            await controller.createProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockService.createProduct).toHaveBeenCalledWith(createData);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
        });

        it('debe llamar a next con error cuando falla el servicio', async () => {
            const createData: CreateProductDTO = {
                name: 'Nueva Laptop',
                price: 1500,
                stock: 5,
                category: 'Electronics'
            };
            mockRequest.body = createData;
            const error = new Error('Nombre duplicado');
            mockService.createProduct.mockRejectedValue(error);

            await controller.createProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('updateProduct', () => {
        it('debe actualizar producto cuando existe', async () => {
            const updateData: UpdateProductDTO = {
                name: 'Laptop Actualizada',
                price: 1200,
                stock: 15,
                category: 'Electronics'
            };
            mockRequest.params = { id: '123' };
            mockRequest.body = updateData;
            mockService.updateProduct.mockResolvedValue({ ...mockProduct, ...updateData });

            await controller.updateProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockService.updateProduct).toHaveBeenCalledWith('123', updateData);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
        });

        it('debe retornar 404 cuando producto no existe', async () => {
            const updateData: UpdateProductDTO = {
                name: 'Producto Inexistente',
                price: 100,
                stock: 1,
                category: 'Test'
            };
            mockRequest.params = { id: 'inexistente' };
            mockRequest.body = updateData;
            mockService.updateProduct.mockResolvedValue(null);

            await controller.updateProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
        });

        it('debe llamar a next con error cuando falla el servicio', async () => {
            const updateData: UpdateProductDTO = {
                name: 'Producto',
                price: 100,
                stock: 1,
                category: 'Test'
            };
            mockRequest.params = { id: '123' };
            mockRequest.body = updateData;
            const error = new Error('Error de actualizacion');
            mockService.updateProduct.mockRejectedValue(error);

            await controller.updateProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe('deleteProduct', () => {
        it('debe eliminar producto cuando existe', async () => {
            mockRequest.params = { id: '123' };
            mockService.deleteProduct.mockResolvedValue();

            await controller.deleteProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockService.deleteProduct).toHaveBeenCalledWith('123');
            expect(mockResponse.status).toHaveBeenCalledWith(204);
        });

        it('debe llamar a next con error cuando falla el servicio', async () => {
            mockRequest.params = { id: '123' };
            const error = new Error('Error al eliminar');
            mockService.deleteProduct.mockRejectedValue(error);

            await controller.deleteProduct(
                mockRequest as Request,
                mockResponse as Response,
                mockNext
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});

// === ARCHIVO: tests/productService.spec.ts ===
import { ProductService } from '../src/services/productService';
import { IProductRepository } from '../src/repositories/productRepository';
import { ProductDTO, CreateProductDTO, UpdateProductDTO } from '../src/dto/productDTO';
import { NotFoundException, ValidationException } from '../src/exceptions/httpExceptions';

describe('ProductService', () => {
    let service: ProductService;
    let mockRepository: jest.Mocked<IProductRepository>;

    const mockProductDTO: ProductDTO = {
        id: '123',
        name: 'Laptop Pro',
        price: 1299.99,
        stock: 25,
        category: 'Electronics',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
    };

    beforeEach(() => {
        mockRepository = {
            getAll: jest.fn(),
            getById: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            existsByName: jest.fn()
        } as unknown as jest.Mocked<IProductRepository>;

        service = new ProductService(mockRepository);
    });

    describe('getAllProducts', () => {
        it('debe retornar lista de productos', async () => {
            const products: ProductDTO[] = [mockProductDTO];
            mockRepository.getAll.mockResolvedValue(products);

            const result = await service.getAllProducts();

            expect(result).toEqual(products);
            expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
        });

        it('debe retornar array vacio si no hay productos', async () => {
            mockRepository.getAll.mockResolvedValue([]);

            const result = await service.getAllProducts();

            expect(result).toEqual([]);
            expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
        });

        it('debe propagar errores del repositorio', async () => {
            const error = new Error('Error de base de datos');
            mockRepository.getAll.mockRejectedValue(error);

            await expect(service.getAllProducts()).rejects.toThrow('Error de base de datos');
        });
    });

    describe('getProductById', () => {
        it('debe retornar producto cuando existe', async () => {
            mockRepository.getById.mockResolvedValue(mockProductDTO);

            const result = await service.getProductById('123');

            expect(result).toEqual(mockProductDTO);
            expect(mockRepository.getById).toHaveBeenCalledWith('123');
        });

        it('debe lanzar NotFoundException cuando producto no existe', async () => {
            mockRepository.getById.mockResolvedValue(null);

            await expect(service.getProductById('inexistente')).rejects.toThrow(NotFoundException);
        });

        it('debe validar formato de id', async () => {
            await expect(service.getProductById('')).rejects.toThrow(ValidationException);
            await expect(service.getProductById('   ')).rejects.toThrow(ValidationException);
        });
    });

    describe('createProduct', () => {
        const validCreateData: CreateProductDTO = {
            name: 'Nueva Laptop',
            price: 999.99,
            stock: 10,
            category: 'Electronics'
        };

        it('debe crear producto con datos validos', async () => {
            mockRepository.existsByName.mockResolvedValue(false);
            mockRepository.create.mockResolvedValue({ ...mockProductDTO, ...validCreateData });

            const result = await service.createProduct(validCreateData);

            expect(result.name).toBe(validCreateData.name);
            expect(result.price).toBe(validCreateData.price);
            expect(mockRepository.create).toHaveBeenCalledWith(validCreateData);
        });

        it('debe rechazar precio negativo', async () => {
            const invalidData = { ...validCreateData, price: -100 };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
            expect(mockRepository.create).not.toHaveBeenCalled();
        });

        it('debe rechazar precio cero', async () => {
            const invalidData = { ...validCreateData, price: 0 };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe rechazar nombre duplicado', async () => {
            mockRepository.existsByName.mockResolvedValue(true);

            await expect(service.createProduct(validCreateData)).rejects.toThrow(ValidationException);
            expect(mockRepository.create).not.toHaveBeenCalled();
        });

        it('debe rechazar nombre vacio', async () => {
            const invalidData = { ...validCreateData, name: '' };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe rechazar nombre con solo espacios', async () => {
            const invalidData = { ...validCreateData, name: '   ' };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe rechazar stock negativo', async () => {
            const invalidData = { ...validCreateData, stock: -5 };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe rechazar categoria vacia', async () => {
            const invalidData = { ...validCreateData, category: '' };

            await expect(service.createProduct(invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe propagar errores del repositorio', async () => {
            mockRepository.existsByName.mockResolvedValue(false);
            const error = new Error('Error de conexion');
            mockRepository.create.mockRejectedValue(error);

            await expect(service.createProduct(validCreateData)).rejects.toThrow(error);
        });
    });

    describe('updateProduct', () => {
        const validUpdateData: UpdateProductDTO = {
            name: 'Laptop Actualizada',
            price: 1499.99,
            stock: 30,
            category: 'Computacion'
        };

        it('debe actualizar producto cuando existe', async () => {
            const updatedProduct = { ...mockProductDTO, ...validUpdateData };
            mockRepository.getById.mockResolvedValue(mockProductDTO);
            mockRepository.existsByName.mockResolvedValue(false);
            mockRepository.update.mockResolvedValue(updatedProduct);

            const result = await service.updateProduct('123', validUpdateData);

            expect(result).toEqual(updatedProduct);
            expect(mockRepository.update).toHaveBeenCalledWith('123', validUpdateData);
        });

        it('debe lanzar NotFoundException cuando producto no existe', async () => {
            mockRepository.getById.mockResolvedValue(null);

            await expect(service.updateProduct('inexistente', validUpdateData)).rejects.toThrow(NotFoundException);
        });

        it('debe rechazar precio negativo', async () => {
            const invalidData = { ...validUpdateData, price: -50 };

            await expect(service.updateProduct('123', invalidData)).rejects.toThrow(ValidationException);
            expect(mockRepository.update).not.toHaveBeenCalled();
        });

        it('debe rechazar nombre duplicado en actualizacion', async () => {
            const existingProduct: ProductDTO = {
                id: '456',
                name: 'Otro Producto',
                price: 100,
                stock: 5,
                category: 'Test',
                createdAt: new Date(),
                updatedAt: new Date()
            };
            mockRepository.getById.mockResolvedValue(mockProductDTO);
            mockRepository.existsByName.mockResolvedValue(true);

            await expect(service.updateProduct('123', validUpdateData)).rejects.toThrow(ValidationException);
        });

        it('debe permitir mismo nombre en actualizacion del mismo producto', async () => {
            const updateWithSameName = { ...validUpdateData, name: mockProductDTO.name };
            mockRepository.getById.mockResolvedValue(mockProductDTO);
            mockRepository.existsByName.mockImplementation(async (name: string, excludeId?: string) => {
                return name === mockProductDTO.name && excludeId === '123' ? false : true;
            });
            mockRepository.update.mockResolvedValue({ ...mockProductDTO, ...updateWithSameName });

            const result = await service.updateProduct('123', updateWithSameName);

            expect(result.name).toBe(mockProductDTO.name);
        });

        it('debe rechazar stock negativo', async () => {
            const invalidData = { ...validUpdateData, stock: -10 };

            await expect(service.updateProduct('123', invalidData)).rejects.toThrow(ValidationException);
        });

        it('debe rechazar nombre vacio', async () => {
            const invalidData = { ...validUpdateData, name: '' };

            await expect(service.updateProduct('123', invalidData)).rejects.toThrow(ValidationException);
        });
    });

    describe('deleteProduct', () => {
        it('debe eliminar producto cuando existe', async () => {
            mockRepository.getById.mockResolvedValue(mockProductDTO);
            mockRepository.delete.mockResolvedValue();

            await service.deleteProduct('123');

            expect(mockRepository.delete).toHaveBeenCalledWith('123');
        });

        it('debe lanzar NotFoundException cuando producto no existe', async () => {
            mockRepository.getById.mockResolvedValue(null);

            await expect(service.deleteProduct('inexistente')).rejects.toThrow(NotFoundException);
            expect(mockRepository.delete).not.toHaveBeenCalled();
        });

        it('debe validar formato de id', async () => {
            await expect(service.deleteProduct('')).rejects.toThrow(ValidationException);
        });

        it('debe propagar errores del repositorio', async () => {
            mockRepository.getById.mockResolvedValue(mockProductDTO);
            const error = new Error('Error de eliminacion');
            mockRepository.delete.mockRejectedValue(error);

            await expect(service.deleteProduct('123')).rejects.toThrow(error);
        });
    });
});

// === ARCHIVO: src/utils/envValidator.ts ===
import dotenv from 'dotenv';

dotenv.config();

export interface ValidationResult {
  valid: boolean;
  missingVars: string[];
}

export function validateEnvironment(requiredVars: string[]): ValidationResult {
  const missingVars: string[] = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName] || process.env[varName]?.trim() === '') {
      missingVars.push(varName);
    }
  }
  
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
  
  return {
    valid: true,
    missingVars: []
  };
}

export function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value || defaultValue || '';
}

export function getEnvVarAsNumber(key: string, defaultValue?: number): number {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  const parsed = parseInt(value || String(defaultValue), 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a valid number`);
  }
  return parsed;
}

export function getEnvVarAsBoolean(key: string, defaultValue?: boolean): boolean {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    return false;
  }
  if (!value) return defaultValue || false;
  return value.toLowerCase() === 'true' || value === '1';
}
```
