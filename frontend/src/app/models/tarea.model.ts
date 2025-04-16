import { Habitacion } from "./habitacion.model";

export interface Tarea {
    _id?: string;
    nombre: string;
    descripcion?: string;
    habitacion: string | Habitacion;
    frecuencia: 'diaria' | 'semanal' | 'quincenal' | 'mensual' | 'personalizada';
    diasSemana?: Array<'lunes' | 'martes' | 'miércoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo'>;
    horario?: string;
    duracionEstimada?: number;
    prioridad?: 'baja' | 'media' | 'alta';
    ultimaEjecucion?: Date;
    proximaEjecucion?: Date;
    completado?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}