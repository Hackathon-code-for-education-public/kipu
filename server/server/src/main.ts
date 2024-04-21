require('dotenv').config({ path: '.env' });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { config } from './config';
import { Logger, ValidationPipe, BadRequestException } from '@nestjs/common';

import * as fs from 'fs';
const logger: Logger = new Logger('Main');
const port = process.env.NODE_SERVER_PORT || config.get('server.port');

async function bootstrap(): Promise<void> {
    const appOptions = { cors: { origin: '*' } };
    const app = await NestFactory.create(AppModule, appOptions);
    
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (): BadRequestException => new BadRequestException('Validation error'),
        }),
    );

    const staticClientPath = config.getClientPath();
    if (fs.existsSync(staticClientPath)) {
        logger.log(`Serving static client resources on ${staticClientPath}`);
    } else {
        logger.log('No client it has been found');
    }
    setupSwagger(app);

    await app.listen(port, '0.0.0.0');

    logger.log(`Application listening on port ${port}`);
}

bootstrap();
