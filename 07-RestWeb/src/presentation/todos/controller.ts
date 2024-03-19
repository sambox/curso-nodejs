import { Request, Response } from "express";

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

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const {id} = req.params;
    if (this.validateId(id))  {
      return res.status(400).json({error: 'id is required and must be a number'});
    }
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({error: `Todo with id ${id} not found`});
    }
    return res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const {text} = req.body;
    if (!text) {
      return res.status(400).json({error: 'text property is required'});
    }
    const todo = {
      id: todos.length + 1,
      text,
      completedAt: new Date()
    }
    todos.push(todo);
    return res.send(todo);
  }

  public updateTodo = (req: Request, res: Response) => {
    const {text, completedAt} = req.body;
    const {id} = req.params;

    if (this.validateId(id))  {
      return res.status(400).json({error: 'id is required and must be a number'});
    }
    
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({error: `Todo with id ${id} not found`});
    }

    todo.text = text || todo.text;
    todo.completedAt = completedAt === 'null' ? null : new Date(completedAt || todo.completedAt);

    return res.json(todo);
  }

  private validateId = (id: string) => {
    return !id || isNaN(parseInt(id));
  }

  public deleteTodo = (req: Request, res: Response) => {
    const {id} = req.params;
    if (this.validateId(id))  {
      return res.status(400).json({error: 'id is required and must be a number'});
    }
    const todo = todos.find(todo => todo.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({error: `Todo with id ${id} not found`});
    }
    todos.splice(todos.indexOf(todo), 1);
    res.json(todo);
  }

}