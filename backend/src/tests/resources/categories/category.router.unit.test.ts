import request from "supertest";
import { createServer } from "../../../../index";
import { getAll, getOne } from "../../../resources/categories/category.service";
import EntityNotFound, { entities } from "../../../exceptions/EntityNotFound";
const app = createServer();

jest.mock("../../../resources/categories/category.service", () => ({
  getAll: jest.fn(),
  getOne: jest.fn(),
}));

describe("Category Router Unit Test", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("should return all categories", async () => {
    const mockCategories = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];
    (getAll as jest.Mock).mockResolvedValue(mockCategories);
    const response = await request(app).get("/categories");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategories);
  });

  it("should return one category when it exists", async () => {
    const mockCategory = { id: 1, name: "Category 1" };
    (getOne as jest.Mock).mockResolvedValue(mockCategory);
    const response = await request(app).get("/categories/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockCategory);
  });

  it("should return 404 when category does not exist", async () => {
    const errorMessage = "This category was not found!";
    (getOne as jest.Mock).mockImplementation(() => {
      throw new EntityNotFound(entities.CATEGORIES, 2);
    });
    const response = await request(app).get("/categories/2");
    expect(response.status).toBe(404);
    expect(response.text).toEqual(errorMessage);
  });
});
