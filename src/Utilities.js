class Utilities {
  intersection() {
    let result = [];
    let lists;

    if(arguments.length === 1) {
      lists = arguments[0];
    } else {
      lists = arguments;
    }

    for(let i = 0; i < lists.length; i++) {
      let currentList = lists[i];
      for(let y = 0; y < currentList.length; y++) {
        let currentValue = currentList[y];
        if(result.indexOf(currentValue) === -1) {
          let existsInAll = true;
          for(let x = 0; x < lists.length; x++) {
            if(lists[x].indexOf(currentValue) === -1) {
              existsInAll = false;
              break;
            }
          }
          if(existsInAll) {
            result.push(currentValue);
          }
        }
      }
    }
    return result;
  }
}

export default Utilities;
