'use server';

import { signIn, signOut } from '@/auth';
import { signInFormSchema } from '../validators';

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    // 从表单中获取数据，并使用 Zod schema 进行验证
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    // 如果错误是一个重定向错误，则重新抛出
    if (error instanceof Error && error.name === 'RedirectError') {
      throw error;
    }

    return { success: false, message: 'Invalid email or password' };
  }
}

// Sign the user out
export async function signOutUser() {
  await signOut();
}
