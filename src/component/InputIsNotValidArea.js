import { Component } from "react";
import { connect } from "react-redux";

class InputIsNotValidArea extends Component {
  constructor() {
    super();
  }
  render() {
    let one = !this.props.inputNum.numCheck0 && this.props.inputNum.numClicked0;
    let two = !this.props.inputNum.numCheck1 && this.props.inputNum.numClicked1;
    let three = !this.props.inputNum.numCheck2 && this.props.inputNum.numClicked2;
    let four = !this.props.inputNum.numCheck3 && this.props.inputNum.numClicked3;
    return one ? (
      <p style={{ color: "red" }}>驗證碼不正確</p>
    ) : two ? (
      <p style={{ color: "red" }}>驗證碼不正確</p>
    ) : three ? (
      <p style={{ color: "red" }}>驗證碼不正確</p>
    ) : four ? (
      <p style={{ color: "red" }}>驗證碼不正確</p>
    ) : null;
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps, null)(InputIsNotValidArea);
