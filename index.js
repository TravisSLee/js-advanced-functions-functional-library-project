const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, callback) {
      if(Array.isArray(collection)){
        for(let i = 0; i < collection.length; i++){
          callback(collection[i], i, collection)
        }
      } else if(typeof(collection) === "object"){
        for(let i = 0; i < Object.keys(collection).length; i++){
          callback(collection[Object.keys(collection)[i]], Object.keys(collection)[i], i)
        }
      }
      return collection
    },

    map: function(collection, callback) {
      let newCollection = [];
      if(Array.isArray(collection)){
        for(let i = 0; i < collection.length; i++){
          newCollection.push(callback(collection[i], i, collection));
        }
      } else if(typeof(collection) === "object"){
        let keys = Object.keys(collection);
        for(let i = 0; i < keys.length; i++){
          newCollection.push(callback(collection[keys[i]], keys[i], collection))
        }
      }
      return newCollection;
    },

    reduce: function(collection, callback, acc = 0) {
      for(let i = 0; i < collection.length; i++){
        acc = callback(acc, collection[i], collection)
      }
      return acc
    },

    find: function(collection, callback) {
      for(let i = 0; i < collection.length; i++){
        if(callback(collection[i])){
          return collection[i];
        }
      }
      return undefined;
    },

    filter: function(collection, callback){
      let matches = [];
      for(let i = 0; i < collection.length; i++){
        if(callback(collection[i])){
          matches.push(collection[i]);
        }
      }
      return matches
    },

    size: function(collection){
      if(Array.isArray(collection)){
        return collection.length;
      } else if (typeof(collection) === "object"){
        return Object.keys(collection).length
      }
    },

    first: function(collection, num = 1){
      if(num === 1){
        return (collection[0]);
      }
      return collection.slice(0, num);
    },

    last: function(collection, num = 1){
      if (num === 1){
        return collection[collection.length - 1]
      }
      return collection.slice(collection.length - num, collection.length)
    },

    compact: function(collection){
      let compacted = [];
      for(let i = 0; i < collection.length; i++){
        if(collection[i]){
          compacted.push(collection[i]);
        }
      }
      return compacted;
    },

    sortBy: function(collection, callback){
      let newCollection = [...collection]
      let sortProgress = [-1]
      while(fi.find(sortProgress, e => e === -1)){
        for(let i = 0; i < newCollection.length - 1; i++){
          if(callback(newCollection[i]) > callback(newCollection[i+1])){
            let hold = newCollection[i+1]
            newCollection[i+1] = newCollection[i]
            newCollection[i] = hold
            sortProgress[i] = -1
          } else {
            sortProgress[i] = 0
          }
        }
      }
      return newCollection
    },
//[1, [2], [3, [[4]]]]
//[1, 2, 3, [4]]]
    flatten: function(collection, oneLevel = false){
      let holder = []
      let level = -1
      function isItAnArray(e){
        if (Array.isArray(e)){
          level += 1
          if (oneLevel && level >= 2){
            holder.push(e)
            return
          }
          return fi.each(e, isItAnArray);
        } else{
          level -= 1
          holder.push(e)
        }
      }

      isItAnArray(collection)

      return holder
    },
    
    uniq: function(collection, isSorted = false, callback){
      let sorted;
      if(!isSorted){
        sorted = fi.sortBy(collection, e => e);
      } else {
        sorted = [...collection];
      }
      let uniques = [...sorted];
      for(let i = 0; i < sorted.length - 1; i++){
        console.log("comparing " + sorted[i] + " and " + sorted[i+1]);
        if(sorted[i] === sorted[i + 1]){
          uniques[i] = "X",
          console.log("Uniques  array: " + uniques + " sorted array " + sorted)
        }
      }
      console.log(fi.filter(uniques, e => e != "X"))
      return fi.filter(uniques, e => e != "X")
    },

    functions: function() {

    },


  }
})()

fi.libraryMethod()
