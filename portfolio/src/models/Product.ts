export class Product {
	constructor(
		public id: number,
		public title: string,
		public description: string,
		public category: string,
		public image: string,
		public url: string,
		public active: boolean,
	) {}
}

export class Rating {
	constructor (
		public rate: number,
		public count: number
	) {}
	
}