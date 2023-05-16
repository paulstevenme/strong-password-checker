import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background-color: #146C94;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 500px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
`;

export const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  color:#146C94;
 
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
   margin-top: 20px;
`;

export const PasswordInput = styled.input`
  width: 100%;
  height: 30px;
  font-size: 18px;
`;

export const PasswordStrength = styled.p``;

export const PasswordStrengthMessage = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  color: ${props => props.color};
`;