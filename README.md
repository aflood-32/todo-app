# TODO App
## Running the Project Locally
### Prerequisites

- [Node.js](https://nodejs.org/en) (Latest LTS version recommended)
- npm (comes with Node.js) or yarn

### Setup Instructions

1. Clone the Repository:

```bash
git clone https://github.com/aflood-32/todo-app.git
cd todo-app
```

3. Install Dependencies:
```bash
npm install
```
4. Run the Development Server:
```bash
npm run dev
```
5. Open the App:
- The app should now be running at [http://localhost:5173](http://localhost:5173)

## Project Structure (Feature-Sliced Design)
The project follows the [Feature-Sliced Design](https://feature-sliced.design/) (FSD) architecture, structured as follows:

- App — everything that makes the app run — routing, entrypoints, global styles, providers.
- Pages — full pages or large parts of a page in nested routing.
- Widgets — large self-contained chunks of functionality or UI, usually delivering an entire use case.
- Features — reused implementations of entire product features, i.e. actions that bring business value to the user.
- Entities — business entities that the project works with, like user or product.
- Shared — reusable functionality, especially when it's detached from the specifics of the project/business, though not necessarily.

## Project Features

- simple, but nice design (UI/UX)
- move tasks across columns
- move columns
- reorder tasks in the list using drag-and-drop
- work on desktop and mobile devices
- persist the list of tasks in local storage so that it is preserved between page refreshes
- add/edit new tasks to the list
- to edit the text of a task after it has been added to the list
- remove tasks from the list
- add columns
- mark tasks as complete or incomplete
- completed tasks should be visually distinguished from incomplete tasks


## Project TODOs

- delete columns
- filter the list of tasks by their completion status (i.e. show only completed tasks or only incomplete tasks)
- “Select all” tasks in each column
- select several/all tasks for manipulation purposes (delete, mark as complete, mark and incomplete, move to a different column)
- search tasks by name
- while searching by the name, highlight the text that the user is searching for.
- “Smart search” - search not only by direct match but similarities (up to your preferences).
- document the code.
