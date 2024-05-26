import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

import React from "react";

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">DivvyUp!</h1>
      <div className="flex flex-row space-x-6">
        <div className="w-96 p-4 bg-white shadow rounded-lg">
          <FriendsList
            friends={friends}
            onFriendSelection={handleSelectFriend}
            selectedFriend={selectedFriend}
          />
          {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
          <Button onClick={handleShowAddFriend}>
            {showAddFriend ? "Close" : "Add Friend"}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </div>
  );
}

function FriendsList({ friends, onFriendSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onFriendSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li
      className={`flex items-center space-x-4 p-4 rounded-lg transition duration-300 ${
        isSelected ? "bg-gray-200" : "hover:bg-gray-100"
      }`}
    >
      <img
        src={friend.image}
        alt={friend.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="text-red-500">
            You owe {friend.name} R{Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance > 0 && (
          <p className="text-green-500">
            {friend.name} owes you R{friend.balance}
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      </div>
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick, disabled }) {
  return (
    <button
      className={`px-4 py-2 mt-2 rounded-lg font-semibold transition duration-300 ${
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-orange-500 text-white hover:bg-orange-600"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();

    const newFriend = {
      name,
      image,
      balance: 0,
      id,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("");
  }

  return (
    <form
      className="grid gap-4 bg-gray-50 p-4 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <label className="font-medium">👬 Friend:</label>
      <input
        type="text"
        placeholder="Friend Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      />
      <label className="font-medium">🖼️ Image URL:</label>
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      ></input>
      <Button disabled={!name || !image}>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const friendExpense = bill ? bill - myExpense : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;

    onSplitBill(whoIsPaying === "user" ? friendExpense : -myExpense);
  }

  return (
    <form
      className="grid gap-4 bg-gray-50 p-6 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold">
        Split a bill with {selectedFriend.name}
      </h2>
      <label className="font-medium">💳 Bill Value:</label>
      <input
        type="text"
        placeholder="R Value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        className="p-2 border border-gray-300 rounded"
      ></input>
      <label className="font-medium">🙋‍♂️ Your expense:</label>
      <input
        type="text"
        placeholder="R Value"
        value={myExpense}
        onChange={(e) =>
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
        className="p-2 border border-gray-300 rounded"
      ></input>
      <label className="font-medium">
        👬 {selectedFriend.name}'s Expenses:
      </label>
      <input
        type="text"
        placeholder="R Value"
        disabled
        value={friendExpense}
        className="p-2 border border-gray-300 rounded bg-gray-200"
      ></input>
      <label className="font-medium">💰 Who is paying?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Add</Button>
    </form>
  );
}
