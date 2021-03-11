import React from 'react'
import {sortByItemCount, sortByDate, getSortFunction, sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	it('orders are null', () => {
		const result = sortByItemCount(null, null);
		expect(result).toEqual(0);
	});

	it('orders are not objects', () => {
		const result = sortByItemCount(4, 5);
		expect(result).toEqual(0);
	});

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('first order count greater the second', () => {
		const order1 = {
			items: ['1', '2', '3']
		}

		const order2 = {
			items: ['1']
		}

		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(1);
	});

	it('first order count less the second', () => {
		const order1 = {
			items: ['1']
		}

		const order2 = {
			items: ['1', '2', '3']
		}

		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(-1);
	});
});

describe('sortByDate function', () => {
	it('orders are null', () => {
		const result = sortByDate(null, null);
		expect(result).toEqual(0);
	});

	it('orders are not objects', () => {
		const result = sortByDate(4, 5);
		expect(result).toEqual(0);
	});

	it('dates are null', () => {
		const order1 = {
			date: null
		}

		const order2 = {
			date: null
		}

		const result = sortByDate(order1, order2);
		expect(result).toEqual(0);
	});

	it('dates are equal', () => {
		const order1 = {
			date: 1
		}

		const order2 = {
			date: 1
		}

		const result = sortByDate(order1, order2);
		expect(result).toEqual(0);
	});

	it('order1 date is greater than order2 date', () => {
		const order1 = {
			date: 2
		}

		const order2 = {
			date: 1
		}

		const result = sortByDate(order1, order2);
		expect(result).toEqual(-1);
	});

	it('order2 date is greater than order1 date', () => {
		const order1 = {
			date: 1
		}

		const order2 = {
			date: 2
		}

		const result = sortByDate(order1, order2);
		expect(result).toEqual(1);
	});
});

describe('getSortFunction function', () => {
	it('no type', () => {
		const result = getSortFunction(null);
		expect(result).toBeUndefined();
	});

	it('by date', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toEqual(sortByDate);
	});

	it('by items count', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toEqual(sortByItemCount);
	});
});

describe('sortOrders function', () => {
	it('by items count', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toEqual(sortByItemCount);
	});
});
