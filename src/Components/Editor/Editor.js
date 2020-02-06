import React from 'react';
import {
    Editor as DraftEditor,
    EditorState
} from 'draft-js';

class Editor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    componentDidMount() {
        this.focusEditor();
    }

    render() {
        return (
            <div style={styles.editor} onClick={this.focusEditor}>
                <DraftEditor
                    ref={this.setEditor}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                />
            </div>
        );
    }

    onChange = (editorState) => this.setState({
        editorState
    });

    setEditor = (editor) => {
        this.editor = editor;
    };

    focusEditor = () => {
        if (this.editor) {
            this.editor.focus();
        }
    };
}

const styles = {
    editor: {
        border: '1px solid #ced4da',
        borderRadius: '.25rem',
        minHeight: '6em',
        padding: '10px'
    }
};

export default Editor;
