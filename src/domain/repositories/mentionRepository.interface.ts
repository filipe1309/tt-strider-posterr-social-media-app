import { MentionModel } from '../model/mention';

export interface MentionRepository {
  insert(mention: MentionModel): Promise<MentionModel>;
  findAllMentionByPostIdFrom(id: string): Promise<MentionModel[]>;
}
