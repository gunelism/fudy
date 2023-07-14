import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard, PassportModule } from '@nestjs/passport';


describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        register: jest.fn().mockResolvedValue({ 
          name: "gunel",
          email: "gunel3@mail.com",
          password: "$2a$10$E3ziOh//mRzxZXSBbbfWJO9/8my.RgZpen9DcDmDxFHB9JblgJtrK",
          id: 7,
          created: "2023-07-14T09:39:15.347Z",
          updated: "2023-07-14T09:39:15.347Z",
          token: "token"
        }),
        login: jest.fn().mockResolvedValue({ id: 1, email: 'user@example.com' }),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        ApiServiceProvider
      ],
      imports: [passportModule]
    }).compile();

    authController = app.get<AuthController>(AuthController);
    authService = app.get<AuthService>(AuthService);
  });


  it("calling register method", async () => {
    const dto = new UserEntity();
    const result = await authController.register(dto);    
    const registerData = { 
      name: "gunel",
      email: "gunel3@mail.com",
      password: "$2a$10$E3ziOh//mRzxZXSBbbfWJO9/8my.RgZpen9DcDmDxFHB9JblgJtrK",
      id: 7,
      created: "2023-07-14T09:39:15.347Z",
      updated: "2023-07-14T09:39:15.347Z",
      token: "token"
    };
    expect(result).toMatchObject(registerData); 
  })

  it("calling login", async () => {
    const dto = new UserEntity();
    const result = await authController.login(dto);

    expect(authService.register).toHaveBeenCalled();
    expect(result).toEqual({ email: 'user@example.com', id: 1 });

  })
});

