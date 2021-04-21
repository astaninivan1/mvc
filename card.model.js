import EventEmitter from "./event-emitter.js";
export default class CardsModel extends EventEmitter {
	constructor(cards) {
		super();
		this.cards = cards;
	}

	addCard(card) {
		this.cards.push(card);
		this.emit('cardAdded', card);
	}

	removeCard(idx) {
		const deletedCard = this.cards.splice(idx, 1)[0]
		this.emit('cardDeleted', deletedCard);
	}
}
