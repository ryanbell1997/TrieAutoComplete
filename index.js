class Node {
    constructor(value){
        this.value = value;
        this.edges = [];
        this.children = {};
    }
}

class Trie {
    constructor(){
        this.head = new Node(null);
    }

    addWord(node, word){
        if(word.length > 0){
            if(!node.children[word[0]]){
                node.children[word[0]] = new Node(word[0]);
                node.edges.push(word[0])
                return this.addWord(node.children[word[0]], word.substring(1));
            }
            else {
                return this.addWord(node.children[word[0]], word.substring(1));
            }
        }
        else {
            return null;
        }
    }

    lookUp(node, word){
        if(word.length == 0){
            return true;
        }
        else {
            if(node.children[word[0]]){
                return this.lookUp(node.children[word[0]], word.substring(1));
            }
            else {
                return false;
            }
        }
    }

    suggestWord(node, word, returnString){
        if(!word){
            
        }

        if(!word || word.length <= 0){ 
            if(node.edges[0]){
                return this.suggestWord(node.children[node.edges[0]], '', returnString + node.edges[0]);
            }        
            else {
                return returnString;
            }  
        }
        else {
            if(node.children[word[0]]){
                return this.suggestWord(node.children[word[0]], word.substring(1), returnString + node.children[word[0]].value);
            } 
        }
    }
}

let trie = new Trie();


const FindWord = (input) => {
    document.getElementById('searchBox').setAttribute('placeholder', trie.suggestWord(trie.head, input.value, ''));
}

const AddWord = () => {
    const word = document.getElementById('addBox').value;
    trie.addWord(trie.head, word);
    return alert(`${word} has been added`);
}
