import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import * as Styled from './styles';

function App() {
  const [password, setPassword] = useState('');
  const [steps, setSteps] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showStrengthMsg, setShowStrengthMsg] = useState("none")

  const strongPasswordChecker = (password) => {
    let steps = 0;
    let lower = /[a-z]/;
    let upper = /[A-Z]/;
    let digit = /[0-9]/;

    let missingTypes = [lower, upper, digit].reduce((acc, regex) => acc + !regex.test(password), 0);

    let size = password.length;
    if (size < 6) {
      steps = missingTypes + Math.max(0, 6 - size - missingTypes);
    } else {
      let replace = 0;
      let ones = 0, twos = 0;
      for (let i = 0; i < size;) {
        if (i < size - 2 && password[i] === password[i + 1] && password[i] === password[i + 2]) {
          let length = 2;
          while (i < size && password[i] === password[i - 1]) {
            length++;
            i++;
          }
          replace += Math.floor(length / 3);
          if (length % 3 === 0) ones++;
          else if (length % 3 === 1) twos++;
        } else {
          i++;
        }
      }

      if (size <= 20) {
        steps = Math.max(missingTypes, replace);
      } else {
        let deleteCount = size - 20;

        replace -= Math.min(deleteCount, ones * 1) / 1;
        replace -= Math.min(Math.max(deleteCount - ones, 0), twos * 2) / 2;
        replace -= Math.max(deleteCount - ones - 2 * twos, 0) / 3;

        steps = deleteCount + Math.max(missingTypes, replace);
      }
    }

    return steps;
  }

  const handleChange = (event) => {
    setPassword(event.target.value);
    if(event.target.value=== ""){
      setShowStrengthMsg("none")
      return
    }
    setShowStrengthMsg("")
    
    const result = strongPasswordChecker(event.target.value);
    setSteps(result);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  const passwordColors = { strong: "green", medium: "#FF8400", weak: "red" }

  return (
    <Styled.Container>
      <Styled.Card>
        <Styled.Title>Strong Password Checker</Styled.Title>
        <Styled.InputContainer>
          <div>Enter Password</div>
          <div style={{ display: "flex", width: "100%" }}>
            <Styled.PasswordInput
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange}
            />
            <button onClick={toggleShowPassword}> {/* New button */}
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </button>
          </div>
          <Styled.PasswordStrength>Steps to strong password: {steps}</Styled.PasswordStrength>
          <Styled.PasswordStrengthMessage style={{display:showStrengthMsg}} color={steps >= 2 ? passwordColors["weak"] : steps === 0 ? passwordColors["strong"] : passwordColors["medium"]}>
            {`Your Password is ${steps >= 2 ? "Weak" : steps === 0 ? "Strong" : "Medium"}`}
          </Styled.PasswordStrengthMessage>
        </Styled.InputContainer>
      </Styled.Card>
    </Styled.Container>
  );
}

export default App;
