import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Plane } from './plane.entity';
import { CabinClass } from '../common/enums';

@Entity()
export class PlaneSeat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string; // e.g., "12A"

    @ManyToOne(() => Plane, (plane) => plane.id)
    plane: Plane;

    @Column()
    planeId: number;

    @Column({
        type: 'enum',
        enum: CabinClass,
        default: CabinClass.ECONOMY,
    })
    class: CabinClass;
}
