export interface Task {
  id: string;
  name: string;
  description: string;
  ingredients: []; // Change to list of ingredients
  kitchenware: []; // Change to list of kitchenware
  duration: number;
  difficulty: number;
  points: number;
  finished: boolean;
  assignee: string; // Change to User
}

export const defaultTask: Task = {
  id: '',
  name: 'Default Task',
  description: 'Something went wrong',
  ingredients: [], // Change to list of ingredients
  kitchenware: [], // Change to list of kitchenware
  duration: 0,
  difficulty: 0,
  points: 0,
  finished: false,
  assignee: '', // Change to User
};
