export const numGenerator = () => {
    let list = [];
    for (let i = 1; i < 5; i++) {
      let randomNum = Math.floor(Math.random() * 9);
      list.push(randomNum);
    }
    return list;
  };
  




