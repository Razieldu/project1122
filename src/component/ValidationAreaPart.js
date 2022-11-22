import { Component } from "react";
import styled from "styled-components";
import { numCheck, validationCheck } from "../store/reducers";
import { connect } from "react-redux";
const ValidationDiv = styled.div`
  text-align: center;
`;

const InputStyled = styled.input`
  text-align: center;
  font-size: 20px;
  height: 50px;
  width: 50px;
`;

class ValidationAreaPart extends Component {
  constructor(props) {
    super(props);
  }
  inputChangeHandler = (event) => {
    this.props.checkNum(event.target.value, this.props.id);
  };

  inputValidationCheck = () => {
    this.props.numValidationCheck(this.props.id);
  };

  render() {
    return (
      <ValidationDiv>
        <h1>{this.props.eachNum}</h1>
        <InputStyled
          ref={this.props.forwardRef}
          value={this.props.inputNum[`num${this.props.id}`]}
          onBlur={this.inputValidationCheck}
          onChange={this.inputChangeHandler}
          maxLength="1"
          type="text"
        />
      </ValidationDiv>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  checkNum: (value, id) => dispatch(numCheck(value, id)),
  numValidationCheck: (id) => dispatch(validationCheck(id)),
});

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidationAreaPart);
