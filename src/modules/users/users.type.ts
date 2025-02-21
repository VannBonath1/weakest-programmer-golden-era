import { IsEnum, IsString } from 'class-validator';

enum Rank {
  TheWeakest = 'TheWeakest',
  GradeOneBugMagnet = 'GradeOneBugMagnet',
  SpecialGradeDebugger = 'SpecialGradeDebugger',
  TheStrongest = 'TheStrongest',
}

export class CreateUserDTO {
  @IsString()
  programmerName: string;

  @IsEnum(Rank)
  rank: Rank;
}
