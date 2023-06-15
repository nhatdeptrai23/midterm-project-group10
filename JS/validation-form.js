const form = document.querySelector("form[name='reservation-form']");
const nameInput = document.querySelector("input[name='name']");
const phone = document.querySelector("input[name='phone']");
const date = document.querySelector("input[name='date']");
const time = document.querySelector("input[name='time']");
const person = document.querySelector("input[name='person']");
const coupon = document.querySelector("input[name='coupon']");

const coupon_code = ["YWN82N", "GEA123", "O9MMSP", "DM2EKQ"];

let messages = 0;

const inputFields = [nameInput, phone, date, time, person, coupon];

const isEmpty = (input)=> {
  if(input.value =='' || input.value == null){
    return 1;
  }
}

const isValidCoupon = () => {
  let flag=0;
  coupon_code.forEach((input)=>{
    //console.log(input);
    //console.log(coupon.value);
    if(0==(input.localeCompare((coupon.value).toUpperCase()))){     
      flag=1;
    }
    //console.log((input.localeCompare(coupon.value)));
  })
  if(isEmpty(coupon)){
    flag = 1;
  }
  if(flag == 0){
    coupon.nextElementSibling.innerHTML = "Available coupons are in promo page"
  }
  return flag;
}

const isCharacterALetter = (char) => {
  let flag = 0;
  for (var i = 0; i < char.length; i++) {
    if(char.charAt(i) ==' '){
      flag++;
    }
    else{
      if(char.charAt(i).toLowerCase() != char.charAt(i).toUpperCase()){
        flag++;
      }
    }
  }
  if(flag == char.length){
    return 1;
  }
}

const isUpperFirst = (char) => {
  return char.charAt(0) == char.charAt(0).toUpperCase();
  
}

const isPastDate = (input) =>{
  let today= new Date();
  let indate = new Date(input);

  return (indate.setHours(0, 0, 0, 0)<today.setHours(0, 0, 0, 0)); 
}


const isOpentime = (input) =>{
  let[hour, minute] = input.split(":");

  let modhour = parseInt(hour);
  let modminute = parseInt(minute);

  if(modhour >= 10 &&modhour <= 22 ){
    if(hour == 21 && modminute > 30){
      return 0;
    }
    return 1;
  }
  else{
    return 0;
  }
}

const isPastTwoHours = (input) =>{
  let today = new Date();
  let[hour, minute] = input.split(":");
  let modhour = parseInt(hour);
  let modminute = parseInt(minute);
  let indate = new Date(date.value);
  indate.setHours(0, 0, 0, 0);
  indate.setHours(indate.getHours()+modhour);
  indate.setMinutes(indate.getMinutes()+modminute);
  today.setHours(today.getHours()+2)
  return (indate <= today); 
}

const isNumberchar = (char)=>{
  let flag = 0;
  for (var i = 0; i < char.length; i++){
    if(!(isNaN(char.charAt(i)))){
      flag++;
    }
  }
  if(flag == char.length){
    return 1;
  }
  else{
    return 0;
  }
}


const isValidName = ()=>{
  if(isEmpty(nameInput)){
    nameInput.nextElementSibling.innerHTML = "Name is required";
    return 0;
  }
  let flag = 0;

  if(isCharacterALetter(nameInput.value)){
    
    if(isUpperFirst(nameInput.value)){
      if((nameInput.value).length<2){
        nameInput.nextElementSibling.innerHTML = "Name should have 2 or more characters"
      }
      else{
        flag = 1;
      }
      
    }
    else{
      nameInput.nextElementSibling.innerHTML = "Name should be start with capital letter"
    }
    
  }
  else{
    nameInput.nextElementSibling.innerHTML = "Name should be alphabet"
  }
  return flag;

}

const isValidPhone = ()=>{
  if(isEmpty(phone)){
    phone.nextElementSibling.innerHTML = "Phone number is required";
    return 0;
  }
  let flag = 0;
  if(isNumberchar(phone.value)){
    if(phone.value.length>4){
      flag = 1;
    }
    else{
      phone.nextElementSibling.innerHTML = "Phone number length should atleast be more than 4"
    }
    
  }
  else{
    phone.nextElementSibling.innerHTML = "Phone number should be numeric"
  }

  return flag;
}

const isValidDate = () => {
  
  if("hey", isEmpty(date)){
    date.nextElementSibling.innerHTML = "Date is required";
    return 0;
  }
  let flag = 0;

  if(!isPastDate(date.value)){
    flag = 1;
  }
  else{
    date.nextElementSibling.innerHTML = "Date has already passed";
  }


  return flag;
}

const isValidTime = ()=> {  
  if(isEmpty(time)){
    time.nextElementSibling.innerHTML = "Time is required";
    return 0;
  }
  if(isEmpty(date)){
    time.nextElementSibling.innerHTML = "You need to enter the date first";
    return 0;
  }  
  let flag = 0

  if(!isPastTwoHours(time.value)){
    flag = 1;
  }
  else{
    time.nextElementSibling.innerHTML = "You can only book at least 2 hours from now";
  }
  if(!(isOpentime(time.value))){
    flag = 0;
    time.nextElementSibling.innerHTML = "Bookings are available from 10am to 9.30pm";
  }
    

  return flag;
}

const isValidPerson = () => {
  if(isEmpty(person) || person.value<1){
    person.nextElementSibling.innerHTML = "You can book for at least 1 person";
    return 0;
  }
  let flag = 0;
  
  if(isNumberchar(person.value)){
    if(person.value.length>0){
      if(person.value<=8){
        flag = 1;
      }
      else{
        person.nextElementSibling.innerHTML = "You can only book for atmost 8 person"
      }
      
    }
  }
  else{
    person.nextElementSibling.innerHTML = "Number of person should be numeric"
  }

  return flag;
}


nameInput.isValid = () => isValidName();
phone.isValid = () => isValidPhone();
date.isValid = () => isValidDate();
time.isValid = () => isValidTime();
person.isValid = () => isValidPerson();
coupon.isValid = () => isValidCoupon();

const validateInputs = () => {

  inputFields.forEach((input) => {
    input.nextElementSibling.classList.add('hide');

    if(!input.isValid()){
      messages++;
      input.nextElementSibling.classList.remove('hide');
    }
  })
}

form.addEventListener('submit', (e) => {
  messages = 0;
  validateInputs();


  if(messages > 0){
    e.preventDefault();
  }
  else{
    alert("Your booking is confirmed");
  }

})  