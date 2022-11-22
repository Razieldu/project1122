const initialState = {
  inputNum: {
    num0: "",
    numCheck0: false,
    numClicked0:false,
    num1: "",
    numCheck1: false,
    numClicked1:false,
    num2: "",
    numCheck2: false,
    numClicked2:false,
    num3: "",
    numCheck3: false,
    numClicked3:false,
  },
  validationNum: [],
};

export const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NUM_CHECK":
      ///紀錄輸入欄位的值
      let currentInputNum = { ...state.inputNum };
      let renewInputNum = {
        ...currentInputNum,
        [`num${action.id}`]: action.value,
      };
      return {
        ...state,
        inputNum: renewInputNum,
      };
    case "VALiDATION_CHECK":
      ///確認該input輸入數字與驗證碼是否正確以及更新以點擊狀態為true
      let currentNum = { ...state.inputNum };
      
      if (Number(state.validationNum[action.id]) === Number(state.inputNum[`num${action.id}`])&&state.inputNum[`num${action.id}`]!=="") {
        let updatedState = {
          ...currentNum,
          [`numCheck${action.id}`]: true,
        };
        return {
          ...state,
          inputNum:updatedState,
          [`numClicked${action.id}`]:true
        }
      }else{
        let updatedState = {
          ...currentNum,
          [`numCheck${action.id}`]: false,
          [`numClicked${action.id}`]:true
        };
        return {
          ...state,
          inputNum:updatedState,
          [`numClicked${action.id}`]:true
        }
      }
    case "VALIDATION_NUM":
      ///設置隨機產生數字陣列為state
      return {
        ...state,
        validationNum: action.valueNum,
      };
    case "RESET":
      ///重置
      return{
        ...state,
        inputNum: {
          num0: "",
          numCheck0: false,
          num1: "",
          numCheck1: false,
          num2: "",
          numCheck2: false,
          num3: "",
          numCheck3: false,
        },
        // validationNum: [],
      }  
    default:
      return state;
  }
};
