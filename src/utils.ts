import * as firebase from 'firebase';

export const setDataToDatabase = (dbRef: string, userId: string, data: Object, onComplete?: any | undefined) => {
	firebase
		.database()
		.ref(`${dbRef}/${userId}`)
		.set(data, onComplete);
};
