import React, { Fragment, useMemo, useState, useCallback } from 'react';

import { createEditor } from 'slate';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react'

import { Icon } from 'react-icons-kit';
import { bold, italic, code, list, underline } from 'react-icons-kit/feather';
import { quote } from 'react-icons-kit/ionicons/quote';
import { ic_title } from 'react-icons-kit/md/ic_title';

import { FormatToolbar, CustomEditor, serialize, deserialize } from './index';

const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
}

const ListElement = props => {
    return (
        <ul {...props.attributes}>
            <li>{props.children}</li>
        </ul>
    );
}

const QuoteElement = props => {
    return (
        <div className="quote-element">
            <span className="quotation" >
                <Icon icon={ quote } />
            </span>
            <q { ...props.attributes }>
                { props.children }
            </q>
        </div>
    );
}

const Leaf = props => {
    return (
        <span
            {...props.attributes}
            style={{ 
                    fontWeight: props.leaf.bold ? 'bold' : 'normal',
                    fontStyle: props.leaf.italic ? 'italic': 'normal',
                    textDecoration: props.leaf.underline ? 'underline' : 'none',
                    fontSize: props.leaf.title ? 32 : 14,
                }}
        >
            {props.children}
        </span>
    );
}

const TextEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), [])

    const [value, setValue] = useState(
        localStorage.getItem('content') ?
        deserialize(localStorage.getItem('content')) :
        [{
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph' }]
        }]
    );

    const renderElement = useCallback(props => {
        switch(props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            case 'list':
                return <ListElement {...props} />;
            case 'quote':
                return <QuoteElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />
    }, []);

    return (
        <Fragment>
            <FormatToolbar>
                <button
                    className="tooltip-icon-button"
                    onPointerDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleTitleMark(editor);
                    }}
                >
                    <Icon icon={ ic_title } />
                </button>
                <button 
                    className="tooltip-icon-button"
                    onPointerDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleBoldMark(editor);
                    }}
                >
                    <Icon icon={bold} />
                </button>
                <button 
                    className="tooltip-icon-button"
                    onPointerDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleItalicMark(editor);
                    }}
                >
                    <Icon icon={italic} />
                </button>
                <button
                    className="tooltip-icon-button"
                    onPointerDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleUnderlineMark(editor);
                    }}
                >
                    <Icon icon={underline} />
                </button>
                <button
                    className="tooltip-icon-button"
                    onPointerDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleCodeBlock(editor);
                    }}
                >
                    <Icon icon={code} />
                </button>
                <button
                    className="tooltip-icon-button"
                    onPointerDown={(event) => {
                        event.preventDefault();
                        CustomEditor.toggleListBlock(editor);
                    }}
                >
                    <Icon icon={list} />
                </button>
                <button
                    className="tooltip-icon-button"
                    onPointerDown={(event) => { 
                        event.preventDefault();
                        CustomEditor.toggleQuoteBlock(editor);
                    }}
                >
                    <Icon icon={quote} />
                </button>
            </FormatToolbar>
            <Slate editor={editor} value={value} onChange={value => {
                    setValue(value);
                    localStorage.setItem('content', serialize(value));
                }}>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown = {
                        event => {
                            if(!event.ctrlKey) { return; }

                            switch(event.key){
                                case '\'': {
                                    event.preventDefault(); // Stops the character from being inserted
                                    CustomEditor.toggleCodeBlock(editor);
                                    break;
                                }
                                case 'b': {
                                    event.preventDefault(); // Stops the character from being inserted
                                    CustomEditor.toggleBoldMark(editor);
                                    break;
                                }
                                case 'i': {
                                    event.preventDefault(); // Stops the character from being inserted
                                    CustomEditor.toggleItalicMark(editor);
                                    break;
                                }
                                case 'u': {
                                    event.preventDefault(); // Stops the character from being inserted
                                    CustomEditor.toggleUnderlineMark(editor);
                                    break;
                                }
                                case 'l': {
                                    event.preventDefault(); // Stops the character from being inserted
                                    CustomEditor.toggleListBlock(editor);
                                    break;
                                }
                                case 'o': {
                                    event.preventDefault();
                                    CustomEditor.toggleQuoteBlock(editor);
                                    break;
                                }
                                case 'h': {
                                    event.preventDefault();
                                    CustomEditor.toggleTitleMark(editor);
                                    break;
                                }
                                default:
                                    console.log('Not implemented yet...');
                            }
                        }
                    }
                />
            </Slate>
        </Fragment>
    );
}

export default TextEditor;