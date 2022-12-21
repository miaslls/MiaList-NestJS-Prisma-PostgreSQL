import { Injectable } from '@nestjs/common';

import { HomeRepository } from './home.repository';
import { HomeResponse } from './HomeResponse';

@Injectable()
export class HomeService {
  constructor(private readonly homeRepository: HomeRepository) {}

  // 📌 READ

  async findAllLists(userId: string): Promise<HomeResponse> {
    const pinnedLists = await this.homeRepository.findPinnedLists(userId);
    const unpinnedLists = await this.homeRepository.findUnpinnedLists(userId);

    return { pinnedLists, unpinnedLists };
  }
}
