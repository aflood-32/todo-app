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
