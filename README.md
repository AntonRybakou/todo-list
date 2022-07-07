## Pet project "To-do list"
### by Anton Rybakou

![img.png](img.png)

### Using:
1. [TypeScript](https://www.typescriptlang.org/)
2. [React](https://reactjs.org/)
3. [Redux](https://redux.js.org/)
4. [MUI](https://material-ui.com/)
5. [Storybook](https://storybook.js.org/)

### Structure:
```mermaid
  graph LR;
    I(Index.tsx)-->A(AppWithRedux.tsx);
    A--function to add new ToDo-->C1(FullInput.tsx);
    A--data-->T(ToDoList.tsx);
    
    T--function to add new Task-->C2(FullInput.tsx);
    T--map all tasks-->C3(Task.tsx);
```