method1 = async () => {
    return new Promise((resolve, reject) => {

        console.log("Starting method1");

        setTimeout(() => {
            try {
                console.log("Working method1");
                throw "This is an exception on method 1"
                resolve("Success method1");
            }
            catch (error) {
                reject(error);
            }
        }, 4000)

        console.log("Ending method1");
    });
}

method2 = async () => {
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
        }, 3000);

        console.log("Ending method2");
    });
}

method3 = async function () {
    console.log("Starting method3");

    let promiseMethod1 = method1();
    let promiseMethod2 = method2();

    let promises = []
    promises.push(promiseMethod1);
    promises.push(promiseMethod2);

    let megaPromise = Promise.allSettled(promises);
    await megaPromise
        .then(
            (values) => { 
                console.log("values:");
                values.forEach(element => {
                    console.log("status: ", element.status, " ,  value: ", element.value);
                }); 
            })
        .catch(
            (errors) => { 
                console.error("errors:" + errors.join(",")); 
            });

    console.log("Ending method3");
}

method3();

