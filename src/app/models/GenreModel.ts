export default class Genre {
  public id: number;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id: number, name: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static fromJson(json: any): Genre {
    return new Genre(json.id, json.name, json.created_at, json.updated_at);
  }
}
