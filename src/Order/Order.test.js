/* eslint-disable import/first */
jest.mock("../utils/getDate");

import {getDate} from "../utils/getDate";
import React from 'react'
import Order from "./Order";
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Order.js', () => {
  beforeEach(() => {
    getDate.mockReturnValue("4 августа, чт, 2021 год");
  });

  afterEach(() => {
    jest.resetAllMocks()
  });

  it('render default', () => {
    const wrapper = shallow(<Order/>);

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('render with data', () => {
    const wrapper = shallow(<Order order={{shop: "some", date: 1}}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('render with data and items', () => {
    const wrapper = shallow(<Order order={{shop: "some", date: 1, items: [1, 2, 3, 4]}}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('render with no date', () => {
    const wrapper = shallow(<Order order={{shop: "some"}}/>);

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('render with no shop', () => {
    const wrapper = shallow(<Order order={{date: 1}}/>);

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('render without shop and date', () => {
    const wrapper = shallow(<Order order={{}}/>);

    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('check if getDate is called', () => {
    const testData = {shop: "some", date: 1};
    const wrapper = shallow(<Order order={testData}/>);

    expect(getDate).toHaveBeenCalledWith(testData.date);
  });
});

