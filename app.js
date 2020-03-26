"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

var _traitDictionary = {1:"gender", 2:"dob", 3:"height", 4:"weight", 5:"eyeColor"}

// app is the function called to start the entire application
function app(people)
{
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let filterPeople;
  var firstName;
  var lastName;
  var person;
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      let arrayOfTraits = GenerateArrayOfTraits();
      searchResults = serachBytraits(arrayOfTraits, people);
      break;
      default:
        alert("Invalid input. Please try again!")
    app(people); // restart app
      break;
  }
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

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
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
  var personInfo = "First Name: "+ person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.height + "\n";
  personInfo += "Age: " + person.dob + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  alert(personInfo);
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
  let arrayOfTraits = stringOfTraits.split(" ");
  let numarr = [];
  for (let i = 0; i < arrayOfTraits.length; i++)
  {
    let userChoice = Validate(1, 5, arrayOfTraits[i]);
    if(userChoice != -1)
    {
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
  return validatedChoice;
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
