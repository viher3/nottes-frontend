import React from 'react';
import AddData from "Views/Notte/AddData";

class CreateDocument extends React.Component {

    render() {
        return (
            <AddData title="Create new document" type="doc" history={this.props.history} />
        );
    }

}

export default CreateDocument;
