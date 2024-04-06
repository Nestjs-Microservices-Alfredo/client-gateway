import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards';

export function Auth() {
  // console.log(' Auth ');
  return applyDecorators(
    // RoleProtected( ...roles ),
    UseGuards( AuthGuard ),
  );
}