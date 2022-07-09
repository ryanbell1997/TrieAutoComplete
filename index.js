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

const carArr = ['BMW', 'Audi', 'Mercedes', 'Skoda', 'Alpha Romeo', 'Volvo', 'Nissan', 'Fiat', 'Lamborghini', 'Bentley', 'Ford', 'Rover', 'Jaguar', 'Peugeot', 'Vauxhall', 'Renault'];
const footballTeamArr = ['Arsenal', 'Chelsea', 'Manchester City', 'Manchester United', 'Leeds', 'West Ham', 'Norwich', 'Brighton', 'Wolves', 'Aston Villa', 'Liverpool', 'Newcastle'];

const FindWord = (input) => {
    input = input.toLowerCase();
    let fetchedWord = trie.suggestWord(trie.head, input, '');
    if(fetchedWord){
        fetchedWord = fetchedWord.charAt(0).toUpperCase() + fetchedWord.slice(1);

            document.getElementById('suggestion').innerText = `Did you mean: ${fetchedWord}?`;
    }
    else {
        document.getElementById('suggestion').innerText = `No words could be found for "${input}"`;
    }
}

const AddWord = () => {
    let word = document.getElementById('addBox').value;
    word = word.toLowerCase();
    trie.addWord(trie.head, word);
    document.getElementById('addBox').value = "";
    document.getElementById('generatedJson').textContent = JSON.stringify(trie, undefined,2);
    return alert(`${word} has been added`);
}

const LoadData = (arr) => {
    arr.forEach((item) => {
        item = item.toLowerCase();
        trie.addWord(trie.head, item);
    });
    document.getElementById('generatedJson').textContent = JSON.stringify(trie, undefined,2);
}

const LoadCars = () => {
   LoadData(carArr);
   return alert("Car brands have been added");
}

const LoadFootballTeams = () => {
    LoadData(footballTeamArr);
    return alert("Football teams have been added");
}

document.getElementById('searchBox').addEventListener('keyup', (e) => {
    if(e.target.value){
        FindWord(e.target.value);
    }
    else {
        document.getElementById('suggestion').innerText = "";
    }
})


