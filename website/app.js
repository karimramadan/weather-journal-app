/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",us&appid=3daf9b82ca9edaa5a3a29f853f65a4d7";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Select DOM Elements
const dateDiv = document.getElementById("date");
const tempDiv = document.getElementById("temp");
const contentDiv = document.getElementById("content");

// Event Listner
document.getElementById("generate").addEventListener("click", performAction);

function performAction(e){
    e.preventDefault();
    // Select elements
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getWeatherData(baseURL,zipCode,apiKey)
    .then(function(data){
        postData("/add", {temperature: data.main.temp,date: newDate,userResponse: feelings})
    })
    .then(function(newData){
        renderUI()
    })
}

// Get data from OpenWeatherMap API
const getWeatherData = async (url, zipCode, apiKey) => {
    const res = await fetch (url+zipCode+apiKey);
    try{
        const data = await res.json();
        return data;
    } catch(error){
        console.log("Error: ", error)
    }
}

// Post new data
const postData = async (url, data) => {
    const res = await fetch (url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    try{
        const newData = await res.json();
        return newData;
    }
    catch(error){
        console.log("Error: ", error)
    }
}

// renderUI
const renderUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json();
        dateDiv.innerHTML = `Date: ${allData.date}`;
        tempDiv.innerHTML = `Temperature: ${allData.temperature}`;
        contentDiv.innerHTML = `User Response: ${allData.userResponse}`;
    }catch(error){
        console.log("error", error);
    }
}