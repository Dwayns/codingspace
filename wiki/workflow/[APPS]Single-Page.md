# SINGLE PAGE APPS - HOW TO
> The single page apps consume (by making request...) the API
- Buid a JSON API
- Build a single page app

---
## Needs
Back-End JSON API | Front-End
:---------------: | :----:
*Techno*          | *Techno*
**Express**           | Vanilla JS
Rails             | jQuery
Django            | **React**
Flask             | Vue JS
--                | Angular

---

## THE API 
### The GAMEPLAN (Structure of the database)

#### The DATA (Schema)
Field        | Type
---          | ---
name         | String
completed    | Boolean
createdDate  | Date

#### The ROUTES
Verb    | Route                | Description
---     | ---                  | ---
GET     | /api/todos           | List all todos
POST    | /api/todos           | Create new todo
GET     | /api/todos/:todold   | Retrieve a todo
PUT     | /api/todos/:todold   | Update a todo
DELETE  | /api/todos/:todold   | Delete a todo

- 