import * as z from 'zod';

export const TextMarqueesSchema = z.object({
  text: z.string().min(1, { message: 'Field ini harus diisi' })
  //   mosque: z.string().min(1, { message: 'Field ini harus diisi' })
});
