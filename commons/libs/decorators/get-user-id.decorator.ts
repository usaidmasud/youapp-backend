import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    return user.sub;
  },
);
