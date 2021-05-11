import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModule";

import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredValues, setEneteredValues] = useState({
    userName: "",
    userAge: "",
  });

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (
      enteredValues.userName.trim().length === 0 ||
      enteredValues.userAge.trim().length === 0
    ) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (nont-empty values)",
      });
      return;
    }

    if (+enteredValues.userAge < 1) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid age (> 0)",
      });

      return;
    }
    setEneteredValues({ userName: "", userAge: "" });
    props.onAddUser(enteredValues);
  };

  const userInputChangeHandler = (e) => {
    const name = e.target.name;
    setEneteredValues({
      ...enteredValues,
      [name]: e.target.value,
      id: Math.random().toString(),
    });
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            name="userName"
            id="username"
            type="text"
            value={enteredValues.userName}
            onChange={userInputChangeHandler}
          />

          <label htmlFor="age">Age (Years)</label>
          <input
            name="userAge"
            id="age"
            type="number"
            value={enteredValues.userAge}
            onChange={userInputChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
