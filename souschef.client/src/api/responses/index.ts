export enum DIFFICULTY {
  Easy,
  Medium,
  Hard,
}

export interface Task {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[]; // Change to list of ingredients
  kitchenware: Kitchenware[]; // Change to list of kitchenware
  duration: number;
  difficulty: DIFFICULTY;
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
  difficulty: DIFFICULTY.Easy,
  points: 0,
  finished: false,
  assignee: '', // Change to User
};

export interface Recipe {
  id: string;
  name: string;
  date: number;
  duration: number;
  difficulty: DIFFICULTY;
  serves: number;
  ownerId: string | null;
  favorites: number;
  tasks: Task[]; // Change to list of task
  ingredients: Ingredient[]; // Change to list of ingredients
  kitchenware: Kitchenware[]; // Change to list of kitchenware
}

export const defaultRecipe: Recipe = {
  id: '',
  name: 'Default Recipe',
  date: 0,
  duration: 0,
  difficulty: DIFFICULTY.Easy,
  serves: 0,
  ownerId: null,
  favorites: 0,
  tasks: [], // Change to list of task
  ingredients: [], // Change to list of ingredients
  kitchenware: [], // Change to list of kitchenware
};

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
}

export interface Kitchenware {
  id: string;
  name: string;
  quantity: number;
}
