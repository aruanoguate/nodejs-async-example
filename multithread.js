method1 = () => {
    return new Promise((resolve, reject) => {

        console.log("Starting method1");

        setTimeout(() => {
            try {
                console.log("Working method1");
                resolve("Success method1");
            }
            catch (error) {
                reject(error);
            }
        }, 4000)

        console.log("Ending method1");
    });
}

method2 = () => {
    return new Promise((resolve, reject) => {

        console.log("Starting method2");

        setTimeout(() => {
            try {
                console.log("Working method2");
                throw "This is an exception on method 2"
                resolve("Success method2");
            }
            catch (error) {
                reject(error);
            }
        }, 2000);

        console.log("Ending method2");
    });
}

method3 = async () => {
    console.log("Starting method3");

    let promises = []
    promises.push(method1());
    promises.push(method2());

    // allSettled will wait for each promise to complete 
    // instead of stopping on the first failure
    let allResults = await Promise.allSettled(promises);

    allResults.forEach(result => {
        console.log(`status: ${result.status},  value: ${result.value}, reason: ${result.reason}`);
    });
                }); 
    });

    console.log("Ending method3");
}

method3();

