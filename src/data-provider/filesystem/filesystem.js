// @flow
import {dispatch, subscribe, getState} from '/store/store.js'
import {ACTIONS as PERSON} from '/person/person-actions.js'

export default function(options): DataProviderT {
	return {
		save: function () {
		},
		onLibLoaded: function () {
			dispatch({type: PERSON.FETCH})
		},
		fetch: function () {
			return Promise.resolve([
				{
					id: 1,
					name: 'Matěj',
					birthday: '2007-10-04',
					seen: '2019-02-02',
					customTexts: [
						'4.C',
					],
				},
				{
					id: 2,
					name: 'Emma',
					birthday: '2009-06-23',
					seen: '2019-02-02',
					customTexts: [
						'3.C',
					],
				},
				{
					id: 3,
					name: 'Ondra',
					birthday: '2013-03-04',
					seen: '2019-02-02',
				},
				{
					id: 4,
					name: 'Růža',
					birthday: '1954-10-01',
					seen: '2019-02-09',
				},
			])
		},
	}
}
