export class Service {
    id!: number; // Optional since it's auto-incremented
    title!: string;
    description!: string;
    category!: string;
    price!: number;
    availability!: 'available' | 'not_available';
    ratings!: number; // Optional since it can be null
    image!: string;
  }
  