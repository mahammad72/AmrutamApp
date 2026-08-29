import { ApiError } from './types';

const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

export async function apiRequest<T>(
  request: () => Promise<T>,
): Promise<T> {
  try {
    await delay(300);

    return await request();
  } catch (error) {
    const apiError: ApiError = {
      status: 500,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong',
    };

    throw apiError;
  }
}