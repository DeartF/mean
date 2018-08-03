/*setTimeout(() => {
	console.log('Hello world! 1')
}, 1000)

console.log('Hello world! 2')*/


const myFunc = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Hello world 1')

			// reject('Error!!')

		}, 3000)
	})
}

const myFunc2 = async () => {
	setTimeout(() => {
		return "Hello world!!!"
	}, 3000)
}

/*let result = myFunc()

console.log(result)*/

/*myFunc()
	.then((result) => {
		console.log(result)
		console.log('Hello world 2')
	})
	.catch((err) => {
		console.log(err)
	})*/

/*myFunc2()
	.then((result) => {
		console.log('Hello world 3')
	})*/

const getResult = async() => {
	let result = await myFunc()
	console.log(result)
	console.log('Hello world 2')
}

getResult()