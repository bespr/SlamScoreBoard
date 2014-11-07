var app = app || {};

(function () {
	'use strict';

    app.data = {
        contests: [
            {
                name: 'Contest 1',
                slammer: [
                    { id: '1', name: 'Sepp' },
                    { id: '2', name: 'Fritz' },
                    { id: '3', name: 'Ivo' },
                    { id: '4', name: 'Maja' },
                    { id: '5', name: 'Hans' },
                    { id: '6', name: 'Beat' },
                    { id: '7', name: 'Kuno' },
                    { id: '8', name: 'Gabriel' }
                ],
                rounds: [
                    {
                        name: '1',
                        groups: [
                            {
                                name: 'Vorrunde A',
                                slammer: [
                                    { id: 1 },
                                    { id: 2 },
                                    { id: 3 },
                                    { id: 4 }
                                ]
                            },
                            {
                                name: 'Vorrunde B',
                                slammer: [
                                    { id: 5 },
                                    { id: 6 },
                                    { id: 7 },
                                    { id: 8 }
                                ]
                            }
                        ]
                    },
                    {
                        name: '2',
                        groups: [
                            {
                                name: 'Finalrunde',
                                slammer: [
                                    {  },
                                    {  },
                                    {  },
                                    {  }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };



}());
