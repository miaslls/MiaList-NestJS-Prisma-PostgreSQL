import { Prisma } from '@prisma/client';

export const tagSelect = {
  user: true,
  lists: {
    include: {
      category: true,
      tags: true,
      entries: true,
    },
  },
  _count: {
    select: {
      lists: true,
    },
  },
} as const;

const tagDbResponse = Prisma.validator<Prisma.TagArgs>()({ include: tagSelect });

export type TagDbResponse = Prisma.TagGetPayload<typeof tagDbResponse>;
