export type Language = 'ru' | 'us' | 'fr';

export interface IUser {
    id: string;
    name: string;
    phone: string;
    address: string;
}

export type fieldType = 'id' | 'name' | 'address' | 'phone';
