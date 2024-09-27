export const { NEXT_PUBLIC_BASE_API_URL: BASE_API_URL } = process.env;

if (!BASE_API_URL) {
  throw new Error('NEXT_PUBLIC_BASE_API_URL is not defined');
}