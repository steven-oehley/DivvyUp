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
    <>
      <h1>DivvyUp!</h1>
      <div className="app">
        <div className="sidebar">
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
          <FormSpliBill
            selectedFriend={selectedFriend}
            onSpliBill={handleSplitBill}
          />
        )}
      </div>
    </>
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
  // receieve friend obj as prop from parent component - friends list
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {/* one paragraph only based on condition */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} R{Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you R{friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      {/* only one p  */}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick, disabled }) {
  /* When onClick is not provided, it defaults to undefined. 
  The button element in HTML supports having onClick as undefined, 
  which means nothing will happen when the button is clicked. */
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
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
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👬 Friend:</label>
      <input
        type="text"
        placeholder="Friend Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🖼️ Image URL:</label>
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button disabled={!name || !image}>Add</Button>
    </form>
  );
}

function FormSpliBill({ selectedFriend, onSpliBill }) {
  const [bill, setBill] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const friendExpense = bill ? bill - myExpense : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !myExpense) return;

    onSpliBill(whoIsPaying === "user" ? friendExpense : -myExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💳 Bill Value:</label>
      <input
        type="text"
        placeholder="R Value"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
      <label>🙋‍♂️ Your expense:</label>
      <input
        type="text"
        placeholder="R Value"
        value={myExpense}
        onChange={(e) =>
          setMyExpense(
            Number(e.target.value) > bill ? myExpense : Number(e.target.value)
          )
        }
      ></input>
      <label>👬 {selectedFriend.name}'s Expenses:</label>
      <input
        type="text"
        placeholder="R Value"
        disabled
        value={friendExpense}
      ></input>
      <label>💰 Who is paying?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Add</Button>
    </form>
  );
}
