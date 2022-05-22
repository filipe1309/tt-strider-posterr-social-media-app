import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MentionModel } from '../../domain/model/mention';
import { MentionRepository } from '../../domain/repositories/mentionRepository.interface';
import { Repository } from 'typeorm';
import { Mention } from '../entities/mention.entity';

@Injectable()
export class DatabaseMentionRepository implements MentionRepository {
  constructor(
    @InjectRepository(Mention)
    private readonly mentionEntityRepository: Repository<Mention>,
  ) {}
  async insert(mention: MentionModel): Promise<MentionModel> {
    const result = await this.mentionEntityRepository.save(
      this.toMentionEntity(mention),
    );
    return this.toMention(result);
  }
  async findAllMentionByPostIdFrom(id: string): Promise<MentionModel[]> {
    const mentions = await this.mentionEntityRepository.find({
      where: { post_id_from: id },
    });
    return mentions.map((mention) => this.toMention(mention));
  }

  private toMention(mentionEntity: Mention): MentionModel {
    const mention: MentionModel = new MentionModel();

    mention.post_id_from = mentionEntity.post_id_from;
    mention.post_id_to = mentionEntity.post_id_to;

    return mention;
  }

  private toMentionEntity(mention: MentionModel): Mention {
    const mentionEntity: Mention = new Mention();

    mentionEntity.post_id_from = mention.post_id_from;
    mentionEntity.post_id_to = mention.post_id_to;

    return mentionEntity;
  }
}
