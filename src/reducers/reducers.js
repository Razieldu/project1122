const initialState = {
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
      ///確認該input輸入數字與驗證碼是否正確
      let currentNum = { ...state.inputNum };
      
      if (Number(state.validationNum[action.id]) === Number(state.inputNum[`num${action.id}`])&&state.inputNum[`num${action.id}`]!=="") {
        //確認輸入的值是否與驗證碼符合,且該值不可為空字串
        let updatedState = {
          ...currentNum,
          [`numCheck${action.id}`]: true,
        };
        return {
          ...state,
          inputNum:updatedState,
        }
      }else{
        let updatedState = {
          ...currentNum,
          [`numCheck${action.id}`]: false,
        };
        return {
          ...state,
          inputNum:updatedState,
        }
      }
    case "VALIDATION_NUM":
      ///設置隨機產生數字陣列並更新為state
      return {
        ...state,
        validationNum: action.valueNum,
      };
    case "RESET":
      ///重置state
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

