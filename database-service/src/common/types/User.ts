export interface User {
    id?: string
    name?: string
}

export function parseUser(jsonString: string): User {
    try {
      const data = JSON.parse(jsonString);
      return {
        id: data.id,
        name: data.name,
      } as User;
    } catch (error) {
      throw new Error('Invalid user data');
    }
  }