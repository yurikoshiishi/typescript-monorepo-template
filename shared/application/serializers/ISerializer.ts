export abstract class ISerializer<Serialized, Deserialized> {
  abstract serializeOne(data: any): Serialized;
  abstract serializeMany(data: any): Serialized[];
  abstract deserializeOne(data: any): Deserialized;
  abstract deserializeMany(data: any): Deserialized[];
}
