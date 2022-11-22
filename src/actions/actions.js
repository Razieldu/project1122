export const set_validation_num = (value) => {
    return {
      type: "VALIDATION_NUM",
      valueNum: value,
    };
  };
  
  export const numCheck = (value, id) => {
    return {
      type: "NUM_CHECK",
      value: value,
      id: id,
    };
  };
  
  export const validationCheck = (id) => {
    return {
      type: "VALiDATION_CHECK",
      id: id,
    };
  };
  
  export const resetAllValue = ()=>{
   return{
    type:"RESET"
   }
  }