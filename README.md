
# PromptDB

PromptDB is a full-stack application designed for managing and interacting with a diverse range of prompts. It features user authentication and provides users with the ability to add, edit, delete, and like prompts.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

Follow these steps to get your development environment running:

1. **Clone the Repository:**
   ```bash
   git clone git@github.com:jpatel98/promptDB-server.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd promptDB-server
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Environment Setup:**
   Create a `.env` file in the root of your project and update it with your environment-specific details based on .env.example file.

5. **Start the Server:**
   ```bash
   npm start
   ```

## API Routes

### User Routes

1. **User Registration**
   - **Method**: POST
   - **Endpoint**: `/api/users/register`
   - **Description**: Registers a new user.
   - **Body**: `{ username, email, password }`

2. **User Login**
   - **Method**: POST
   - **Endpoint**: `/api/users/login`
   - **Description**: Authenticates a user and returns a token.
   - **Body**: `{ email, password }`

### Prompt Routes

1. **Add a New Prompt**
   - **Method**: POST
   - **Endpoint**: `/api/prompts/add`
   - **Description**: Adds a new prompt. Requires authentication.
   - **Body**: `{ title, description, tags }`

2. **Get All Prompts**
   - **Method**: GET
   - **Endpoint**: `/api/prompts/all`
   - **Description**: Retrieves all prompts.

3. **Get Prompt by ID**
   - **Method**: GET
   - **Endpoint**: `/api/prompts/getById/:promptId`
   - **Description**: Retrieves a specific prompt by its ID. Requires authentication and user must be the creator of the prompt.
   - **URL Parameters**: `promptId`

4. **Edit a Prompt**
   - **Method**: PUT
   - **Endpoint**: `/api/prompts/edit/:promptId`
   - **Description**: Edits an existing prompt. Requires authentication and user must be the creator of the prompt.
   - **URL Parameters**: `promptId`
   - **Body**: `{ title, description, tags }`

5. **Delete a Prompt**
   - **Method**: DELETE
   - **Endpoint**: `/api/prompts/delete/:promptId`
   - **Description**: Deletes a prompt. Requires authentication and user must be the creator of the prompt.
   - **URL Parameters**: `promptId`

6. **Like a Prompt**
   - **Method**: PUT
   - **Endpoint**: `/api/prompts/like/:promptId`
   - **Description**: Adds a like to a prompt.
   - **URL Parameters**: `promptId`

7. **Unlike a Prompt**
   - **Method**: PUT
   - **Endpoint**: `/api/prompts/removeLike/:promptId`
   - **Description**: Removes a like from a prompt.
   - **URL Parameters**: `promptId`
