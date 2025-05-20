# React level 3 Certification

**React** + **TypeScript** + **Vite**

### Packages

Tailwind

# Instructions:

## EXERCISE #1

Create a generic localStorage handler usable by React function component

1. Your API should enable any React function component to store a new key/value pair in the browser’s localStorage.

2. A component should also be able to subscribe to a specific key and receive updates when the corresponding value is added, updated, or deleted. Such an update should trigger a component re-render when needed.

3. Any component using your API must not be aware that localStorage is being used. All interactions with the native browser storage must be hidden from consumer components.

4. Changing the localStorage value outside of the scope of the React application should also send an update to subscribed components (a small delay is acceptable in that scenario).

5. Illustrate your handler with an example that uses at least two different components: One can set a value in localStorage using the API, and the other can receive any update and display it instantly on the screen.

## EXERCISE #2

Create a generic dialog component that can be customized with any content
In this step, we want to create a dialog component displayed as an overlay for different use cases:

1. The component can be used as a modal (the user has to close it before being able to interact with the rest of the webpage) or a regular dialog (the user can still interact with the rest of the page)

2. You cannot use any third-party component library for this, though you can use third-party CSS to achieve the modal/dialog overlay effect if needed.

3. The dialog's header, body, and footer could be any HTML/component the user wants. The dialog API should also expose a way to open/close it from another component.

4. Create a sample component that illustrates different use cases of your dialog.

## EXERCISE #3

Create a generic auto-filter dropdown component to filter any kind of data
The user should be able to filter a data list by typing text into the dropdown as in the example here (this example shows countries, but your component should be generic enough to support any list of data as well, not just countries):

1. If the user types 'En', then only the items that have ‘en’ in their name should show up in the list

2. The filter should not be case-sensitive.

3. We should be able to specify (as a prop) which object property name is used for both the option label and filtering (for instance, “name” or “description”)

4. The matching portion(s) of the option label should be rendered in bold text, for instance, Entertainment

5. The user should be able to select a list item that will be returned by the component using a callback prop called "valueChange".

6. No third-party component is allowed for the dropdown, just regular HTML/CSS/ React.

7. To illustrate its behavior, use your new auto-filter dropdown with two different data samples in a test component. You can use this free public API as one example: https://jsonplaceholder.typicode.com/users

# Preview

![Preview](public/preview.png)

# Copyright

**©Loïc BURNOTTE**
