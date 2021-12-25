delayedMethodThatSucceds = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                console.log("Working delayedMethodThatSucceds");
                resolve("Success delayedMethodThatSucceds");
            }
            catch (error) {
                reject(error);
            }
        }, 4000)
    });
}

delayedMethodThatFails = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                console.log("Working delayedMethodThatFails");
                throw "This is an exception on delayedMethodThatFails"
                resolve("Success delayedMethodThatFails");
            }
            catch (error) {
                reject(error);
            }
        }, 2000);
    });
}

methodHandlingOnePromiseOldFashionWay = () => {
    console.log("Starting methodHandlingOnePromiseOldFashionWay");

    let promise2 = delayedMethodThatFails();
    promise2
        .then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });

    console.log("Ending methodHandlingOnePromiseOldFashionWay");
}

methodHandlingOnePromiseNewWay = async () => {
    console.log("Starting methodHandlingOnePromiseNewWay");

    let promise2 = delayedMethodThatFails();

    try {
        let data = await promise2;
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }

    console.log("Ending methodHandlingOnePromiseNewWay");
}

methodHandlingMultiplePromises = async () => {
    console.log("Starting methodHandlingMultiplePromises");

    let promises = []
    promises.push(delayedMethodThatSucceds());
    promises.push(delayedMethodThatFails());

    // allSettled will wait for each promise to complete 
    // instead of stopping on the first failure
    let allResults = await Promise.allSettled(promises);

    allResults.forEach(result => {
        console.log(`status: ${result.status},  value: ${result.value}, reason: ${result.reason}`);
    });

    console.log("Ending methodHandlingMultiplePromises");
}


// methodHandlingOnePromiseOldFashionWay();
// methodHandlingOnePromiseNewWay();
methodHandlingMultiplePromises();

