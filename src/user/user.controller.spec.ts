import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard, PassportModule } from '@nestjs/passport';


describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: UserService,
      useFactory: () => ({
        findByEmail: jest.fn().mockResolvedValue({ id: 1, email: 'user@example.com' }),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        ApiServiceProvider
      ],
      imports: [passportModule]
    }).compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });


  it("calling findCurrentUser method", async () => {
    const dto = new UserEntity();
    const result = await userController.findCurrentUser(dto);    
    expect(result).toMatchObject({ email: "user@example.com" });  })

  it("calling find findCurrentUser by email", async () => {
    const dto = new UserEntity();
    dto.id = 1;

    const result = await userController.findCurrentUser(dto);

    expect(userService.findByEmail).toHaveBeenCalled();
    expect(result).toEqual({ id: 1, email: 'user@example.com' });

  })
});

