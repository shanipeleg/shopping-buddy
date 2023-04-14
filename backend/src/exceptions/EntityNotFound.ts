import CustomError from "./CustomError";

class EntityNotFound extends CustomError {
  constructor(entityName: string, id: number) {
    super();

    console.log(entityName, id);
    //log not found

    this.message = `This ${entityName.toLowerCase()} was not found!`;
    this.status = 404;
  }
}

export default EntityNotFound;
