"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

var _traitDictionary = {1:"gender", 2:"dob", 3:"height", 4:"weight", 5:"eyeColor"}


// app is the function called to start the entire application
function app(people)
{
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = returnOnePerson(people);
      break;
    case 'no':
      let arrayOfTraits = GenerateArrayOfTraits();
      searchResults = serachBytraits(arrayOfTraits, people);
      searchResults = returnOnePerson(searchResults);
      break;
      default:
    app(people); // restart app
      break;
  }

  mainMenu(searchResults, people);

}
 


function SearchByName()
{
  if (searchType === "yes"){
    firstName = filterPeople.firstName;
    lastName = filterPeople.lastName;
    displayPerson(filterPeople);
    person = filterPeople;
  }
  if(searchType === "no"){ 
    filterPeople = selectPersonFromSearch();
    firstname = filterPeople[0];
    lastName = filterPeople[1];
  }
  let filteredName = people.filter(function(el) {
    if(el.firstName === firstName && el.lastName === lastName) {

    }
  });
  if(searchType === "no"){
    person = filteredName[0];
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people.
   We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    alert( "ID:"+" "+person.id+" "+"First Name:"+" "+
      person.firstName+" "+
    "Last Name :"+" "+person.lastName+" "+ "Gender :"+" "+ 
    person.gender+" "+"Dob:"+" "+
    person.dob+" "+"Height:"+" "+
    person.height+" "+"Weight:"+" "+
    person.weight+" "+"Eye Color :"+" "+
    person.eyeColor+" "+"Occupation:"+" "+
    person.occupation)
    
    
    break;
    case "family":
    // TODO: get person's family

    let sib =people.filter(function(el) {if(person.parents==el.parents){return true;}
    else{return false;}

    });
    alert("Parents :"+DisplayNameById(person.parents)+" "+"Siblings :"+" "+DisplayName(sib)+"Spouse :"
    +" "+DisplayNameById(person.currentSpouse))
    break;
    case "descendants":
    // TODO: get person's descendants
    let child=people.filter(function(el){
      if( el.parents==person.id){
        return true;}
        else{
          return false;
        }

    });
    let grands=people.filter(function(el){
      if( el.parents==child.id){
        return true;}
        else{
          return false;
        }
    });
    alert("Children:"+" "+child+"Any other known decendants :"+" "+grands)

    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  

  let firstname = `First Name: ${person.firstName}\n`;
  let lastName = `Last Name: ${person.lastName}\n`;
  let gender = `Gender: ${person.gender}\n`;
  let dob = `Date of Birth: ${person.dob}\n`;
  let height = `Height: ${person.height}\n`;
  let weight = `Weight: ${person.weight}\n`;
  let eyeColor = `Eye Color: ${person.eyeColor}\n`;
  let occupation = `Occupation: ${person.occupation}\n`;
  let parents = `Parents: ${person.parents}\n`;
  let currentSpouce = `Spouce: ${person.currentSpouce}\n`;
  let seperator = "-----------------------------\n";



  let fullpersonDetails = firstname + lastName + gender + dob + height + weight 
  + eyeColor + occupation + parents + currentSpouce + seperator;
  // TODO: finish getting the rest of the information to display
  //alert(fullpersonDetails);
  return fullpersonDetails;
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}



/*Victor's Logic*/

function returnOnePerson (listofPeople)
{
  let message = "\n";
  for (let i = 0; i < listofPeople.length; i++)
  {
    if(listofPeople[i] != undefined)
    {
      message += `${listofPeople[i].firstName} ${listofPeople[i].lastName}\n`;
    }
  }
  let personName = prompt("Please select from this group of people their first Name Seprated by their Last Name"+message);
  for (let i = 0; i < listofPeople.length; i++)
  {
    if(listofPeople[i] != undefined)
    {
        if(personName == (listofPeople[i].firstName + " " + listofPeople[i].lastName))
      {
        return listofPeople[i];
      }
    }
  }
}




/**
 * @summary takes an array of selected traits outputs collection of matching poeple.
 * @param {Int32Array} arrayOfTraitsSelected
 * @param {People} - Database of People. 
 * @returns {collectionOfPeopleMatchingSearch} - a collection of person objects matching the search. 
 */
function serachBytraits(arrayOfTraitsSelected, DatabaseOfPeople)
{
  let collectionOfPeopleMatchingSearch = DatabaseOfPeople;

  //We will use filter
  //get the size of the filter.
  if(arrayOfTraitsSelected != null)
  {
    let messageShown = false; 
    for(let i = 0; i < arrayOfTraitsSelected.length; i++)
    {
      if (arrayOfTraitsSelected[i] != -1 && messageShown == false)
      {
        alert("You will be prompted for the parameters");
        messageShown = true;
      }
      if(arrayOfTraitsSelected[i] != -1)
      {
        let param = prompt(`Please Enter Criteria for: ${_traitDictionary[arrayOfTraitsSelected[i]]}`);
        collectionOfPeopleMatchingSearch = serachBySingleTrait(arrayOfTraitsSelected[i], collectionOfPeopleMatchingSearch, param);
      }
    }
  }


  return collectionOfPeopleMatchingSearch;
}

/**
 * @summary Takes in user input, returns numerical array
 * @returns {Int32Array} An Int32Array
 */
function GenerateArrayOfTraits()
{
  /*
    Possible Traits:
    "gender": "female",
		"dob": "10/7/1953",
		"height": 70,
		"weight": 187,
		"eyeColor": "brown",
  */
  let choices = ["\n1. Gender","\n2. Dob","\n3. Height","\n4. Weight","\n5. Eye Color"];
  let stringOfTraits = prompt("Seraching by Traits: please select the number associated with your choice seperated by a space:"+
  `${choices[0]}${choices[1]}${choices[2]}${choices[3]}${choices[4]}`);
  console.log(stringOfTraits);
  let menuChoices = ["1", "2", "3", "4", "5"];
  
  let arrayOfTraits = stringOfTraits.split(" ");
  let numarr = [];
  for (let i = 0; i < arrayOfTraits.length; i++)
  {
    let userChoice = Validate(menuChoices, arrayOfTraits[i]);
    if(userChoice != false)
    {
      userChoice = parseInt(userChoice);
      numarr[i] = userChoice;
    }
    else
    {
      numarr[i] = -1;
    }
  }
  return numarr;
}

/**
 * @summary Will return the numerical value of the choice or -1 if invalid. 
 * @param {number} minoption 
 * @param {number} maxoption 
 * @param {string} userchoice
 * @returns {number} a number;
 */
function Validate(minoption, maxoption, userchoice)
{
  let choice;
  let numberedOptionMin = parseInt(minoption);
  let numberedOptionMax = parseInt(maxoption);
  let validatedChoice = -1; 
  if(userchoice != null)
  {
    choice = parseInt(userchoice);
  }
  if(!(choice < numberedOptionMin) && !(choice > numberedOptionMax))
  {
    validatedChoice = choice; 
  }

  return choice;
}
function DisplayName(people){
  var i;
  for (i = 0; i < people.length; i++) {
  alert("First Name :"+" "+i.firstName+" "+ "Last Name :"+" "+i.lastName);
}
function DisplayNameById(id){
 
   let x=people.filter(function(el){
    if(el.id==id){
      alert("First Name :"+" "+el.firstName+" "+ "Last Name :"+" "+el.lastName);
    }

  })
}






/** 
 * @summary Takes an int value for trait, object for db, and string for trait param returns list matching results.
 * @param {Int32} trait - the numerical value that will be compared against in the dictionat
 * @param {data} people - The Collection of people to filter through;
 * @param {any} traitParam - The Parameter of the trait.
 * @returns A list of people mathing your search from this list. 
 */
function serachBySingleTrait(trait, people, traitParam)
{
  let listOfPeople = [];
  let selectedTrait = _traitDictionary[trait];
  for(let i = 0; i < people.length; i++)
  {
    if(selectedTrait == "gender"){if(people[i].gender == traitParam){listOfPeople[i] = people[i];}}
    else if(selectedTrait == "dob"){if(people[i].dob == traitParam){listOfPeople[i] = people[i];}}
    else if(selectedTrait == "height"){if(people[i].height == traitParam){listOfPeople[i] = people[i];}}
    else if(selectedTrait == "weight"){if(people[i].weight == traitParam){listOfPeople[i] = people[i];}}
    else if(selectedTrait == "eyeColor"){if(people[i].eyeColor == traitParam){listOfPeople[i] = people[i];}}
  }


  return listOfPeople;
}

//For UserStories Purposes:
function searchBySingleTraitStory(trait, people, traitParam)
{
    let traitValue = _traitDictionary[trait];
    let peopleList; peopleList = [];
    switch(traitValue)
    {
      case "gender":
        peopleList = people.map(function(item, index, array)
        {
          if(item.gender == traitParam){return item;}
        });
        break;
      case "dob":
        peopleList = people.map(function(item, index, array)
        {
          if(item.dob == traitParam){return item;}
        });
        break;
      case "height":
        peopleList = people.map(function(item, index, array)
        {
          if(item.height == traitParam){return item;}
        });
        break;
      case "weight":
        peopleList = people.map(function(item, index, array)
        {
          if(item.weight == traitParam){return item;}
        });
        break;
      case "eyeColor":
        peopleList = people.map(function(item, index, array)
        {
          if(item.eyeColor == traitParam){return item;}
        });
        break;
      default:
        break;
    }

    return peopleList;
}
}





/**
 * @summary Will return a person object
 * @param {number} personId - The Id of a person
 * @param {people} people - Database
 * @returns Person Object. 
 */
function SearchForPersonWithId(personId, people)
{
  let parentList;
  let param = "parents";
  parentList = people.filter(function(item)
  {
    if(item.id == personId)
    {
      return item;
    }
  });
  return parentList[param];
}


/**
 * @summary Will return a user option or false when fed in a list and user choice of the same type.
 * @param {Any} listOfOptions 
 * @param {Any} userinput 
 */
function Validate(listOfOptions, userinput){

  
  let found = false;
  for(let i = 0; i < listOfOptions.length; i++)
  {
    if(userinput == listOfOptions[i])
    {
      found = true;
      return userinput;
    }
  }
  if(found == false)
  {
    return false;
  }

}
