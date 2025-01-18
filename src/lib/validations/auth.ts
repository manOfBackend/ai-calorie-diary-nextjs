import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string({ required_error: '이메일을 입력해주세요' })
    .min(1, '이메일을 입력해주세요')
    .email('유효하지 않은 이메일입니다'),
  password: z
    .string({ required_error: '비밀번호를 입력해주세요' })
    .min(1, '비밀번호를 입력해주세요')
    .min(8, '비밀번호는 8자 이상이어야 합니다')
    .max(32, '비밀번호는 32자 이하여야 합니다'),
});

export const signUpSchema = signInSchema
  .extend({
    confirmPassword: z
      .string({ required_error: '비밀번호 확인을 입력해주세요' })
      .min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
