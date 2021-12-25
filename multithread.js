delayedMethodThatSucceds = () => {
    return new Promise((resolve, reject) => {

        console.log("Starting delayedMethodThatSucceds");

        setTimeout(() => {
            try {
                console.log("Working delayedMethodThatSucceds");
                resolve("Success delayedMethodThatSucceds");
            }
            catch (error) {
                reject(error);
            }
        }, 4000)

        console.log("Ending delayedMethodThatSucceds");
    });
}

delayedMethodThatFails = () => {
    return new Promise((resolve, reject) => {

        console.log("Starting delayedMethodThatFails");

        setTimeout(() => {
            try {
                console.log("Working delayedMethodThatFails");
                throw "This is an exception on method 2"
                resolve("Success delayedMethodThatFails");
            }
            catch (error) {
                reject(error);
            }
        }, 2000);

        console.log("Ending delayedMethodThatFails");
    });
}

asyncMethodHandlingMultiplePromises = async () => {
    console.log("Starting asyncMethodHandlingMultiplePromises");

    let promises = []
    promises.push(delayedMethodThatSucceds());
    promises.push(delayedMethodThatFails());

    // allSettled will wait for each promise to complete 
    // instead of stopping on the first failure
    let allResults = await Promise.allSettled(promises);

    allResults.forEach(result => {
        console.log(`status: ${result.status},  value: ${result.value}, reason: ${result.reason}`);
    });

    console.log("Ending asyncMethodHandlingMultiplePromises");
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

// asyncMethodHandlingMultiplePromises();
methodHandlingOnePromiseOldFashionWay();
// methodHandlingOnePromiseNewWay();

