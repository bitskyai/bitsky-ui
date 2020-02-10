/**
 *
 * Tests for Sois
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import { IntlProvider } from 'react-intl';
import React from 'react';
import { render } from 'react-testing-library';
import { Sois } from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';
// import 'jest-dom/extend-expect'; // add some helpful assertions

describe('<Sois />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    const dispatch = jest.fn();
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Sois dispatch={dispatch} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    expect(true).toEqual(false);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Sois />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
