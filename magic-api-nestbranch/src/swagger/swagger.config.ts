import { DocumentBuilder, SwaggerCustomOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Magic API')
    .setDescription('API para gerenciar decks e comandantes')
    .setVersion('1.0')
    .addTag('cards', 'Gerenciamento de cartas de Magic: The Gathering')
    .addTag('commanders', 'Gerenciamento de comandantes')
    .addTag('decks', 'Gerenciamento de decks')
    .build();

export const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
        filter: true,
        showRequestDuration: true,
    },
    customSiteTitle: 'Magic API Docs',
};
