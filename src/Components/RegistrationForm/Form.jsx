import React, { useEffect, useReducer } from "react";
import styles from "./form.module.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  gender: "",
  class: "",
  rollNumber: "",
  password: "",
  confirmPassword: "",
};
const initialErrorState = {
  firstError: false,
  lastError: false,
  mobileError: false,
  emailError: false,
  passwordError: false,
  confirmError: false,
};

const reducer1 = (state, action) => {
  switch (action.type) {
    case "firstName":
      const pattern = /^[A-Za-z' -]+$/;
      if (action.payload !== "" && !pattern.test(action.payload)) {
        state.firstError = true;
      } else {
        state.firstError = false;
      }
      return { ...state, firstError: state.firstError };
    case "lastName":
      const pattern1 = /^[A-Za-z' -]+$/;
      if (action.payload !== "" && !pattern1.test(action.payload)) {
        state.lastError = true;
      } else {
        state.lastError = false;
      }
      return { ...state, lastError: state.lastError };
    case "email":
      if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(action.payload) &&
        action.payload !== ""
      ) {
        state.emailError = true;
      } else {
        state.emailError = false;
      }
      return { ...state, emailError: state.emailError };
    case "mobile":
      const mobilepattern = /^[6-9]\d{9}$/;
      if (action.payload !== "" && !mobilepattern.test(action.payload)) {
        state.mobileError = true;
      } else {
        state.mobileError = false;
      }
      return { ...state, mobileError: state.mobileError };
    case "password":
      if (
        action.payload !== "" &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          action.payload
        )
      ) {
        state.passwordError = true;
      } else {
        state.passwordError = false;
      }
      return { ...state, passwordError: state.passwordError };
    case "confirm":
      if (action.password === action.payload && action.payload !== "") {
        state.confirmError = false;
      } else if (action.payload === "") {
        state.confirmError = false;
      } else {
        state.confirmError = true;
      }
      return { ...state, confirmError: state.confirmError };
    default:
      return state;
  }
};
const reducer = (state, action) => {
  switch (action.type) {
    case "firstName":
      return {
        ...state,
        firstName: action.payload,
      };
    case "lastname":
      return {
        ...state,
        lastName: action.payload,
      };
    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "Mobile":
      return {
        ...state,
        mobile: action.payload,
      };
    case "rollNumber":
      return { ...state, rollNumber: action.payload };
    case "gender":
      return { ...state, gender: action.payload };
    case "class":
      return { ...state, class: action.payload };
    case "password":
      return {
        ...state,
        password: action.payload,
      };
    case "confirmPassword":
      return {
        ...state,
        confirmPassword: action.payload,
      };
    case "submitted":
      return initialState;
    default:
      return state;
  }
};

export const StudentForm = () => {
  const [data, dispatch] = useReducer(reducer, initialState);
  const [error, errorDispatch] = useReducer(reducer1, initialErrorState);
  const StudentArray = [];
  // const studentData = JSON.stringify(StudentArray);
  // localStorage.setItem("StudentArray", studentData);
  // console.log(JSON.parse(localStorage.getItem("StudentArray")));

  console.log(error);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      error.firstError === false &&
      error.lastError === false &&
      error.emailError === false &&
      error.mobileError === false &&
      error.passwordError === false &&
      error.confirmError === false
    ) {
      let getdata = localStorage.getItem("StudentArray");
      console.log(getdata);
      //setting data to local storage
      let localdata = getdata ? JSON.parse(getdata) : [];
      localdata.push(data);
      const updatedData = JSON.stringify(localdata);
      let setlocal = localStorage.setItem("StudentArray", updatedData);
      console.log(JSON.parse(localStorage.getItem("StudentArray")));
      // console.log(setlocal);
      dispatch({ type: "submitted" });
    } else {
      if (error.firstError === true) {
        dispatch({ type: "firstName", payload: data.firstName });
        // handleSubmit(e);
      } else if (error.lastError === true) {
        dispatch({ type: "lastName", payload: data.lastName });
      } else if (error.emailError === true) {
        dispatch({ type: "email", payload: data.email });
      } else if (error.mobileError === true) {
        dispatch({ type: "mobile", payload: data.mobile });
      } else if (error.passwordError === true) {
        dispatch({ type: "password", payload: data.password });
      } else if (error.confirmError === true) {
        dispatch({ type: "confirmPassword", payload: data.confirmPassword });
      }
    }
  };

  return (
    <div id={styles.form_container}>
      <h1>Registration Form</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.input_div}>
          <label>Firstname</label>
          <br />
          <input
            type="text"
            name="firstname"
            value={data.firstName}
            onBlur={() =>
              errorDispatch({
                type: "firstName",
                payload: data.firstName,
              })
            }
            onChange={(e) =>
              dispatch({ type: "firstName", payload: e.target.value })
            }
            required
          ></input>
          {error.firstError && (
            <p style={{ color: "red" }}>Please enter valid firstName</p>
          )}
        </div>
        <div className={styles.input_div}>
          <label htmlFor="lastname">Lastname</label>
          <br />
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={data.lastName}
            onBlur={() =>
              errorDispatch({ type: "lastName", payload: data.lastName })
            }
            onChange={(e) =>
              dispatch({ type: "lastname", payload: e.target.value })
            }
            required
          ></input>
          {error.lastError && (
            <p style={{ color: "red" }}>Please enter valid LastName</p>
          )}
        </div>
        <div className={styles.input_div}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={data.email}
            onBlur={() => errorDispatch({ type: "email", payload: data.email })}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            required
          ></input>
          {error.emailError && <p style={{ color: "red" }}>Invalid EmailId</p>}
        </div>
        <div className={styles.input_div}>
          <label>Mobile</label>
          <br />
          <input
            type="tel"
            max={10}
            name="mobile"
            value={data.mobile}
            onBlur={() =>
              errorDispatch({ type: "mobile", payload: data.mobile })
            }
            onChange={(e) =>
              dispatch({ type: "Mobile", payload: e.target.value })
            }
            required
          ></input>
          {error.mobileError && (
            <p style={{ color: "red" }}>
              Mobile numbers should start with 6,7,8,9 , max of 10 digits
            </p>
          )}
        </div>
        <div className={styles.input_div}>
          <label>Rollnumber</label>
          <br />
          <input
            type="text"
            name="rollNumber"
            value={data.rollNumber}
            onChange={(e) =>
              dispatch({ type: "rollNumber", payload: e.target.value })
            }
            required
          ></input>
        </div>
        <div className={styles.input_div}>
          <label>Gender</label>
          <br />
          <input
            list="gender"
            type="text"
            name="gender"
            value={data.gender}
            onChange={(e) =>
              dispatch({ type: "gender", payload: e.target.value })
            }
            required
          ></input>
          <datalist id="gender">
            <option value="Female" />
            <option value="Male" />
            <option value="Third Gender" />
          </datalist>
        </div>
        <div className={styles.input_div}>
          <label>Class</label>
          <br />
          <input
            type="text"
            name="class"
            value={data.class}
            onChange={(e) =>
              dispatch({ type: "class", payload: e.target.value })
            }
            required
          ></input>
        </div>
        <div className={styles.input_div}>
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={data.password}
            onBlur={() =>
              errorDispatch({ type: "password", payload: data.password })
            }
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
            required
          ></input>
          {error.passwordError && (
            <p style={{ color: "red" }}>
              Password should contain at least one Capital alphabet, one special
              character , at least one number and a total of 8 characters length
            </p>
          )}
        </div>
        <div className={styles.input_div}>
          <label>Confirm Password</label>
          <br></br>
          <input
            type="password"
            name="confirm password"
            value={data.confirmPassword}
            onBlur={() =>
              errorDispatch({
                type: "confirm",
                payload: data.confirmPassword,
                password: data.password,
              })
            }
            onChange={(e) =>
              dispatch({ type: "confirmPassword", payload: e.target.value })
            }
            required
          ></input>
          {error.confirmError && (
            <p style={{ color: "red" }}>
              Password and confirm password must be same
            </p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
