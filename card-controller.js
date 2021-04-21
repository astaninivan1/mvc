export default class CardsController {
	unsubscription = [];
	constructor(model, view) {
		this._model = model;
		this._view = view;
		this.initSubscriptions();
	}

	addCard() {
		const newCard = prompt('Новая запись', '');
		if (newCard) {
			this._model.addCard({title: newCard});
		}
	}

	deleteCard(idx) {
		this._model.removeCard(idx);
	}

	initSubscriptions() {
		this.unsubscription.push(
			this._view.subscribe('deleteBtnClick', idx => this.deleteCard(idx)),
			this._view.subscribe('addBtnClick', () => this.addCard())
		)
	}

	unsubscribe() {
		this.unsubscription.forEach(x => x());
	}
}
