import { Node } from 'slate';

const serialize = value => {
    return (
      value
        .map(n => Node.string(n))
        .join('\n')
    );
}  

const deserialize = string => {
    return string.split('\n').map(line => {
        return {
            children: [{ text: line }],
        }
    });
}

export { serialize, deserialize };