import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ValidationAreaPart from "./component/ValidationAreaPart";
import { numGenerator } from "./logic/logic";
import { set_validation_num, resetAllValue } from "./actions/actions";


const WrapperDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const VlidationNumDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 10vh;
  // color:yellow;
  font-style: italic;
  font-size: 20px;
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
       ///input未填寫完成
      ///尚未點擊按鈕
      return "grey";
    } else if (!notUse && !clicked) {
        ///input填寫完成
      ///尚未點擊按鈕 
      return "red";
    } else if (!notUse && clicked) {
       ///input填寫完成
      ///已點擊按鈕
      return "blue";
    }

  }};
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonIsValid:this.props.inputNum.num0 !== "" && this.props.inputNum.num1 !== "" &&this.props.inputNum.num2 !== "" && this.props.inputNum.num3 !== "",
      ///四個input是否皆為已經填寫的狀況
      showInfo: false,
      //錯誤提示是否出現
      buttonClicked: false,
    };
  }
  componentDidMount() {
    this.props.setnum(numGenerator());
  }
  componentDidUpdate(preProps, prevState) {
    if (preProps.inputNum !== this.props.inputNum) {
      this.setState((prev) => {
        return {
          ...prev,
          buttonIsValid:
            this.props.inputNum.num0 !== "" &&
            this.props.inputNum.num1 !== "" &&
            this.props.inputNum.num2 !== "" &&
            this.props.inputNum.num3 !== "",
        };
      });
    }
    if(prevState!==this.state){
    }
    if (preProps.validationNum !== this.props.validationNum) {
    }
  }
  formSubmitHandler = (event) => {
    event.preventDefault();
    if (!this.state.buttonIsValid) {
      ///四個input沒有填寫完成
      return;
    }
    this.setState((prev) => {
      return {
        ...prev,
        buttonClicked: true,
      };
    });
    if (this.props.inputNum.numCheck0 &&this.props.inputNum.numCheck1 &&this.props.inputNum.numCheck2 &&this.props.inputNum.numCheck3) {   
      ////輸入的四個input符合驗證碼////
      console.log("success");
      setTimeout(()=>{
        this.setState((prev) => {
          return {
            ...prev,
            showInfo: false,
            buttonClicked:false,
          };
        });
        this.props.resetAll();
      },1000)
 
    } else {
       ////輸入的其中一個input不符合驗證碼////  
      this.setState((prev) => {
        return {
          ...prev,
          showInfo: true,
        };
      });

      setTimeout(() => {
      ////更新state  
        this.setState((prev) => {
          return {
            ...prev,
            showInfo: false,
            buttonClicked:false
          };
        });
        this.props.resetAll();
        ////重置redux state
        this.NumGenerateHandler()
      }, 1000);
    }
  };
  NumGenerateHandler = () => {
    this.props.setnum(numGenerator());
    this.props.resetAll();
  };
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>免費試玩</h1>
        <form onSubmit={this.formSubmitHandler}>
          <VlidationNumDiv>
            {this.props.validationNum.map((every, index) => (
              <h1 key={index}>{every}</h1>
            ))}
          </VlidationNumDiv>
          <WrapperDiv>
            {this.props.validationNum.map((each, index) => (
              <ValidationAreaPart
                forwardRef={this.refData}
                key={index}
                id={index}
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
                fontSize: "20px",
              }}
            >
              這裡
            </span>
            更新
          </p>
          {this.state.buttonIsValid && this.state.showInfo && (
            <p style={{ color: "red" }}>驗證碼不正確</p>
          )}
          <ButtonStyled
            notUse={!this.state.buttonIsValid}
            disabled={!this.state.buttonIsValid}
            buttonClicked={this.state.buttonClicked}
          >
            開始
          </ButtonStyled>
          <p>商務聯繫:s123@ea.com</p>
        </form>
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
        {/* {`輸入框1失去焦點${this.props.inputNum.numClicked0}`}
        <br></br>
        {`輸入框2失去焦點${this.props.inputNum.numClicked1}`}
        <br></br>
        {`輸入框3失去焦點${this.props.inputNum.numClicked2}`}
        <br></br>
        {`輸入框4失去焦點${this.props.inputNum.numClicked3}`} */}
        <br></br>
        {`輸入皆不為空字串${this.state.buttonIsValid}`}
        <br></br>
        {`驗證碼錯誤提示出現${this.state.showInfo}`}
        <br></br>
        {`按鈕是否已經點擊${this.state.buttonClicked}`}
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
