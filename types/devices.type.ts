import * as z from 'zod';

export const DeviceSchema = z.object({
  name: z.string().min(1, { message: 'Field ini harus diisi' }),
  device_token: z.string().min(1, { message: 'Field ini harus diisi' }),
  is_active: z.boolean(),
  mosque: z.string().min(1, { message: 'Field ini harus diisi' }),
});
