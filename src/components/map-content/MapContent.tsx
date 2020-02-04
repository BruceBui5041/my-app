import * as React from 'react';
import { Markers } from '../markers/Markers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { updateMyLocation } from '../../app-state/actions';
import { AppState } from 'app-state/reducer';

interface MapDispatchToPropsType {
	updateMyLocation: (lat: number, lng: number) => void;
}

interface MapStateToPropsType {
	anonymousUserId: string;
}

const mapStateToProps = (state: AppState): MapStateToPropsType => ({ anonymousUserId: state.anonymousUserId });

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => ({
	updateMyLocation: (lat: number, lng: number) => dispatch(updateMyLocation({ lat, lng }))
});

type Props = MapDispatchToPropsType & MapStateToPropsType;

class MyMapContent extends React.Component<Props> {
	render() {
		return <Markers />;
	}
}

export const MapContent = connect(mapStateToProps, mapDispatchToProps)(MyMapContent);
