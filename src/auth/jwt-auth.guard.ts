import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private jwsService: JwtService) {}
	
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();

		try {
			const authHeader = req.headers.authorization;			
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];
			
			
			if (bearer !== 'Bearer' || !token){
				throw new UnauthorizedException({ massage: 'Пользователь не авторизован' });
			}

			const user = this.jwsService.verify(token)
			
			req.user = user;
			return true;
		} catch (e) {
			
			throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
		}
	}
}
