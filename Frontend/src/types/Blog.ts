export default interface Blog {
  _id?: string;
  authorId: string;
  categoryId?: string;
  title: string;
  description: string;
  image: string;
  PublishedAt?: Date;
  updatedAt?: Date;
  readingTime?: string;
}
