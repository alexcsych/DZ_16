import React, { Component } from "react";
import classNames from "classnames";
import { FaEdit } from "react-icons/fa";
import styles from "./SignUpForm.module.css";

const INITIAL_VALUES = {
  fullName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  checkbox: false,
  isFullNameValid: false,
  isEmailValid: false,
  isPasswordValid: false,
  isPasswordConfirmationValid: false,
  disabledSumbit: true,
};

const LOGIN_FORM_REX_EXP = {
  fullName:
    /^[A-Z][a-z]{2,19}(-[A-Z][a-z]{2,19})?\s[A-Z][a-z]{2,19}(-[A-Z][a-z]{2,19})?$/,
  email: /^.+@.+$/,
  password: /^(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*\d.*)(?=.*[!@#$%^&*.].*).{8,20}$/,
};

class SingUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: INITIAL_VALUES.fullName,
      isFullNameValid: false,
      email: INITIAL_VALUES.email,
      isEmailValid: false,
      password: INITIAL_VALUES.password,
      isPasswordValid: false,
      passwordConfirmation: INITIAL_VALUES.passwordConfirmation,
      isPasswordConfirmationValid: false,
      checkbox: INITIAL_VALUES.checkbox,
      disabledSumbit: true,
    };
  }

  handleFullNameChange = ({ target: { value } }) => {
    this.setState({
      fullName: value,
      isFullNameValid: LOGIN_FORM_REX_EXP.fullName.test(value),
    });
    this.disabledSumbit();
  };

  handleEmailChange = ({ target: { value } }) => {
    this.setState({
      email: value,
      isEmailValid: LOGIN_FORM_REX_EXP.email.test(value),
    });
    this.disabledSumbit();
  };

  handlePasswordChange = ({ target: { value } }) => {
    this.setState({
      password: value,
      passwordConfirmation: INITIAL_VALUES.passwordConfirmation,
      isPasswordConfirmationValid: false,
      isPasswordValid: LOGIN_FORM_REX_EXP.password.test(value),
    });
    this.disabledSumbit();
  };

  handlePasswordConfirmationChange = ({ target: { value } }) => {
    this.setState({
      passwordConfirmation: value,
      isPasswordConfirmationValid:
        this.state.password === value &&
        LOGIN_FORM_REX_EXP.password.test(value),
    });
    this.disabledSumbit();
  };

  handleCheckboxChange = ({ target: { checked } }) => {
    this.setState({
      checkbox: checked ? true : false,
    });
    this.disabledSumbit();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(INITIAL_VALUES);
  };

  disabledSumbit = () => {
    this.setState((state) => {
      return {
        disabledSumbit:
          state.isFullNameValid &&
          state.isEmailValid &&
          state.isPasswordValid &&
          state.isPasswordConfirmationValid &&
          state.checkbox
            ? false
            : true,
      };
    });
  };

  render() {
    const {
      fullName,
      email,
      password,
      passwordConfirmation,
      checkbox,
      isFullNameValid,
      isEmailValid,
      isPasswordValid,
      isPasswordConfirmationValid,
      disabledSumbit,
    } = this.state;

    const fullNameClassName = classNames(styles.input, {
      [styles.inputValid]: isFullNameValid,
      [styles.inputInvalid]: !isFullNameValid,
    });

    const emailClassName = classNames(styles.input, {
      [styles.inputValid]: isEmailValid,
      [styles.inputInvalid]: !isEmailValid,
    });

    const passwordClassName = classNames(styles.input, {
      [styles.inputValid]: isPasswordValid,
      [styles.inputInvalid]: !isPasswordValid,
    });

    const passwordConfirmationClassName = classNames(styles.input, {
      [styles.inputValid]: isPasswordConfirmationValid,
      [styles.inputInvalid]: !isPasswordConfirmationValid,
    });

    return (
      <div className={styles.formContainer}>
        <div className={styles.editIcon}>
          <FaEdit />
        </div>
        <h1 className={styles.formHeader}>Create Your Account</h1>
        <form className={styles.loginForm} onSubmit={this.handleSubmit}>
          <label className={styles.label}>
            <span className={styles.inputName}>Full Name</span>
            <input
              className={fullNameClassName}
              type="text"
              name="fullName"
              placeholder="FirstName LastName"
              value={fullName}
              onChange={this.handleFullNameChange}
              autoFocus
            />
          </label>
          <label className={styles.label}>
            <span className={styles.inputName}>Email</span>
            <input
              className={emailClassName}
              type="email"
              name="email"
              placeholder="your@mail"
              value={email}
              onChange={this.handleEmailChange}
            />
          </label>
          <label className={styles.label}>
            <span className={styles.inputName}>Password</span>
            <input
              className={passwordClassName}
              type="password" //text
              name="password"
              value={password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <label className={styles.label}>
            <span className={styles.inputName}>Password Confirmation</span>
            <input
              className={passwordConfirmationClassName}
              type="password" //text
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={this.handlePasswordConfirmationChange}
            />
          </label>
          <label className={styles.checkbox}>
            <input
              name="checkbox"
              type="checkbox"
              checked={checkbox}
              onChange={this.handleCheckboxChange}
            />
            <span>I Agree All Statements In Terms Of Service</span>
          </label>
          <button
            type="submit"
            disabled={disabledSumbit}
            className={styles.submit}
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

export default SingUpForm;
