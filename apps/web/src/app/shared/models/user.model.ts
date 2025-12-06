export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  password?: string; // In a real app, never store/send password like this on frontend models, but for mock auth it's okay-ish or just ignore it.
}
