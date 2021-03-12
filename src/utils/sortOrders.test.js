import React from 'react';
import {sortByItemCount, sortByDate, getSortFunction, sortOrders, sortTypes} from './sortOrders';
import {fakeOrders} from "../data/fakeOrders";

describe('sortByItemCount function', () => {
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
		};

		const order2 = {
			items: ['1']
		};

		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(1);
	});

	it('first order count less the second', () => {
		const order1 = {
			items: ['1']
		};

		const order2 = {
			items: ['1', '2', '3']
		};

		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(-1);
	});

	it('orders are null', () => {
		const result = sortByItemCount(null, null);
		expect(result).toEqual(0);
	});

	it('orders are not objects', () => {
		const result = sortByItemCount(4, 5);
		expect(result).toEqual(0);
	});
});

describe('sortByDate function', () => {
	it('dates are equal', () => {
		const order1 = {
			date: 1
		};

		const order2 = {
			date: 1
		};

		const result = sortByDate(order1, order2);
		expect(result).toEqual(0);
	});

	it('order1 date is greater than order2 date', () => {
		const order1 = {
			date: 2
		};

		const order2 = {
			date: 1
		};

		const result = sortByDate(order1, order2);
		expect(result).toEqual(-1);
	});

	it('order2 date is greater than order1 date', () => {
		const order1 = {
			date: 1
		};

		const order2 = {
			date: 2
		};

		const result = sortByDate(order1, order2);
		expect(result).toEqual(1);
	});

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
});

describe('getSortFunction function', () => {
	it('by date', () => {
		const result = getSortFunction(sortTypes.DATE);
		expect(result).toEqual(sortByDate);
	});

	it('by items count', () => {
		const result = getSortFunction(sortTypes.COUNT);
		expect(result).toEqual(sortByItemCount);
	});

	it('no type', () => {
		const result = getSortFunction(null);
		expect(result).toBeUndefined();
	});
});

describe('sortOrders function', () => {
	it('sortFunction is called', () => {
		const sortFunctionMock = jest.fn();
		const result = sortOrders(fakeOrders, sortFunctionMock);

		expect(sortFunctionMock).toBeCalled();
	});

	it('null arguments', () => {
		const sortFunctionMock = jest.fn();
		const result = sortOrders(null, null);

		expect(result).toBeUndefined();
	});

	it('sortFunction is null', () => {
		const result = sortOrders(fakeOrders, null);

		expect(result).toBeUndefined();
	});

	it('orders are null', () => {
		const sortFunctionMock = jest.fn();
		const result = sortOrders(null, sortFunctionMock);

		expect(result).toBeUndefined();
	});

	it('empty orders', () => {
		const sortFunctionMock = jest.fn();
		const orders = []
		const result = sortOrders(orders, sortFunctionMock);

		expect(result).toBeUndefined();
	});

	it('sortFunction is not a function', () => {
		const result = sortOrders(fakeOrders, 1);
		expect(result).toBeUndefined();
	});
});
