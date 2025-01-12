import * as z from 'zod';

export const MosqueSchema = z.object({
  name: z.string().min(1, { message: 'Field ini harus diisi' }),
  address: z.string().min(1, { message: 'Field ini harus diisi' }),
  latitude: z.string().min(1, { message: 'Field ini harus diisi' }),
  longitude: z.string().min(1, { message: 'Field ini harus diisi' }),
});
