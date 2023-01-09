import { Prisma } from '@prisma/client';

export const entrySelect = {
  list: {
    include: {
      user: true,
    },
  },
} as const;

const entryDbResponse = Prisma.validator<Prisma.EntryArgs>()({ include: entrySelect });

export type EntryDbResponse = Prisma.EntryGetPayload<typeof entryDbResponse>;
