import React, { Component } from "react";
import styled from "styled-components";
import ValidationAreaPart from "./component/ValidationAreaPart";
import { set_validation_num, resetAllValue } from "./store/reducers";
import { connect } from "react-redux";

const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vh;
`;

const ButtonStyled = styled.button`
  border-radius: 50%;
  border: 5px solid silver;
  width: 100px;
  height: 100px;
  font-size: 20px;
  color: white;
  font-weight: 700;
  background-color: ${(props) => {
    let notUse = props.notUse;
    let clicked = props.buttonClicked;
    if (notUse && !clicked) {
      return "grey";
    } else if (!notUse && !clicked) {
      return "red";
    } else if (notUse && clicked) {
      return "blue";
    }
  }};
`;

const NumGenerator = () => {
  let list = [];
  for (let i = 1; i < 5; i++) {
    let randomNum = Math.floor(Math.random() * 9);
    list.push(randomNum);
  }
  return list;
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formIsValid:
        this.props.inputNum.numCheck0 &&
        this.props.inputNum.numCheck1 &&
        this.props.inputNum.numCheck2 &&
        this.props.inputNum.numCheck3,
      buttonClicked: false,
    };
    this.refData = React.createRef(null);
  }
  componentDidMount() {
    this.props.setnum(NumGenerator());
  }
  componentDidUpdate(preProps, prevState) {
    if (preProps.inputNum !== this.props.inputNum) {
      this.setState((prev) => {
        return {
          ...prev,
          formIsValid:
            this.props.inputNum.numCheck0 &&
            this.props.inputNum.numCheck1 &&
            this.props.inputNum.numCheck2 &&
            this.props.inputNum.numCheck3,
        };
      });
    }
    if (prevState.formIsValid !== this.state.formIsValid) {
    }
    if (preProps.validationNum !== this.props.validationNum) {
    }
  }
  formSubmitHandler = (event) => {
    event.preventDefault();
    if (!this.state.formIsValid) {
      return;
    }
    if (
      this.props.inputNum.numCheck0 &&
      this.props.inputNum.numCheck1 &&
      this.props.inputNum.numCheck2 &&
      this.props.inputNum.numCheck3
    ) {
      console.log(this.refData);
      
    }
    console.log(
      this.props.inputNum.num0,
      this.props.inputNum.num1,
      this.props.inputNum.num2,
      this.props.inputNum.num3
    );
    this.setState((prev) => {
      return {
        ...prev,
        buttonClicked: true,
      };
    });
    this.props.resetAll();
  };
  NumGenerateHandler = () => {
    this.props.setnum(NumGenerator());
  };
  render() {
    // console.log(this.refData);
    let one = !this.props.inputNum.numCheck0 && this.props.inputNum.numClicked0;
    let two = !this.props.inputNum.numCheck1 && this.props.inputNum.numClicked1;
    let three = !this.props.inputNum.numCheck2 && this.props.inputNum.numClicked2;
    let four =!this.props.inputNum.numCheck3 && this.props.inputNum.numClicked3;

    const show = one ? (
      <p style={{ color: "red" }}>驗證碼不正確</p>
    ) : two ? (
      <p style={{ color: "red" }}>驗證碼不正確</p>
    ) : three ? (
      <p style={{ color: "red" }}>驗證碼不正確</p>
    ) : four ? (
      <p style={{ color: "red" }}>驗證碼不正確</p>
    ) : null;

    return (
      <div style={{ textAlign: "center" }}>
        <form onSubmit={this.formSubmitHandler}>
          <WrapperDiv>
            {this.props.validationNum.map((each, index) => (
              <ValidationAreaPart
                forwardRef={this.refData}
                key={index}
                id={index}
                eachNum={each}
              />
            ))}
          </WrapperDiv>
          <p>
          如果驗證碼不清晰,請點擊
          <span
            onClick={this.NumGenerateHandler}
            style={{
              cursor: "pointer",
              color: "blue",
              fontSize:"20px",
              textDecoration: "underline",
            }}
          >
            這裡
          </span>
          更新
        </p>
          <ButtonStyled
            notUse={!this.state.formIsValid}
            disabled={!this.state.formIsValid}
            buttonClicked={this.state.buttonClicked}
          >
            開始
          </ButtonStyled>
          <p>商務聯繫:s123@ea.com</p>
        </form>
        
        {show}

        <h1>{this.props.validationNum[0]}</h1>
        <h1>{this.props.validationNum[1]}</h1>
        <h1>{this.props.validationNum[2]}</h1>
        <h1>{this.props.validationNum[3]}</h1>
        {`輸入值1:${this.props.inputNum.num0}`}
        <br></br>
        {`輸入值2:${this.props.inputNum.num1}`}
        <br></br>
        {`輸入值3:${this.props.inputNum.num2}`}
        <br></br>
        {`輸入值4:${this.props.inputNum.num3}`}
        <br></br>
        {`輸入值1與驗證碼符合${this.props.inputNum.numCheck0}`}
        <br></br>
        {`輸入值2與驗證碼符合${this.props.inputNum.numCheck1}`}
        <br></br>
        {`輸入值3與驗證碼符合${this.props.inputNum.numCheck2}`}
        <br></br>
        {`輸入值4與驗證碼符合${this.props.inputNum.numCheck3}`}
        <br></br>
        {`所有輸入與驗證碼符合${this.state.formIsValid}`}
        <br></br>
        {`輸入框1失去焦點${this.props.inputNum.numClicked0}`}
        <br></br>
        {`輸入框2失去焦點${this.props.inputNum.numClicked1}`}
        <br></br>
        {`輸入框3失去焦點${this.props.inputNum.numClicked2}`}
        <br></br>
        {`輸入框4失去焦點${this.props.inputNum.numClicked3}`}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setnum: (value) => dispatch(set_validation_num(value)),
  resetAll: () => dispatch(resetAllValue()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
