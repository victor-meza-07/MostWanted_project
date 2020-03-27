"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      GenerateArrayOfTraits();
      break;
      default:
    app(people); // restart app
      break;
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
    alert("Parents :"+DisplayNamebyId(person.parents)+" "+"Siblings :"+" "+DisplayName(sib)+"Spouse :"
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
    alert("Children:"+" "+DisplayName(child)+"Any other known decendants :"+" "+DisplayName(grands))

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
  // TODO: finish getting the rest of the information to display
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
//take in user input for the trait to be looked for as an array.
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
    numarr[i] = Validate(1,5,arrayOfTraits[i]);
  }

  
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
 if(id!=null) {
   let x=people.filter(function(el){
    if(el.id==id){
      alert("First Name :"+" "+el.firstName+" "+ "Last Name :"+" "+el.lastName);
    }

  })
}
else { return mainMenu(person, people)}
}
}


