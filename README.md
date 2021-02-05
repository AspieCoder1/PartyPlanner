# PartyPlanner.io

[![Netlify Status](https://api.netlify.com/api/v1/badges/a8270273-c66b-419e-9906-53700823fa34/deploy-status)](https://app.netlify.com/sites/pedantic-volhard-92b910/deploys)

Link the [backend docs](https://pedantic-volhard-92b910.netlify.app)

Team X1 COMP10120 project.
The repository has the following file structure:

- `api` &mdash; folder to store the api setup.
- `db` &mdash; folder to database config files and any extra docker setup we need for testing.
- `frontend` &mdash; folder for UI.
- `docs` &mdash; this is the folder for our API documentation. Please add the documentation for new API routes here.

# How to edit code in the repository
Here is a guide on how to create an edit in the code. 
For this we need to know the following information:
- Branches in the top down menu.
- To create a branch you run the command `git branch <branch_name>`.
- You then run `git checkout <branch_name>` to go to a specific branch.
- A branch is a separate commit time line which is the parent branch.
- To rejoin two branches together you merge them by starting a pull request.

Please remember the golden rule for when using github collaboratively,

>**NEVER COMMIT CODE DIRECTLY TO THE MASTER BRANCH AS THIS BRANCH CONTAINS OUR PRODUCTION READY CODE.**
>
>**YOU SHOULD ALWAYS CREATE A SEPARATE BRANCH AND THEN CREATE A PULL REQUEST.**

### Steps to edit the code:
1. Make sure your master branch is upto date by running `git pull origin`.
2. Make sure you are on the master branch `git checkout master`.
3. Create a new branch with an appropriately descriptive name,`git branch <descriptive_name>`.
4. Checkout to that branch, `git checkout <descriptive_name>`
5. Do you edits and commit and push them to the remote repository
6. Open a pull request. You may have to deal with merge conflicts,
   only accepts changes to the files you have actually edited.
7. Send a message on the group chat and ask someone to review it.
   I have set it up so people have to manually check each other's work before merging.
   This prevents errors and means no one person is responsible for breaking anything.