/**
 *
 * Tests for ItunesContainer
 *
 *
 */

import React from 'react';
import { renderProvider } from '@utils/testUtils';
import { fireEvent, waitFor } from '@testing-library/dom';
import { ItunesContainerTest as ItunesContainer } from '../index';
import { translate } from '@app/components/IntlGlobalProvider/index';
import { itunesContainerTypes } from '@app/containers/ItunesContainer/reducer';
import { mapDispatchToProps } from '@app/containers/ItunesContainer';

describe('<ItunesContainer /> container tests', () => {
  let submitSpy;
  const artistName = 'post malone';
  const testData = {
    resultCount: 1,
    results: [{ trackName: 'sunflower', artistName }]
  };
  beforeEach(() => {
    submitSpy = jest.fn();
  });

  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ItunesContainer />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should trigger dispatchArtistData dispatch when there is a change in search input field', async () => {
    const { getByTestId } = renderProvider(<ItunesContainer dispatchArtistData={submitSpy} />);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'anuv' } });
    await waitFor(() => expect(submitSpy).toBeCalled());
  });

  it('should trigger dispatchArtistData dispatch when a input is given to search input field and enter is pressed', async () => {
    const { getByTestId } = renderProvider(<ItunesContainer dispatchArtistData={submitSpy} />);
    const searchInput = getByTestId('search-input');
    fireEvent.keyDown(searchInput, {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      target: {
        value: 'anuv'
      }
    });
    await waitFor(() => expect(submitSpy).toBeCalled());
  });

  it('should show message when there is no result for given invalid artist name', () => {
    const artistName = 'ababababab';
    const { getByTestId } = renderProvider(<ItunesContainer artistName={artistName} dispatchArtistData={submitSpy} />);

    expect(getByTestId('itunes-error')).toBeInTheDocument();
  });

  it('should trigger dispatchClearArtistData when the search input is changed to empty string', async () => {
    const { getByTestId } = renderProvider(
      <ItunesContainer itunesData={testData} artistName={artistName} dispatchClearArtistData={submitSpy} />
    );

    fireEvent.change(getByTestId('search-input'), { target: { value: '' } });
    await waitFor(() => expect(submitSpy).toBeCalled());
  });

  it('should show error message when itunesError is passed ', () => {
    const itunesError = 'something_went_wrong';
    const { getByTestId } = renderProvider(<ItunesContainer itunesError={itunesError} />);

    expect(getByTestId('itunes-error')).toBeInTheDocument();
    expect(getByTestId('itunes-error')).toHaveTextContent(translate(itunesError));
  });

  it('should show loading skeleton while searching for tracks', async () => {
    const { getByTestId, baseElement } = renderProvider(<ItunesContainer itunesData={testData} />);

    fireEvent.change(getByTestId('search-input'), { target: { value: 'AA' } });
    await waitFor(() => expect(baseElement.getElementsByClassName('ant-skeleton').length).toBe(0));
  });

  it('should ensure that mapDispatchToProps dispatches actions', async () => {
    const actions = {
      dispatchArtistData: { type: itunesContainerTypes.REQUEST_GET_ARTIST, artistName },
      dispatchClearArtistData: { type: itunesContainerTypes.CLEAR_ARTIST_DATA }
    };
    const props = mapDispatchToProps(submitSpy);
    props.dispatchArtistData(artistName);
    await waitFor(() => expect(submitSpy).toHaveBeenCalledWith(actions.dispatchArtistData));
    props.dispatchClearArtistData();
    await waitFor(() => expect(submitSpy).toHaveBeenCalledWith(actions.dispatchClearArtistData));
  });
});
