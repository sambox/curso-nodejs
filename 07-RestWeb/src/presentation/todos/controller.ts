import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dto";

const todos = [
  {
    id: 1,
    text: 'Buy milk',
    completedAt: new Date()
  },
  {
    id: 2,
    text: 'Buy bread',
    completedAt: null
  },
  {
    id: 3,
    text: 'Buy butter',
    completedAt: new Date()
  }
];

export class TodoController {

  constructor() {

  }

  public getTodos = async (req: Request, res: Response) => {
    return res.json(await prisma.todo.findMany());
  };

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (this.validateId(id)) {
      return res.status(400).json({ error: 'id is required and must be a number' });
    }
    const todo = await prisma.todo.findFirst({ where: { id: parseInt(id) } });
    if (!todo) {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }
    return res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) {
      return res.status(400).json({ error });
    }
    const todo = await prisma.todo.create({
      data: createTodoDto!
    })

    return res.send(todo);
  }

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    
    if (this.validateId(id)) {
      return res.status(400).json({ error: 'id is required and must be a number' });
    }

    const [error, updateTodo] = UpdateTodoDto.create({
      ...req.body,
      id: parseInt(id)
    })
    if (error) {
      return res.status(400).json({ error });
    }

    try {
      const todo = await prisma.todo.update({
        where: { id: parseInt(id) },
        data: updateTodo!.values
      });
      return res.json(todo);
    } catch (error) {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }
  }

  private validateId = (id: string) => {
    return !id || isNaN(parseInt(id));
  }

  public deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (this.validateId(id)) {
      return res.status(400).json({ error: 'id is required and must be a number' });
    }
    const todo = await prisma.todo.delete({ where: { id: parseInt(id) } });
    if (!todo) {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }

    res.json(todo);
  }

}