import HttpError from './HttpError';

class NotFoundURLError extends HttpError {
  constructor() {
    super(404, 'URL not found');
  }
}
export default NotFoundURLError;
