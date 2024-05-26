# DivvyUp 👬💰
DivvyUp is a simple React application designed to help you manage and split bills with friends. With DivvyUp, you can easily keep track of who owes whom and ensure that all expenses are fairly divided.

## Features 🗒️
- Add Friends: Easily add friends to your list.
- Split Bills: Split bills between you and your friends.
- Track Balances: Keep track of how much each friend owes or is owed.

## Technologies Used 💻
- React: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.

## Installation 🧑‍💻

Clone the repository:
```
git clone https://github.com/your-username/divvyup.git
```
Navigate to the project directory:
```
cd divvyup
```
Install dependencies:
```
npm install
```
Start the development server:
```
npm run dev
```
The application should now be running on http://localhost:5173.

## Usage 💳

### Add a Friend:

- Click the "Add Friend" button.
-Fill in the friend's name and image URL.
- Click "Add" to add the friend to your list.

### Select a Friend:

- Click on the "Select" button next to a friend's name to select that friend.
- Click "Close" to deselect the friend.

### Split a Bill:

- With a friend selected, fill in the bill value and your expense.
- Select who is paying (you or your friend).
- Click "Add" to split the bill.

## Code Overview 📖

### Components 🔨
- App: The main component that holds the state and renders the sidebar and forms.
- FriendsList: Renders the list of friends.
- Friend: Represents a single friend in the list.
- Button: A reusable button component.
- FormAddFriend: A form to add new friends.
- FormSplitBill: A form to split a bill with a selected friend.

## State Management 👷
- friends: Holds the list of friends.
- showAddFriend: Controls the visibility of the "Add Friend" form.
- selectedFriend: Holds the currently selected friend.

## Styling 💅
Tailwind CSS: Used for styling the application. Utility classes are applied directly to the JSX elements.

