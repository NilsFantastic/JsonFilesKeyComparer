// execute like so: node diffJsonKeys.js "C:\full\path\to\en.json" "C:\full\path\to\sv.json"
var fs = require('fs');
const ColorReset = "\x1b[0m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
function DifflangFiles(nodeA, nodeB){
    var res1 = findEmptyChildren(nodeA).split("\n");
    var res2 = findEmptyChildren(nodeB).split("\n");
    let theyHaveTheSameKeys = true;
    let theyHaveTheSameTranslations = true;
    for (let i = 0; i < res1.length; i++) {
        const key = res1[i];
        
        if(!existsInCollection(key, res2)){
            logError("A->!B:",key);
            theyHaveTheSameKeys =false;
        }
    }
    for (let i = 0; i < res2.length; i++) {
        const key = res2[i];
        if(!existsInCollection(key, res1)){
            logError("B->!A:",key);
            theyHaveTheSameKeys =false;
        }
    }
    for (let i = 0; i < res2.length; i++) {
        const key = res2[i];
        if(!key)
            continue;
        var value = getValueFor(nodeA, key);
        if(!value){
            logWarning("[A] Missing value: "+ key);
            theyHaveTheSameTranslations = false;
        }
    }
    for (let i = 0; i < res2.length; i++) {
        const key = res2[i];
        if(!key)
            continue;
        var value = getValueFor(nodeB, key);
        if(!value){
            logWarning("[B] Missing value: "+ key)
            theyHaveTheSameTranslations = false;
        }
    }
    console.log("");
    if(res2 > res1)
        logSuccess(res2.length+"","keys were compared");
    else
        logSuccess(res1.length+"","keys were compared");

    if(theyHaveTheSameKeys && theyHaveTheSameTranslations)
        logSuccess("A and B contain the exact same keys and all strings are translated!");
    else if(theyHaveTheSameKeys && !theyHaveTheSameTranslations)
        logWarning("A and B contain the exact same keys but are missing some translations");
    else if(!theyHaveTheSameKeys)
        logError("A and B does not contain the same keys");
    
}
function logError(...params){
    var argv = params.join(" ");
    console.error(FgRed, argv, ColorReset);
}
function logWarning(...params){
    var argv = params.join(" ");
    console.log(FgYellow, argv, ColorReset);
}
function logSuccess(...params){
    var argv = params.join(" ");
    console.info(FgGreen, argv, ColorReset);
}
function getValueFor(node, nodeKey){
    const executableKey = "node[\""+nodeKey.split(".").join("\"][\"")+"\"]";
    return eval(executableKey);
}

function existsInCollection(key, collection){
    for(let i = 0; i<collection.length; i++){
        if(collection[i] === key) return true;
    }
    return false;
}
    
function findEmptyChildren(obj, buildup){
    var str = "";
    for(var i in obj)
    {
        if(typeof obj[i] === "string"){
            str += buildup+"."+i+"\n";
        }
        else{
            if(!buildup)
                str+=findEmptyChildren(obj[i], i);
            else
                str+=findEmptyChildren(obj[i], buildup+"."+i);
        }
        
    }
    return str;
} 


console.clear();

var pathA = process.argv[2],
    pathB = process.argv[3];
fs.readFile( pathA,'utf8', (e, da)=> {
    fs.readFile( pathB,'utf8', (e, db)=>{
        console.log("Compare:");
        console.log("   A:", pathA);
        console.log("   B:", pathB);
        console.log("");
        
        DifflangFiles(JSON.parse(da),JSON.parse(db));
        console.log("");
    });
});
    


    
    
    