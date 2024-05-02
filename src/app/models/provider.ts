export class Provider {
    id!: number; // Optional because it will be assigned by the server
    username!: string;
    email!: string;
    phone!: string;
    services_offered!: string;
    ratings!: number;
    availability!: 'available' | 'busy'; // Enumerated type
    image!: string; // Optional if not provided initially
  }
  