## Dynamic form
[https://radiant-puffpuff-efb4bf.netlify.app](https://radiant-puffpuff-efb4bf.netlify.app/)

### How to setup

- Install Node.js
- Install Yarn (npm install -g yarn)
- Run yarn install or yarn
- Run yarn start to run the app locally

### Packages used
- React, TypeScript
- formik: for form
- yup: for form validation
- sass: for scss
- react-feather: for icons
- react-toastify: for toasts

### Required Features

- Each row contains `Manufacturer`, `Voltage` and `Rechargeable` field
  - Manufacturer is `Text input`
  - Voltage is `Select dropdown`
  - Rechargeable is `Checkbox`
- Clicking the `Add` button allows the user to add another row after filling out the first row
- Users can delete added rows by clicking the `Remove` button next to each row
  - If a row is empty, it will be deleted directly upon clicking `Remove`
  - If a row is not empty, the user will get two options: `Confirm` and `Cancel`. Confirm will delete the row, while Cancel will cancel the deletion
- Validation added for Manufacturer(Text field) and Voltage(Select dropdown)
- Clicking the `Submit` button allows the user to submit the form. If all fields are valid, a success toast will be displayed and the form will be reset

### Additional Features
- Added light/dark mode. Users can toggle modes by clicking on the `Sun` or `Moon` icon in the header
- Any unsaved changes will be saved to LocalStorage
- Added a `Remove All` button at the bottom, which is only visible when there are more than one row.
