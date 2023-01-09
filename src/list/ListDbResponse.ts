import { Prisma } from '@prisma/client';

export const listSelect = {
  user: true,
  category: true,
  tags: true,
  entries: true,
  _count: {
    select: {
      tags: true,
      entries: true,
    },
  },
} as const;

const listDbResponse = Prisma.validator<Prisma.ListArgs>()({ include: listSelect });

export type ListDbResponse = Prisma.ListGetPayload<typeof listDbResponse>;
