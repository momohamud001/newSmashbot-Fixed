# SmashBot (React + Vite)

To Start project on local, follow these steps -
1. Ensure that node and npm are installed on your machine
2. Clone project directory
3. cd into the project directory
4. run `npm install`
5. run `npm run dev`

The above steps will start the project and will point to the production server.

To point to the local backend server, 
1. go to `src/utils/constants.ts`
2. Comment this line - export const API_URL: string = 'https://smashbotbackendnew.azurewebsites.net'
3. Uncomment this line - export const API_URL: string = 'http://localhost:3001'

# To Install @smashorg/ai-bot as a dependency
1. `npm install @smashorg/ai-bot@<latest-version>`
You can find the latest version in package.json
2. In your react component, do the following

```import { Interview } from "@smashorg/ai-bot";
  <Interview
    smashUserId={id.toString()}
  />
```

`smashUserId` is the unique identifier for the user in the smash database. Please send it in the string format.

