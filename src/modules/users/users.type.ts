import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

enum Rank {
  TheWeakest = 'TheWeakest',
  GradeOneBugMagnet = 'GradeOneBugMagnet',
  SpecialGradeDebugger = 'SpecialGradeDebugger',
  TheStrongest = 'TheStrongest',
}

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  programmerName: string;

  @IsNotEmpty()
  @IsEnum(Rank)
  rank: Rank;
}

export class UpdateProfileDTO {
  @IsOptional()
  @IsEnum(Rank)
  rank?: Rank;
}
