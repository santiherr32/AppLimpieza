export interface Habitacion {
    _id?: string;
    nombre: string;
    descripcion?: string;
    tipoHabitacion: 'cocina' | 'baño' | 'dormitorio' | 'sala' | 'comedor' | 'oficina' | 'otro';
    hogar?: string;
    createdAt?: Date;
    updatedAt?: Date;
}