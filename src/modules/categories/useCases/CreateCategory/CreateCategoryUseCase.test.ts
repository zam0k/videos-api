import { AppError } from '@errors/AppError';
import { ICategoryRepository } from '@modules/categories/repositories/ICategoryRepository';
import { CategoryRepositoryInMemory } from '@modules/categories/repositories/in-memory/CategoryRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoryRepositoryInMemory: ICategoryRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('create category', () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory,
    );
  });

  it('should be able to create a category', async () => {
    const category = await createCategoryUseCase.execute('Test Title');

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a category with a title already taken', async () => {
    await createCategoryUseCase.execute('Test Title');

    expect(async () => {
      await createCategoryUseCase.execute('Test Title');
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a category without a title', async () => {
    expect(async () => {
      await createCategoryUseCase.execute('');
    }).rejects.toBeInstanceOf(AppError);
  });
});
