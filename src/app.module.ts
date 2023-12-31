import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
import { JoiValidationShema } from './config/joi.validation';
 
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration],
      validationSchema: JoiValidationShema,
    }),
    ServeStaticModule.forRoot({ 
      rootPath: join(__dirname, '..', 'public') 
    }),
    MongooseModule.forRoot(process.env.MONGODB),
    PokemonModule,
    CommonModule,
    SeedModule,

  ]
   
})
export class AppModule {}
