export default function promiseChain(promiseArray) {
  return new Promise((resolve, reject) => {
    let currentIndex = 0

    function next(passedVal) {
      currentIndex++;
      if (currentIndex >= promiseArray.length) {
        resolve(passedVal);
      } else {
        promiseArray[currentIndex]().then((passedVal) => {
          next(passedVal);
        });
      }
    }
    promiseArray[currentIndex]().then((passedVal) => {
      next(passedVal);
    });
  });
}
