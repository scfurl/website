1. In a new terminal window, run the following command to use Vite to create a React application:

```sh
npm create vite@latest notesapp -- --template react
y
cd notesapp
npm install
npm run dev

```

2. Create a github repo (here called website) and push changes to notesapp to github

3. Open a new terminal window, navigate to your app's root folder (notesapp), and run the following command:

```sh
npm create amplify@latest -y

```

4. Push changes

5. Open the AWS Amplify console at https://console.aws.amazon.com/amplify/apps.
6. Choose Create new app.
7. On the Start building with Amplify page, for Deploy your app, select GitHub, and select Next.
8. When prompted, authenticate with GitHub. You will be automatically redirected back to the Amplify console. 
9. Choose the repository and main branch you created earlier. Then, select Next.
10. Leave the default build settings and select Next.
11. Review the inputs selected, and choose Save and deploy.
12. Once the build completes, select the Visit deployed URL button to see your web app up and running live. 