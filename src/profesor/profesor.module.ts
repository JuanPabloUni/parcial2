/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ProfesorController } from './profesor.controller';

@Module({
  controllers: [ProfesorController]
})
export class ProfesorModule {}
