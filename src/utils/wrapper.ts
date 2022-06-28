export async function wrapper(promise: Promise<any>): Promise<any> {
  return promise
    .then((data: any): any => {return {data, error: null, };})
    .catch((error: any): any => {return {error, data: null, };})
}
