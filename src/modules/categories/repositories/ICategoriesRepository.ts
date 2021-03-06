import { Category } from '../infra/typeorm/entities/Category';

interface ICategoriesRepository {
  create(title: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  findByTitle(title: string): Promise<Category>;
  findById(id: string): Promise<Category>;
  updateCategory(category: Category): Promise<void>;
  deleteCategory(id: string): Promise<void>;
  findByIds(ids: string[]): Promise<Category[]>;
}

export { ICategoriesRepository };
