import { Editor, Transforms, Text } from 'slate';

const CustomEditor = {
    isCodeBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code',
        });

        return !!match;
    },

    isListBlockActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'list',
        });

        return !!match;
    },

    isBoldMarkActive(editor) {
        const [match] = Editor.nodes(editor, {
            match: n => n.bold === true,
            universal: true
        });

        return !!match;
    },

    isItalicMarkActive(editor){
        const [match] = Editor.nodes(editor, {
            match: n => n.italic === true,
            universal: true
        });

        return !!match;
    },

    isUnderlineMarkActive(editor){
        const [match] = Editor.nodes(editor, {
            match: n => n.underline === true,
            universal: true
        });

        return !!match;
    },

    toggleCodeBlock(editor){
        const isActive = this.isCodeBlockActive(editor);

        Transforms.setNodes(
            editor,
            { type: !isActive ? 'code' : 'normal' },
            { match: n => Editor.isBlock(editor, n) }
        );
    },

    toggleListBlock(editor){
        const isActive = this.isListBlockActive(editor);

        Transforms.setNodes(
            editor,
            { type: !isActive ? 'list' : 'normal' },
            { match: n => Editor.isBlock(editor, n) }
        );
    },

    toggleBoldMark(editor){
        const isActive = this.isBoldMarkActive(editor);
        console.log(isActive);

        Transforms.setNodes(
            editor,
            { bold: !isActive ? true : false },
            { match: n => Text.isText(n), split: true }
        );
    },

    toggleItalicMark(editor){
        const isActive = this.isItalicMarkActive(editor);

        Transforms.setNodes(
            editor,
            { italic: !isActive ? true : false },
            { match: n => Text.isText(n), split: true }
        );
    },

    toggleUnderlineMark(editor){
        const isActive = this.isUnderlineMarkActive(editor);

        Transforms.setNodes(
            editor,
            { underline: !isActive ? true : false },
            { match: n => Text.isText(n), split: true }
        );
    }
}

export default CustomEditor;