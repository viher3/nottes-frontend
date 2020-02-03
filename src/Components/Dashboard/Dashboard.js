import React from 'react';

import {
    Table
} from 'reactstrap';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    'id': 1,
                    'name': 'test',
                    'type': 'text',
                    'tags': 'abc,tas',
                    'updatedAt': 'now'
                }
            ]
        };
    }

    render() {
        return (
            <section>
                <p>Listing {this.state.data.length} of X</p>

                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Tags</th>
                        <th>Last update</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.data.length === 0 ? (
                                <tr>
                                    <td colSpan="5">No results were found.</td>
                                </tr>
                            ) :
                            (
                                this.state.data.map((item) =>
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td>{item.tags}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>TODO: actions</td>
                                    </tr>
                                )
                            )
                    }
                    </tbody>
                </Table>
            </section>
        );
    }
}

export default Dashboard;
