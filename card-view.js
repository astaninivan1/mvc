import EventEmitter from "./event-emitter.js";
export default class CardsView extends EventEmitter {
	element = {};
	cardsElement = {}
	unsubscription = [];

	onClick = event => {
		const action = event.target.dataset.event

		if (action === 'delete') {
			const cardId = event.target.closest('[data-id]').dataset.id;
			this.emit('deleteBtnClick', cardId)
		}

		if (action === 'add') {
			this.emit('addBtnClick')
		}
	}

	constructor(cardsModel = []) {
		super();
		this.cardsModel = cardsModel;
		this.render();
		this.initSubscriptions();
	}

	render() {
		const el = document.createElement('div');
    	el.innerHTML = this.template;
    	this.element = el.firstElementChild;
    	this.cardsElement = this.getCardElement(this.element);
    	this.element.addEventListener('click', this.onClick)
	}

	update() {
		this.cardsElement.cards.innerHTML = this.cardsTemplate;
	}

	initSubscriptions() {
		this.unsubscription.push(
			this.cardsModel.subscribe('cardAdded', () => this.update()),
			this.cardsModel.subscribe('cardDeleted', () => this.update())
		)
	}

	getCardElement(element) {
		const elements = element.querySelectorAll('[data-element]');
		return [...elements].reduce((accum, subElement) => {
			accum[subElement.dataset.element] = subElement;
			return accum;
		}, {});
	}

	remove() {
		if (this.element) {
			this.element.remove();
		}
  	}

  	destroy() {
    	this.remove();
    	this.cardsElement = {};
    	this.element = null;
    	this.unsubscription.forEach(x => x());
  	}

	get template () {
		return `<div>
			<div data-element="cards" style="display: flex">
				${this.cardsTemplate}
			</div>
			<button data-event="add">Добавить карточку</button>
		</div>`
	}

	get cardsTemplate () {
		return this.cardsModel.cards.map((x, index) => `
			<div style="height: 160px; width: 100px" data-id="${index}">
				№${index}, ${x.title}
				<button data-event="delete">Удалить</button>
			</div>
		`).join('');
	}
}


