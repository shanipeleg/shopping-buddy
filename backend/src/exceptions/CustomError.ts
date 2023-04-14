class CustomError extends Error {
  status: number;
  constructor() {
    super();

    this.message = `An unknown error occured!`;
    this.status = 500;
  }
}

export default CustomError;
