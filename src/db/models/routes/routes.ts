import express, { Request, Response } from 'express';
import Department from '../dept';

const departmentRouter = express.Router();

// Middleware
departmentRouter.use(express.json());

// Get all departments
departmentRouter.get('/deptget', async (req: Request, res: Response) => {
    try {
        const departments = await Department.findAll();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Add a new department
departmentRouter.post('/deptpost', async (req: Request, res: Response) => {
    const { departmentName, manager } = req.body;

    try {
        const newDepartment = await Department.create({ departmentName, manager });
        res.status(201).json(newDepartment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Update an existing department
departmentRouter.put('/deptput/:departmentId', async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const { departmentName, manager } = req.body;

    try {
        const departmentToUpdate = await Department.findByPk(departmentId);

        if (!departmentToUpdate) {
            return res.status(404).json({ error: 'Department not found' });
        }

        departmentToUpdate.departmentName = departmentName;
        departmentToUpdate.manager = manager;

        await departmentToUpdate.save();
        res.json(departmentToUpdate);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Delete a department
departmentRouter.delete('/deptdel/:departmentId', async (req: Request, res: Response) => {              
    const { departmentId } = req.params;

    try {
        const departmentToDelete = await Department.findByPk(departmentId);

        if (!departmentToDelete) {
            return res.status(404).json({ error: 'Department not found' });
        }

        await departmentToDelete.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default departmentRouter;
