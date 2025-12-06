This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Design

For this project, I used NextJS and Tailwind largely because I am most used to them and was able to be more agile with using them. NextJS also allows for simpler backend integration and simpler file structure (which didn't come into play for this small project). Tailwind is a useful and easy to use styling library allowing quick CSS changes inline with greater state variance that can be viewed with code rather than separately in a CSS file.

### AddItemForm

Top-most yellow box that collects inputs from the user. Pressing the enter key or clicking the "Add to Staged Changes" button will validate the inputs and submit an edit to the staging area. 

#### Features

1. Input a batch of UUIDs that can be separated by spaces, commas, or newlines. The first UUID is the one that will be worked on, and the list will be automatically updated as the user submits individual edits.
2. The score input can be toggled between a Number, String, or Boolean, which will result in the final edit having that type in the "value" key. Toggling these types changes the input field to match, with the boolean having a checkbox.
3. Lock each field. This does a few things. 
  - The user can't accidentally change the value in the field. 
  - When the user tabs through the form inputs, the locked fields will be skipped. This allows the user to, for example, work on similar entries that all have the same score, explanation, reason, or (probably most commonly) scorer. 
  - Fields that are locked will be saved for the next individual edit, while ones that are not locked will be reset. This last feature does not apply to the Sample UUIDs field, since that one updates by removing one UUID every time the one currently being worked on is submitted.
4. Validation
  - All fields are required except for Explanation
  - Score field will be validated based on the radio buttons determining its type
  - If the same UUID is detected either within the list of Sample UUIDs in the text field input OR saved in the staging area (altogether), a red validation error will appear below the text field warning the user of the duplicate UUID entry.
5. Responsive to screen width, updating number of columns.

Once submitted, the data is collected and stored in an array state that is shared with the rest of the application. This state is used to populate the staging area which is located beneath the first form. This area will be empty until entries are added.

#### Improvements

1. Currently, the typing radio buttons are not saved when the form is submitted. 
2. Using a checkbox for the Boolean option may not be the most keyboard-friendly mass-edit functionality. Could replace with a textbox that only accepts "t" or "f" or something similar which is translated downstream into a boolean value.
3. To improve keyboard-friendliness, could make it so each time the form is submitted, the first unlocked field is automatically focused.
4. Improve validation to only accept certain formats of UUIDs, ranges of scores, amount of text for explanation/reason.
5. Include an animation to verify that submission succeeded.

#### Bugs

1. If submission fails due to a duplicate UUID validation error, unlocked fields will be reset. This can be fixed through state or disabling default form submission.
2. A score value of "false" cannot be submitted due to a checkbox validation error. This can be fixed by workarounds for the validation or by using something other than a checkbox.

### ReviewSingleChange

Individual grey boxes that appear when there are staged edits. There can be many of these at once.

#### Features

1. Displays the details of the staged changes in an easy to read format.
2. An edit button that changes the state of the element to a form which has the following features:
    - Similar functionality as the AddItemForm, but without the textarea for batch UUID submission
    - If the user attempts to change the UUID to one which is already in the staged changes, submission of the edit will be cancelled and the form will revert to its original state, and a validation error will be displayed at the bottom of the form.
    - Confirming the edit will update the item in-place and return the element to its display version.
    - The Delete Entry button will delete the single edit associated with the element in the array state, and it will not be submitted in the POST request. This means deleting an entry takes two steps: one to get into the form to get to the delete button and then another to click the button.
    - The Delete Entry button cannot be tabbed to from the keyboard.

#### Improvements

1. The edit form grows too large and looks too similar to the AddItemForm.
2. Long strings will cause some boxes to be larger than others, which can be fixed with more styling.

#### Bugs

1. The edit form does automatically highlight the correct radio button type, but this doesn't automatically display the correct input type. This can be fixed through states.
2. The typing for the score value in the edit form often results in a display of NaN. This can be fixed through type management.

### ReviewChangesForm

Contains all ReviewSingleChange elements and has a "Submit All Edits" button at the bottom of the screen.

#### Features

1. Submitting will take the array state for staged changes and send a POST request to /api/score-edits in JSON form that adheres to the API Contract. An interface for a SingleEdit exists in AddItemForm that contains the typing for individual items in the edits array.
2. Currently, this response is mocked by logging the stringified JSON and randomly "succeeding" or "failing", with failure at 10% chance. Success or failure will show a green or red notification below the submission button for five seconds.
3. Responsive, separating ReviewSingleChange elements into up to 5 columns.

#### Improvements

1. Make a more robust mock with a fake API. 
2. Handle different error types.
3. Highlight problematic edits on error.

## General Improvements

### Questions for Users
1. Is it desired to have a more horizontal interface with the list of edits on the right instead of beneath the AddItemForm?
2. Is there a preferred format for reading the batch of edits?
3. Is the batch editing of SampleUUIDs useful, or is there a different format that a bunch of UUIDs might be pasted in that could be automatically separated?
4. Would it be useful to fetch existing data from the API to compare with edits? Perhaps once an edit is added, the display could optionally see what values are being changed by this edit.

### Additional Improvements
1. Unit tests
2. Copy as JSON Button
3. More code factoring
4. Global states to simplify prop drilling--able to accomplish through React Context API