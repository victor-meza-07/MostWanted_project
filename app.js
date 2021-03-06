"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

var _traitDictionary = {1:"gender", 2:"dob", 4:"height", 3:"weight", 5:"eyeColor", 6: "occupation"}
var ObjectHoldingValidFieldsAndErrorFields = {CollectionOfValids: [], CollectionOfErrors: []};
const _imagesOfCriminals = {
  272822514:`https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/BillyBobThorntonHWOFFeb2012crop.JPG/220px-BillyBobThorntonHWOFFeb2012crop.JPG`,
  401222887:`https://designpress-10674.kxcdn.com/wp-content/uploads/2015/02/Uma-Thurman-Hairstyles-7.jpg`,
  409574486:`https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Steve_Scott_with_Christopher_Walken.jpg/220px-Steve_Scott_with_Christopher_Walken.jpg`,
  260451248:`https://i.pinimg.com/originals/ed/85/3a/ed853a05b776c1b3a3800b3971d37046.jpg`,
  629807187:`https://i.pinimg.com/236x/b4/1d/01/b41d017e842dc15a4c44c91e58c24859--fashion-illustrations-art-illustrations.jpg`,
  464142841:`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTJeLR6gkTNOFzZkl6kf6h8tjWA6uvPxQ2Oz_k5F3asSp5uWZbj`,
  982411429:`https://i.ya-webdesign.com/images/potatoes-drawing-toy-story.png`,
  595767575:`https://www.disneyclips.com/images2/images/mrspotatohead.png`,
  693243224:`https://pbs.twimg.com/profile_images/832356884996841472/5VjZ7Quo_400x400.jpg`,
  888201200:`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTEYEgdxFxwyytuznJ3aDT9QIEPjVsAnecKa86EzCwFudCWy6RN`,
  878013758:`https://blog.bazart.com/wp-content/uploads/2013/03/2003-Charlotte-Welfling.jpg`,
  951747547:`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsSwXsiicEDxUoq4QycrvC9YbwjHYTOS2D1P5lgFHsmtlC9_uS`,
  159819275:`https://www.nubianprincesshairshop.com/assets/images/jasmine-asymmetrical-bob-wig-human-hair-la7.jpg`,
  348457184:`https://lh4.googleusercontent.com/-vuXLzKpJabA/AAAAAAAAAAI/AAAAAAAAABc/KrC9Z9UEPGI/photo.jpg`,
  294874671:`data:image/jpeg;base64,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`,
  931247228:`https://pafospress.com/wp-content/uploads/2019/06/dimos-pafou.jpg`,
  822843554:`https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRITB4HbvA6MR69ca2WshwtXACBELk8pK4grUx-jdVEbdXBUdnY`,
  819168108:`https://pbs.twimg.com/profile_images/1229276483157286912/praoN-iW_400x400.jpg`,
  969837479:`https://images.findagrave.com/photos250/photos/2013/266/75013419_138004294394.jpg`,
  313207561:`https://cf-images.us-east-1.prod.boltdns.net/v1/static/5618154292001/250db968-9e78-45e8-8c4d-90355f7fd6ca/907ffc60-b28e-4bcb-85dc-671e9b6e4761/1280x720/match/image.jpg`,
  313997561:`data:image/jpeg;base64,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`,
  313998000:`https://img3.stockfresh.com/files/k/kurhan/m/54/763411_stock-photo-young-woman.jpg`
}

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

   var sibs=findFamily(person,people)
   if ( sibs!=undefined) {DisplayFamily(sibs,sibs.length)}
   else{alert("No siblings")}
   if (person.parents.length>0){DisplayNameById(person.parents)}
   else{}
   if(person.currentSpouse!=null){ DisplayNameById(person.currentSpouse,people)}
    else{ alert("No Spouse!!")}
    break;
    case "descendants":
    // TODO: get person's descendants
   var desc= findDecendants(person, people)
   if(desc!= undefined){
   DisplayDesc(desc,desc.length)}
   else{}
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
      if(arrayOfTraitsSelected[i] != -1 && arrayOfTraitsSelected[i] != undefined)
      {
        let param = prompt(`Please Enter Criteria for: ${_traitDictionary[arrayOfTraitsSelected[i]]}`);
        collectionOfPeopleMatchingSearch = searchBySingleTraitStory(arrayOfTraitsSelected[i], collectionOfPeopleMatchingSearch, param);
      }
    }
  }
 return collectionOfPeopleMatchingSearch;
}

/**
 * @summary collects in user input, returns numerical array
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
  for (i = 0; i < people.length; i++) 
  {if(people[i]!= undefined){
  alert("First Name :"+" "+people[i].firstName+" "+ "Last Name :"+" "+people[i].lastName);}
  else{}
}}
function DisplayNameById(id,people){
 
   let x=people.filter(function(el){
    if(el.id==id&& el!= undefined){
      alert("First Name :"+" "+el.firstName+" "+ "Last Name :"+" "+el.lastName);
    }
    else{}

  });
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

/**
 * 
 * @param {Number} param Number Representing the desired trait 
 * @param {poeple} people Database Set 
 * @param {Any} trait The parameter of the desired trait
 * @returns A list of people matching the parameter. 
 */
function searchBySingleTraitStory(param, people, trait)
{
  let match = _traitDictionary[param];
  let peopleList = [];
  peopleList  = people.map(function(item){
    if(item[match] == trait){return item;}
    })
    .filter(function(item)
    {
      if(item != undefined){return item;}
    });
    return peopleList;
}

/**
 * @summary - Recomend using "SearchBySingleTraitStory"
 * @param {Number} trait 
 * @param {data} people 
 * @param {String} traitParam 
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


/**
 * @summary Will return a person object
 * @param {number} personId - The Id of a person
 * @param {people} people - Database
 * @returns Person Object. 
 */
function SearchForPersonWithId(personId, people)
{
  let person = people.filter(function(item)
  {
    if(item.id == personId){return item;}
  });

  return person;
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


function findDecendants(person, people)
{
  let child=people.filter(function(el){
    if( el.parents[0]==person.id|| el.parents[1]==person.id){
      return true;}
      else{
        return false;
      }
  });
  let grands=people.filter(function(el){
    if( el.parents[0]==child.id|| el.parents[1]==child.id){
      return true;}
      else{
        return false;
      }
  });

  var descendants=child.concat(grands);


  return descendants;

}



function SearchByTraitsFields(CollectionOfTraitsAndParams, CollectionofPeople)
{
  let listOfMathches = CollectionofPeople;
  let savedWorkingMatches_ = CollectionofPeople;
  for(let i = 0; i < CollectionOfTraitsAndParams.length; i++)
  {
    if(CollectionOfTraitsAndParams[i].type == 7)
    {
      //split the name;
      let name = CollectionOfTraitsAndParams[i].value.split(" ");
      listOfMathches = searchByName(name[0], name[1], listOfMathches);
      //Some validation
      if(listOfMathches[0] != undefined)
      {
        ObjectHoldingValidFieldsAndErrorFields.CollectionOfValids.push(CollectionOfTraitsAndParams[i]);
        savedWorkingMatches_ = listOfMathches;
      }
      else
      {
        ObjectHoldingValidFieldsAndErrorFields.CollectionOfErrors.push(CollectionOfTraitsAndParams[i]);
        listOfMathches = savedWorkingMatches_; 
      }
    }
    else
    {
      listOfMathches = searchBySingleTraitStory(CollectionOfTraitsAndParams[i].type, listOfMathches, CollectionOfTraitsAndParams[i].value);

      //Some validation
      if(listOfMathches[0] != undefined)
      {
        ObjectHoldingValidFieldsAndErrorFields.CollectionOfValids.push(CollectionOfTraitsAndParams[i]);
        savedWorkingMatches_ = listOfMathches;
      }
      else
      {
        ObjectHoldingValidFieldsAndErrorFields.CollectionOfErrors.push(CollectionOfTraitsAndParams[i]);
        listOfMathches = savedWorkingMatches_;
      }
    }
  }
  if(CollectionOfTraitsAndParams.length != 0) 
    {  
      return listOfMathches;
    }
}

function captureUserInput(poepleDb)
{
  //this function will hold a {var} that will be used in validation and error genration, please do not change type
  ObjectHoldingValidFieldsAndErrorFields.CollectionOfErrors = [];
  ObjectHoldingValidFieldsAndErrorFields.CollectionOfValids = [];

  let name = {value: document.getElementById("SrchName").value.trim(), type:7}
  let gender = {value: document.getElementById("SrchGndr").value.trim(), type:1}
  let age = {value: document.getElementById("SrchDoB").value.trim(), type:2}
  let weight = {value: document.getElementById("SrchWeight").value.trim(), type:3}
  let height = {value: document.getElementById("SrchHeight").value.trim(), type:4}
  let eyeColor = {value: document.getElementById("SrchEyeColor").value.trim(), type:5}
  let occupation = {value: document.getElementById("SrchOcc").value.trim(), type:6}

  let collectionOfFields = [name, age, weight, height, eyeColor, occupation,gender];
  let filteredCollection = collectionOfFields.filter(function(item){
    if(item.value != null && item.value != ""){return item;}
  });
  console.log(filteredCollection);

  filteredCollection.forEach(function(item){console.log(item.type+" "+item.value);});
  let validatedCollection = validateInputAnswers(filteredCollection);
  let finalList = convertValuesOfFields(validatedCollection);//This is a list of the types converted to the expected formats.
  let listOfMatches = SearchByTraitsFields(finalList, poepleDb);
  console.log(listOfMatches);

  //Checking for an empty list, as there has been no matches
  if(listOfMatches == undefined || listOfMatches.length < 1)
  {
    console.log("List returned with no matches")
    let error = GenerateError(listOfMatches);
    let errorHtml = GenerateHtmlForError(error);
    DisplayErrorToUI(errorHtml);
  }
  else
  {
    if((ObjectHoldingValidFieldsAndErrorFields.CollectionOfErrors[0] != undefined) && ObjectHoldingValidFieldsAndErrorFields.CollectionOfValids.length > 0)
    {
      let error = ``
      let warning = ``;
      let table = ``;
      ClearDynamicElementUI();
      error = GenerateError(listOfMatches);
      let error_html = GenerateHtmlForError(error);
      warning = GenerateWarning();
      let warning_html = GenerateWarningHtml(warning);
      table = GenerateTableLayoutWithValues(listOfMatches);
      let table_html = GenerateTableHtml_New(table);
      DisplayTableWithWarning(error_html, warning_html, table_html);
    }
    else
    {
      if(ObjectHoldingValidFieldsAndErrorFields.CollectionOfValids.length > 0)
      {
        ClearDynamicElementUI();
        let table = GenerateTableLayoutWithValues(listOfMatches);
        DisplayTable(table);
      }
      else
      {
        //this is where we just display the warning.
        ClearDynamicElementUI();
        let warning = ``;
        let error = ``;
        error = GenerateError(listOfMatches);
        let error_html = GenerateHtmlForError(error);
        warning = GenerateWarning();
        let warning_html = GenerateWarningHtml(warning);

        let table_html = "";
        DisplayTableWithWarning(error_html, warning_html, table_html);
      }
    }
  }
}

function validateInputAnswers(listWithRawInput)
{
  let validatedCollection = listWithRawInput.map(function(item){
    switch(item.type)
    {
      case 1:
        try{item.value.toString(); return item;}
        catch(err){/*do nothing*/}
        break;
      case 2:
        try{item.value.toString(); return item;}
        catch(err){/*do nothing*/}
        break;
      case 3:
        try{parseInt(item.value); return item;}
        catch(err){console.log(err);}
        break;
      case 4:
        try{parseInt(item.value); return item;}
        catch(err){console.log(err);}
        break;
      case 5:
        try{item.value.toString(); return item;}
        catch(err){/*do nothing*/}
        break;
      case 6:
        try{item.value.toString(); return item;}
        catch(err){/*do nothing*/}
        break;
      case 7:
        try{item.value.toString(); return item;}
        catch(err){/*do nothing*/}
        break;
      default:
        break;
    }
  });
  return validatedCollection;
}

function convertValuesOfFields(validatedCollection)
{
  let finalList = validatedCollection.map(function(item)
  {
    switch(item.type)
    {
      case 1:
        try{item.value.toString(); return {value: item.value.toString(), type: 1}}
        catch(err){console.log(err);}
        break;
      case 2:
        try{item.value.toString(); return {value: item.value.toString(), type: 2}}
        catch(err){/*do nothing*/}
        break;
      case 3:
        try{parseInt(item.value); return {value: parseInt(item.value), type: 3}}
        catch(err){console.log(err);}
        break;
      case 4:
        try{parseInt(item.value); return {value: parseInt(item.value), type:4}}
        catch(err){console.log(err);}
        break;
      case 5:
        try{item.value.toString(); return {value: item.value.toString(), type:5}}
        catch(err){/*do nothing*/}
        break;
      case 6:
        try{item.value.toString(); return {value: item.value.toString(), type:6}}
        catch(err){/*do nothing*/}
        break;
      case 7:
        try{item.value.toString(); return {value: item.value.toString(), type:7}}
        catch(err){/*do nothing*/}
        break;
      default:
        break;
    }
  });
  return finalList;
}

function searchByName(firstName, lastName, listOfPeople)
{
  let fullName = firstName + lastName;
  let matches = listOfPeople.filter(function(item)
  {
    if(item.firstName+item.lastName == fullName)
    {
      return item;
    }
  });
  return matches;
}

function GenerateError(object)
{
  //this is where have to keep track of what errors we expect for what objects
  //ListOfMatches Errors
  let error = ``;
  if(object == undefined)
  {
    error += `The search paramaters returned no matches due to invalid parameters <strong>try inputting some information</strong>\n`;
  }
  else if(object.length < 1)
  {
    error += `The search yielded no results due to one or more parameters <strong>try to widen your search</strong>\n`
  }
  else
  {
    error += `Some fields held invalid data more info below\n`;
  }
  return error;
}

function GenerateHtmlForError(error)
{
  let html = `<div class="alert alert-danger"><strong>Error:</strong> ${error}</div>`;
  return html;
}

function DisplayErrorToUI(htmlForError)
{
  document.getElementById("DynamicContent").innerHTML = htmlForError;
}


function ClearDynamicElementUI()
{
  document.getElementById("DynamicContent").innerHTML="";
}

function GenerateWarning()
{
  let collectionOfReadableFields = {1:"Gender", 2:"DoB", 4:"Height", 3:"Weight", 5:"Eye Color", 6: "Occupation", 7: "Name"}
  let warning = ``;
  for(let i = 0; i < ObjectHoldingValidFieldsAndErrorFields.CollectionOfErrors.length; i++)
  {
    //might have to save string of numerical type up here to avoid a super long message?
    warning += `A field <strong> ${collectionOfReadableFields[ObjectHoldingValidFieldsAndErrorFields.CollectionOfErrors[i].type]} </strong> had invalid data: <strong>${ObjectHoldingValidFieldsAndErrorFields.CollectionOfErrors[i].value}</strong> and was ignored in the search<br>`;
  }
  return warning;
}

function GenerateWarningHtml(warning)
{
  let html = `<div class="alert alert-warning">${warning}</div>`;
  return html; 
}

function GenerateTableHtml_New(tableHtml)
{
  let tHtml = `<table class="table table-hover">${tableHtml}</table>`;
  let finalHtml = `<div class="row justify-content-center">${tHtml}</div>`;
  return finalHtml;
}

function DisplayTableWithWarning(error, warning, table)
{
  ClearDynamicElementUI();
  let finalHtml = error+ warning + table;
  document.getElementById("DynamicContent").innerHTML = finalHtml; 
}

function GenerateTableLayoutWithValues(peopleList)
{
  let table = '';
  let rows = peopleList.length; // a row per person;
  let cols = 8; // coloumns for data :)
  table += "<thead><tr><th>Name</th><th>Gender</th><th>DoB</th><th>Height</th><th>Weight</th><th>Eye Color</th><th>Details</th></tr></thead>";
  table += "<tbody>";
  for(let r = 0; r < rows; r++)
  {
    table += '<tr>';
      for(let c = 0; c < cols; c++)
      {
        switch(c)
        {
          case 0:
            table += ('<td>' + peopleList[r].firstName + " " + peopleList[r].lastName + '</td>');
            break;
          case 1:
            table += ('<td>' + peopleList[r].gender + '</td>');
            break;
          case 2:
            table += ('<td>' + peopleList[r].dob + '</td>');
            break;
          case 3:
            table += ('<td>' + peopleList[r].height + '</td>');
            break;
          case 4:
            table += ('<td>' + peopleList[r].weight + '</td>');
            break;
          case 5:
            table += ('<td>' + peopleList[r].eyeColor + '</td>');
            break;
          case 6:
            table += ('<td>' + `<button type="button" class="btn btn-info" onclick="fetchDetailsFromUI(${peopleList[r].id},data)">Details</button>` + '</td>');
            break;
        }
      }
  }
  table += "</tbody>";
  return table;
}

function DisplayTable(tableHtml)
{
  let tHtml = `<table class="table table-hover">${tableHtml}</table>`;
  let finalHtml = `<div class="row justify-content-center">${tHtml}</div>`;

  document.getElementById("DynamicContent").innerHTML = finalHtml;
}

function fetchDetailsFromUI(idFromDb, db)
{
  let person = db.filter(function(item){
    if(item.id == idFromDb){return item;}
  });

  if(person[0] != undefined){BuildDetailsHtml(person[0]);}
  
}

function BuildDetailsHtml(person)
{
  
  let card = '';
  let imageurl = _imagesOfCriminals[person.id];
  card = `<div class="card" style="width:400px"><img class="card-img-top" src="${imageurl}" alt="Card image"><div class="card-body">`+
  `<h4 class="card-title">${person.firstName} ${person.lastName}</h4>`+
  `<p class="card-text">DoB ${person.dob}</p>`+
  `<p class="card-text">Gender: ${person.gender}</p>`+
  `<p class="card-text">Height: ${person.height}</p>`+
  `<p class="card-text">Weight: ${person.weight}</p>`+
  `<p class="card-text">Eye Color: ${person.eyeColor}</p>`+
  `<p class="card-text">Occupation: ${person.occupation}</p>`+
  `<button class="btn btn-danger btn-sm" onclick="app(data)">Show Me Family</button>`+
  `</div></div>`;

  DisplayDetails(card);
}

function DisplayDetails(cardHtml)
{
  document.getElementById("DynamicContent").innerHTML = cardHtml;
}


function findFamily(person, people){
   if(person.parents.length>0){
   let sib =people.filter(function(el){
    if(person.parents[0]==el.parents[0]||person.parents[0]==el.parents[1]||person.parents[1]==el.parents[0]||person.parents[1]==el.parents[1])
 { 
   return true;
 }
else
    {
 return false;
    }
 });
return sib;
 }
 else{alert("Parents not found")}
}
function DisplayFamily(sib,counter){
  if( counter> 0){
  alert("Sibling found!")
  alert("First Name :"+" "+sib[counter-1].firstName+" "+ "Last Name :"+" "+sib[counter-1].lastName);
  counter--;
  DisplayFamily(sib,counter)
  }

}
function DisplayDesc(desc,counter){
  if( counter> 0){
  alert("Descendant  found!")
  alert("First Name :"+" "+desc[counter-1].firstName+" "+ "Last Name :"+" "+desc[counter-1].lastName);
  counter--;
  DisplayDesc(desc,counter)
}
}