import { IsString, IsNotEmpty } from 'class-validator';
import { Expose } from "class-transformer"

export class ProductDto {
  @Expose()
  @IsNotEmpty() 
  @IsString()
  id: string;

  @Expose()
  @IsNotEmpty() 
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty() 
  @IsString() 
  author: string;

  @Expose()
  @IsNotEmpty() 
  @IsString()
  editorial: string; 
}
