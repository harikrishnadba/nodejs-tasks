import { DataTypes, Model, Optional } from "sequelize";
import sequelizeconnection from "../models/config";

interface DepartmentAttributes {
    departmentId: number;
    departmentName: string;
    manager: string;
}

export interface DepartmentInput extends Optional<DepartmentAttributes, 'departmentId'> {}
export interface DepartmentOutput extends Required<DepartmentAttributes> {}

class Department extends Model<DepartmentAttributes, DepartmentInput> implements DepartmentAttributes {
    public departmentId!: number;
    public departmentName!: string;
    public manager!: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

Department.init(
    {
        departmentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false,
        },
        departmentName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        manager: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: 'departments',
        timestamps: true,
        paranoid: true,
        sequelize: sequelizeconnection
    }
);

export default Department;
