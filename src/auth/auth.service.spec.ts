import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { mockUser } from '../mocks/user.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('token'),
            verify: jest
              .fn()
              .mockReturnValue({ id: 'userid', name: 'username' }),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('createToken', () => {
    it('should create a JWT', () => {
      const result = authService.createToken(mockUser[0]);
      expect(result).toEqual({ accessToken: 'token' });
    });
  });

  describe('verifyToken', () => {
    it('should verify the provided JWT', () => {
      const result = authService.verifyToken('token');
      expect(result).toEqual({ id: 'userid', name: 'username' });
    });
  });
});
