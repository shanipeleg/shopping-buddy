import CustomError from "./CustomError";
export enum entities {
  CATEGORIES = "category",
  LISTS = "list",
  LIST_ITEM = "item in list",
}

class EntityNotFound extends CustomError {
  constructor(entity: entities, id: number) {
    super();

    console.log(entity, id);
    //log not found

    this.message = `This ${entity} was not found!`;
    this.status = 404;
  }
}

export default EntityNotFound;
