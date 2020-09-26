
/**
 * 
 * @param timeout number
 * time for wait on the next job resolve
 */
export default async function* wait(timeout: number) {\
    return await new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
};
