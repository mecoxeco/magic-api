import { ApiProperty } from '@nestjs/swagger';

export class CreateDeckDto {
    @ApiProperty({ example: 'Nicol Bolas', description: 'The name of the commander' })
    readonly commanderName: string;

}
