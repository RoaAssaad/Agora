import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Community } from './community.entity';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { User } from '../users/user.entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private communityRepository: Repository<Community>,
  ) {}

  /**
   * Creates a new community.
   * @param createDto - DTO containing name, title, description.
   * @param creator - The user creating the community.
   */
  async create(createDto: CreateCommunityDto, creator: User): Promise<Community> {
    const community = this.communityRepository.create({
      ...createDto,
      creator,
    });

    return this.communityRepository.save(community);
  }

  /**
   * Retrieves all communities with their creator info.
   */
  async findAll(): Promise<Community[]> {
    return this.communityRepository.find({ relations: ['creator'] });
  }

  /**
   * Finds a community by ID.
   * @throws NotFoundException if not found.
   */
  async findOne(id: string): Promise<Community> {
    const community = await this.communityRepository.findOne({
      where: { id },
      relations: ['creator'],
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community;
  }

  /**
   * Finds a community by name (case-insensitive).
   * @param name - Community name (used in URL)
   * @throws NotFoundException if not found.
   */
  async findByName(name: string): Promise<Community> {
    const community = await this.communityRepository.findOne({
      where: { name: ILike(name) }, // ✅ Case-insensitive match
      relations: ['creator'],
    });

    if (!community) {
      throw new NotFoundException('Community not found');
    }

    return community;
  }

  /**
   * Updates a community (creator-only).
   * @throws ForbiddenException if user is not the creator.
   */
  async update(id: string, updateDto: UpdateCommunityDto, user: User): Promise<Community> {
    const community = await this.findOne(id);

    if (community.creator.id !== user.id) {
      throw new ForbiddenException('You are not allowed to update this community');
    }

    Object.assign(community, updateDto);
    return this.communityRepository.save(community);
  }

  /**
   * Deletes a community (creator-only).
   * @throws ForbiddenException or NotFoundException
   */
  async remove(id: string, user: User): Promise<void> {
    const community = await this.findOne(id);

    if (community.creator.id !== user.id) {
      throw new ForbiddenException('You are not allowed to delete this community');
    }

    const result = await this.communityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Community not found');
    }
  }
}
