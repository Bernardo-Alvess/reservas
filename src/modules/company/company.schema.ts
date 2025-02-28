import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  cnpj: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  phone: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
