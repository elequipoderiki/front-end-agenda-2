const days = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']

const lowerMonths = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

let upperMonths = [] 
lowerMonths.forEach(month => {
    const toUpper = word => word && word[0].toUpperCase() + month.slice(1)
    upperMonths.push(toUpper(month))
    
})

const months = lowerMonths.concat(upperMonths)
 
function getPossibleMainWords(someText) {
    var words = someText.split(' ')
    const preps = ['el', 'la', 'los', 'las', 'al', 'a', 'para', 'por']
    res = []
    
    preps.forEach((prep) => {
        indexPrep = words.indexOf(prep)
        if (indexPrep != -1) {
            if (indexPrep < words.length-1 && isNaN(words[indexPrep+1])) {
                if (!preps.includes(words[indexPrep+1]) )
                  res.push(words[indexPrep+1])
                
            }
        }
    })
    return res
}

function isCapitalize (word) {
    if (word) {
        return isNaN(word) && (word[0] == word[0].toUpperCase())
    }
    return false
}


function getCapitalizeWords(someText) {
    var words = someText.split(' ')
    
    res = []
    words.slice(1).forEach(word => {
        if ( isCapitalize(word))
            res.push(word)
    })
    return res
}

function getDaysFromSentence(someText) {
    var words = someText.split(' ')
   
    let res = []
    days.forEach((day) => {
            if (words.includes(day)){
                res.push(day)
            } 
        })
    return res    
}

function getMonthsRelatedSentences(someText) {
    var words = someText.split(' ')
   
    let res = []
    months.forEach((month) => {
        indexMonth = words.indexOf(month)
        if (indexMonth != -1) {
            if (indexMonth >= 2 && words[indexMonth-1] == 'de') {
                sentence = words[indexMonth-2] + ' de ' + month
                res.push(sentence)
            } else {
                res.push(month)
            }
        }
        
    })
    return res
}

function extractKeywords(someText) {
    res1 = getMonthsRelatedSentences(someText)
    res2 = getCapitalizeWords(someText)
    prepPrefixWords = getPossibleMainWords(someText)
    res4 = []

    res1.forEach(word1 => {
        res4.push(word1);
        res2.forEach(word2 => {
            if (!word1.includes(word2)) res4.push(word2)  
        })  
    })

    res5 = getDaysFromSentence(someText)
    res6 = res4.concat(res5)
    
    res7 = []
    
    prepPrefixWords.forEach(word2 => {
        if(!res6.includes(word2)) res7.push(word2)
    })

    return res6.concat(res7)
}


// res1 = extractKeywords(text1)
// console.log(res1)
// res2 = extractKeywords(text2)
// console.log(res2)
// res3 = extractKeywords(text3)
// console.log(res3)
