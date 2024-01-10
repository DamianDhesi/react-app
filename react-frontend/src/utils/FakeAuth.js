export const fakeAuth = ({username, password}) => new Promise((resolve, reject) => {
                            if (username === "bj" && password === "pass424") {
                                setTimeout(() => resolve('2342f2f1d131rf12'), 250);
                            } else {
                                setTimeout(() => resolve(null), 250);
                            }
                        });
